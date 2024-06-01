// IMPORTS
import express, { json } from 'express';
import { connect } from 'mongoose';
import { hash, compare } from 'bcrypt';
import cors from 'cors';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { createServer } from "http";
import { Server } from "socket.io";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import authenticate from './middleware/authenticate.js';

dotenv.config();

// CHATBOT 
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro"});
const chat = model.startChat({
  history: [
    {
      role: "user",
      parts: [{ text: "Hello, I'm the user. Please help with my Data Structures and Algorithms queries" }],
    },
    {
      role: "model",
      parts: [{ text: "Hello, I'm your Data Structures and Algorithms Assistant. How can I assist you?" }],
    },
  ],
  generationConfig: {
    maxOutputTokens: 500,
  },
});

// SETTING UP EXPRESS
const app = express();
// socketio
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
  },
});

// CORS & JSON 
app.use(cors(
  {
    origin: '*',
  }
));
app.use(json());

// PORT
const PORT = process.env.PORT || 3001; // Port for the server

// Connect to MongoDB
// connect('mongodb://127.0.0.1:27017/userDB', {
//     useNewUrlParser: true,
// });
connect('mongodb+srv://headintheclouds104:NBokcjZNknyazWAJ@cluster-tenthousandhour.c8g2lus.mongodb.net/userDB?retryWrites=true&w=majority&appName=cluster-tenthousandhours', {
  useNewUrlParser: true,
});

// MODEL
import User from './models/user.js';

// ROUTES
app.get('/', (req, res) => {
  res.send('Server is running');
});

