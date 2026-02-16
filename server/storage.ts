import { type User, type InsertUser, users } from "@shared/schema";
import { randomUUID } from "crypto";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
}

let dbClient: pg.Client | null = null;
let db: ReturnType<typeof drizzle> | null = null;

async function getDatabase() {
  if (!db) {
    if (!process.env.DATABASE_URL) {
      console.warn(
        "DATABASE_URL not set, using in-memory storage. Set DATABASE_URL for persistent storage.",
      );
      return null;
    }

    try {
      dbClient = new pg.Client({
        connectionString: process.env.DATABASE_URL,
      });
      await dbClient.connect();
      db = drizzle(dbClient);
    } catch (error) {
      console.error("Failed to connect to database:", error);
      return null;
    }
  }
  return db;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const database = await getDatabase();
    if (!database) return undefined;

    const result = await database
      .select()
      .from(users)
      .where(eq(users.id, id))
      .limit(1);

    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const database = await getDatabase();
    if (!database) return undefined;

    const result = await database
      .select()
      .from(users)
      .where(eq(users.username, username))
      .limit(1);

    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const database = await getDatabase();
    const id = randomUUID();
    const user: User = { ...insertUser, id };

    if (database) {
      try {
        await database.insert(users).values(user);
      } catch (error) {
        console.error("Failed to insert user into database:", error);
      }
    }

    return user;
  }
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;

  constructor() {
    this.users = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
}

// Use database storage if DATABASE_URL is set, otherwise use in-memory
export const storage = process.env.DATABASE_URL
  ? new DatabaseStorage()
  : new MemStorage();
