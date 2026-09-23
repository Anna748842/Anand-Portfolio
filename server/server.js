const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const Contact = require("./Contact");

const app = express();
const memoryMessages = [];

let useMemoryStore = !process.env.MONGODB_URI;
const port = process.env.PORT || 5000;

app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
  })
);
app.use(express.json({ limit: "20kb" }));

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  message: {
    message: "Too many requests. Please try again later.",
  },
});

const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

function requireAdmin(req, res, next) {
  const token = req.headers.authorization?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "Authentication required." });
  }

  try {
    req.admin = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired token." });
  }
}

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.post("/api/contact", contactLimiter, async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        message: "Name, email, and message are required.",
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({
        message: "Please provide a valid email address.",
      });
    }

    if (name.trim().length < 2 || message.trim().length < 10) {
      return res.status(400).json({
        message: "Please provide more detailed information.",
      });
    }

    const payload = {
      _id: String(Date.now() + Math.random()),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      message: message.trim(),
      status: "new",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    if (useMemoryStore) {
      memoryMessages.unshift(payload);
      return res.status(201).json({
        message: "Contact message received.",
        id: payload._id,
      });
    }

    const contact = await Contact.create({
      name: payload.name,
      email: payload.email,
      message: payload.message,
      status: "new",
    });

    res.status(201).json({
      message: "Contact message received.",
      id: contact._id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Unable to save the contact message.",
    });
  }
});

app.post("/api/admin/login", async (req, res) => {
  const { email, password } = req.body;

  if (
    !email ||
    !password ||
    email !== process.env.ADMIN_EMAIL ||
    !process.env.ADMIN_PASSWORD_HASH
  ) {
    return res.status(401).json({
      message: "Invalid credentials.",
    });
  }

  const validPassword = await bcrypt.compare(
    password,
    process.env.ADMIN_PASSWORD_HASH
  );

  if (!validPassword) {
    return res.status(401).json({
      message: "Invalid credentials.",
    });
  }

  const token = jwt.sign(
    { email, role: "admin" },
    process.env.JWT_SECRET,
    { expiresIn: "8h" }
  );

  res.json({ token });
});

app.get("/api/admin/messages", requireAdmin, async (_req, res) => {
  if (useMemoryStore) {
    return res.json(memoryMessages);
  }

  const messages = await Contact.find().sort({ createdAt: -1 });
  res.json(messages);
});

app.patch("/api/admin/messages/:id/status", requireAdmin, async (req, res) => {
  const { status } = req.body;

  if (!["new", "read", "archived"].includes(status)) {
    return res.status(400).json({ message: "Invalid status." });
  }

  if (useMemoryStore) {
    const index = memoryMessages.findIndex((msg) => msg._id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ message: "Message not found." });
    }

    memoryMessages[index].status = status;
    memoryMessages[index].updatedAt = new Date().toISOString();
    return res.json(memoryMessages[index]);
  }

  const message = await Contact.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );

  if (!message) {
    return res.status(404).json({ message: "Message not found." });
  }

  res.json(message);
});

app.delete("/api/admin/messages/:id", requireAdmin, async (req, res) => {
  if (useMemoryStore) {
    const index = memoryMessages.findIndex((msg) => msg._id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ message: "Message not found." });
    }

    memoryMessages.splice(index, 1);
    return res.json({ message: "Message deleted." });
  }

  const message = await Contact.findByIdAndDelete(req.params.id);

  if (!message) {
    return res.status(404).json({ message: "Message not found." });
  }

  res.json({ message: "Message deleted." });
});

app.use((error, _req, res, _next) => {
  console.error(error);
  res.status(500).json({ message: "Internal server error." });
});

async function startServer() {
  try {
    if (!useMemoryStore) {
      await mongoose.connect(process.env.MONGODB_URI, {
        serverSelectionTimeoutMS: 5000,
      });
      console.log("Connected to MongoDB.");
    } else {
      console.log("No MONGODB_URI detected. Using in-memory storage for contact messages.");
    }
  } catch (error) {
    console.error("Database connection failed:", error);
    useMemoryStore = true;
    console.log("Falling back to in-memory storage for local development.");
  }

  app.listen(port, () => {
    console.log(`API running on port ${port}`);
  });
}

startServer();