app.get("/api/users/:id", async (req, res) => {
  try {
    const user = await findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    console.log(user);
    res.json(user.id);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// register login routes
app.get("/login", (req, res) => {
  res.render("LoginPage.js");
});

app.get("/register", (req, res) => {
  res.render("RegistrationPage.js");
});

app.get("/discussionforum", authenticate, (req, res) => {
  res.render("LiveChat.js");
});

app.post("/register", async (req, res) => {
  try {
    const hashedPassword = await hash(req.body.password, 10);

    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    await user.save();
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to register user' });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log("in login route");
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    console.log("comparing password");
    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid password" });
    }
    console.log("user's id: ", user._id);
    const tokenPayload = {
      id: user._id,
    };
    console.log("token payload: ", tokenPayload);
    console.log("tokenPayload.id: ", tokenPayload.id);
    let secret=process.env.ACCESS_TOKEN_SECRET;
    console.log("secret: ", process.env.ACCESS_TOKEN_SECRET);
    const accessToken = jwt.sign({id: tokenPayload.id}, secret);
    console.log("access token: ", accessToken);
    console.log("successful");
    res.status(200).json({ message: "Logged in successfully", accessToken });
  } catch (error) {
    res.status(500).json({ error: "Failed to login" });
  }
});

// points routes
app.post("/api/retrievePoints", authenticate, async (req, res) => {
  const { name } = req.body;
  try {
    console.log("retrieving points");
    const user = await User.findOne({ name: name });
    if (!user) {
      return res.status(404).json({ status: "error", message: "User not found" });
    }
    console.log("found user");
    res.status(200).json(user.points);
  } catch (error) {
    res.status(500).json({ status: "error" });
  }
});

app.post("/api/retrieveTotalPoints", authenticate, async (req, res) => {
  const { name } = req.body;
  try {
    const user = await User.findOne({ name: name });
    if (!user) {
      return res.status(404).json({ status: "error", message: "User not found" });
    }
    res.json(user.totalPoints);
  } catch (error) {
    res.status(500).json({ status: "error" });
  }
});

app.post("/api/updateLLPoints", authenticate, async (req, res) => {
  const { name } = req.body;
  try {
    console.log("in updateLLPoints");
    const user = await User.findOne({ name: name });
    if (!user) {
      console.log("user not found");
      return res.status(404).json({ status: "error", message: "User not found" });
    }
    console.log("user found");
    if (user.points[0] >= 5) {
      return res.json({ status: "ok", message: "Points are already at the maximum" });
    }
    console.log("updating points");
    await User.updateOne({ _id: user._id }, { $inc: { "points.0": 5, "totalPoints": 5 } });
    console.log("points updated");
    return res.json({ status: "ok" });
  } catch (error) {
    res.status(500).json({ status: "error" });
  }
});

app.post("/api/updateSTACKPoints", authenticate, async (req, res) => {
  const { name } = req.body;
  try {
    const user = await User.findOne({ name: name });
    if (!user) {
      return res.status(404).json({ status: "error", message: "User not found" });
    }
    if (user.points[1] >= 5) {
      return res.json({ status: "ok", message: "Points are already at the maximum" });
    }
    await User.updateOne({ _id: user._id }, { $inc: { "points.1": 5, "totalPoints": 5 } });
    return res.json({ status: "ok" });
  } catch (error) {
    res.status(500).json({ status: "error" });
  }
});

app.post("/api/deductCertPoints", authenticate, authenticate, async (req, res) => {
  const { name } = req.body;
  try {
    const user=await User.findOne({name:name});
    if (!user) {
      return res.status(404).json({ status: "error", message: "User not found" });
    }
    if (user.totalPoints === 0 || user.totalPoints-1 < 0) {
      return res.json({ status: "ok", message: "Points are already at the minimum" });
    }
    await User.updateOne({ _id: user._id }, { $inc: { "totalPoints": -1 } });
    return res.json({ status: "ok" });
  } catch (error) {
    res.status(500).json({ status: "error" });
  }
});

app.post("/api/deductNotesPoints", authenticate, async (req, res) => {
  const { name } = req.body;
  try {
    const user=await User.findOne({name:name});
    if (!user) {
      return res.status(404).json({ status: "error", message: "User not found" });
    }
    if (user.totalPoints === 0 || user.totalPoints-2 < 0) {
      return res.json({ status: "ok", message: "Points are already at the minimum" });
    }
    await User.updateOne({ _id: user._id }, { $inc: { "totalPoints": -2 } });
    return res.json({ status: "ok" });
  } catch (error) {
    res.status(500).json({ status: "error" });
  }
});

app.post("/api/deductYTPoints", authenticate, async (req, res) => {
  const { name } = req.body;
  try {
    const user=await User.findOne({name:name});
    if (!user) {
      return res.status(404).json({ status: "error", message: "User not found" });
    }
    if (user.totalPoints === 0 || user.$markValidtotalPoints-3 < 0) {
      return res.json({ status: "ok", message: "Points are already at the minimum" });
    }
    await User.updateOne({ _id: user._id }, { $inc: {"totalPoints": -3 } });
    return res.json({ status: "ok" });
  } catch (error) {
    res.status(500).json({ status: "error" });
  }
});

// chatbot route
app.post('/api/chatbot', authenticate, async (req, res) => {
  const userMessage = req.body.message;
  console.log(userMessage);
  if (!userMessage.trim()) {
    return res.status(400).json({ message: 'Message must not be empty.' });
  }

  try {
    const result = await chat.sendMessage(userMessage);
    console.log("result: ", result);
    const response = await result.response;
    console.log("response: ", response);
    const text = response.text();
    console.log("response.text: ", text);

    res.json({ message: text });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// API Routes
import messagesRouter from './routes/messages.js';
app.use('/messages', messagesRouter);

// Start server
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Socket.IO
io.on('connection', (socket) => {
  console.log(`Socket ${socket.id} connected`);

// Join a specific room
socket.on('joinRoom', (room) => {
  socket.join(room);
  console.log(`Socket ${socket.id} joined room ${room}`);
});

  socket.on('sendMessage', ({ name, message, room }) => {
    io.to(room).emit('message', { name, message });
  });

  socket.on('disconnect', () => {
    console.log(`Socket ${socket.id} disconnected`);
  });
});
