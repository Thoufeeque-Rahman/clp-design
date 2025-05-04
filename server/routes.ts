import express, { type Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertEvaluationSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes for classes
  app.get("/api/classes", async (req, res) => {
    const classes = await storage.getClasses();
    res.json(classes);
  });

  // API routes for subjects
  app.get("/api/subjects", async (req, res) => {
    const subjects = await storage.getSubjects();
    res.json(subjects);
  });

  // API routes for students
  app.get("/api/students", async (req, res) => {
    const students = await storage.getStudents();
    res.json(students);
  });

  app.get("/api/students/class/:classId", async (req, res) => {
    try {
      const classId = parseInt(req.params.classId);
      if (isNaN(classId)) {
        return res.status(400).json({ message: "Invalid class ID" });
      }
      
      const students = await storage.getStudentsByClass(classId);
      res.json(students);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch students" });
    }
  });

  // API routes for evaluations
  app.get("/api/evaluations", async (req, res) => {
    const evaluations = await storage.getEvaluations();
    res.json(evaluations);
  });

  app.post("/api/evaluations", async (req, res) => {
    try {
      const evaluation = insertEvaluationSchema.parse(req.body);
      const result = await storage.createEvaluation(evaluation);
      res.status(201).json(result);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid evaluation data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create evaluation" });
    }
  });

  app.get("/api/evaluations/class/:classId", async (req, res) => {
    try {
      const classId = parseInt(req.params.classId);
      if (isNaN(classId)) {
        return res.status(400).json({ message: "Invalid class ID" });
      }
      
      const evaluations = await storage.getEvaluationsByClass(classId);
      res.json(evaluations);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch evaluations" });
    }
  });

  app.get("/api/evaluations/subject/:subjectId", async (req, res) => {
    try {
      const subjectId = parseInt(req.params.subjectId);
      if (isNaN(subjectId)) {
        return res.status(400).json({ message: "Invalid subject ID" });
      }
      
      const evaluations = await storage.getEvaluationsBySubject(subjectId);
      res.json(evaluations);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch evaluations" });
    }
  });

  app.get("/api/evaluations/student/:studentId", async (req, res) => {
    try {
      const studentId = parseInt(req.params.studentId);
      if (isNaN(studentId)) {
        return res.status(400).json({ message: "Invalid student ID" });
      }
      
      const evaluations = await storage.getEvaluationsByStudent(studentId);
      res.json(evaluations);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch evaluations" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
