import express, { type Express } from "express";
import fs from "fs";
import path from "path";

export function serveStatic(app: Express) {
  // Handle both development and production build paths
  // In production, built files are in dist/public
  const distPath = path.resolve(__dirname, "..", "dist", "public");

  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first. Current __dirname: ${__dirname}`,
    );
  }

  app.use(express.static(distPath));

  // fall through to index.html if the file doesn't exist for SPA routing
  app.use("*", (_req, res) => {
    const indexPath = path.resolve(distPath, "index.html");
    if (!fs.existsSync(indexPath)) {
      return res.status(404).send("index.html not found");
    }
    res.sendFile(indexPath);
  });
}
