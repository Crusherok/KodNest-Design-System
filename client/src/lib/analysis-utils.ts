// Heuristic analysis logic for Placement Readiness Platform

interface Skill {
  name: string;
  category: string;
}

export interface AnalysisResult {
  id: string;
  createdAt: string;
  company: string;
  role: string;
  jdText: string;
  extractedSkills: Skill[];
  plan: any[];
  checklist: any[];
  questions: any[];
  readinessScore: number;
}

const SKILL_KEYWORDS: Record<string, string[]> = {
  "Core CS": ["DSA", "Data Structures", "Algorithms", "OOP", "Object Oriented", "DBMS", "Database Management", "OS", "Operating Systems", "Networks", "Computer Networks", "System Design"],
  "Languages": ["Java", "Python", "JavaScript", "TypeScript", "C++", "C#", "Golang", "Go", "Ruby", "Swift", "Kotlin", "Rust"],
  "Web": ["React", "Next.js", "Node", "Node.js", "Express", "REST", "API", "GraphQL", "HTML", "CSS", "Tailwind", "Frontend", "Backend", "Fullstack"],
  "Data": ["SQL", "MySQL", "PostgreSQL", "MongoDB", "Redis", "NoSQL", "Data Modeling", "Schema"],
  "Cloud/DevOps": ["AWS", "Azure", "GCP", "Docker", "Kubernetes", "CI/CD", "DevOps", "Linux", "Git", "GitHub"],
  "Testing": ["Selenium", "Cypress", "Playwright", "Jest", "JUnit", "PyTest", "Testing", "QA"]
};

export function analyzeJobDescription(jdText: string, company: string, role: string): AnalysisResult {
  const text = jdText.toLowerCase();
  const extractedSkills: Skill[] = [];
  const foundCategories = new Set<string>();

  // 1. Skill Extraction
  Object.entries(SKILL_KEYWORDS).forEach(([category, keywords]) => {
    keywords.forEach(keyword => {
      // Simple includes check, but could be regex for word boundaries
      if (text.includes(keyword.toLowerCase())) {
        // Avoid duplicates
        if (!extractedSkills.find(s => s.name === keyword)) {
          extractedSkills.push({ name: keyword, category });
          foundCategories.add(category);
        }
      }
    });
  });

  // 2. Readiness Score Calculation
  let readinessScore = 35; // Base score
  
  // Calculate category bonus (max 30)
  const categoryBonus = Math.min(foundCategories.size * 5, 30);
  readinessScore += categoryBonus;

  if (company.trim()) readinessScore += 10;
  if (role.trim()) readinessScore += 10;
  if (jdText.length > 800) readinessScore += 10;
  
  readinessScore = Math.min(readinessScore, 100);

  // 3. Generate Checklist (Template based on detected skills)
  const checklist = [
    {
      round: "Round 1: Aptitude & Basics",
      items: [
        "Quantitative Aptitude (Time, Work, Speed, Distance)",
        "Logical Reasoning & Puzzles",
        "Verbal Ability & Communication check",
        "Resume walkthrough preparation",
        "Basic behavioral questions (Tell me about yourself)"
      ]
    },
    {
      round: "Round 2: Technical (DSA & Core)",
      items: [
        "Array & String manipulation problems",
        "HashMaps & Two Pointer techniques",
        "Basic Recursion & Sorting algorithms",
        foundCategories.has("Core CS") ? "OOP Concepts (Polymorphism, Inheritance)" : "General programming logic",
        foundCategories.has("Data") ? "SQL Queries (Joins, Group By)" : "Basic Data storage concepts"
      ]
    },
    {
      round: "Round 3: Technical (Stack & Projects)",
      items: [
        "Deep dive into Resume Projects",
        `Explain architecture of your ${foundCategories.has("Web") ? "Web" : "Major"} project`,
        foundCategories.has("Web") ? "React/Node.js specific lifecycle questions" : "Code walk-through",
        foundCategories.has("Cloud/DevOps") ? "Deployment & CI/CD pipeline discussion" : "Version control (Git) workflow",
        "System Design basics (Scalability, Caching)"
      ]
    },
    {
      round: "Round 4: Managerial & HR",
      items: [
        "Why this company/role?",
        "Handling conflict in teams",
        "Strengths & Weaknesses",
        "Future career goals (5 year plan)",
        "Questions for the interviewer"
      ]
    }
  ];

  // 4. Generate 7-Day Plan
  const plan = [
    { day: 1, focus: "Basics & Aptitude", tasks: ["Practice 20 Aptitude Qs", "Revise Resume", "Research Company"] },
    { day: 2, focus: "Core CS Concepts", tasks: ["Revise OOPs", "DBMS Normalization", "OS Basics (Processes, Threads)"] },
    { day: 3, focus: "Data Structures", tasks: ["Solve 3 Array problems", "Solve 2 Linked List problems", "Stack/Queue implementation"] },
    { day: 4, focus: "Algorithms", tasks: ["Binary Search practice", "Sorting Algorithms analysis", "Basic DP/Greedy problems"] },
    { day: 5, focus: "Project & Stack", tasks: ["Review Project Codebase", `Revise ${foundCategories.has("Web") ? "React/Node" : "Language"} interview Qs`, "System Design basics"] },
    { day: 6, focus: "Mock Interviews", tasks: ["Peer Mock Interview", "Behavioral Qs rehearsal", "Whiteboard coding practice"] },
    { day: 7, focus: "Revision", tasks: ["Review weak areas", "Rest & Mental prep", "Final Resume Polish"] }
  ];

  // 5. Generate Questions
  const questions = [];
  
  if (foundCategories.has("Data")) {
    questions.push({ category: "Data", question: "Explain the difference between clustered and non-clustered indexes." });
    questions.push({ category: "Data", question: "Write a SQL query to find the second highest salary." });
  }
  
  if (foundCategories.has("Web")) {
    questions.push({ category: "Web", question: "Explain the Virtual DOM and how reconciliation works." });
    questions.push({ category: "Web", question: "What is the difference between specific and universal selectors in CSS?" });
  }

  if (foundCategories.has("Core CS")) {
    questions.push({ category: "Core CS", question: "Explain the 4 pillars of Object Oriented Programming with examples." });
    questions.push({ category: "Core CS", question: "What is the difference between a Process and a Thread?" });
  }

  if (foundCategories.has("Languages")) {
    questions.push({ category: "Languages", question: "Explain memory management and garbage collection in your primary language." });
  }

  // Fill remaining with generic if needed
  if (questions.length < 5) {
    questions.push({ category: "Behavioral", question: "Describe a challenging bug you fixed and how you approached it." });
    questions.push({ category: "General", question: "How do you keep yourself updated with the latest technology trends?" });
  }

  // Ensure 10 questions max
  while(questions.length < 10) {
     questions.push({ category: "General Technical", question: "Explain a technical concept you learned recently to a 5-year old." });
  }

  return {
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    company,
    role,
    jdText,
    extractedSkills,
    plan,
    checklist,
    questions: questions.slice(0, 10),
    readinessScore
  };
}
