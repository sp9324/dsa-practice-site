// const express = require('express');
import express from 'express';
const router = express.Router();
// const Message = require('../models/message.js');
import Message from '../models/message.js';

// Get all messages
router.get('/', async (req, res) => {
  try {
    const messages = await Message.find();
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific message by ID
router.get('/:id', getMessage, (req, res) => {
  res.json(res.message);
});

// Create a new message
router.post('/', async (req, res) => {
  const message = new Message({
    name: req.body.name,
    message: req.body.message
  });

  try {
    const newMessage = await message.save();
    res.status(201).json(newMessage);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a message by ID
router.patch('/:id', getMessage, async (req, res) => {
  if (req.body.name != null) {
    res.message.name = req.body.name;
  }
  if (req.body.message != null) {
    res.message.message = req.body.message;
  }

  try {
    const updatedMessage = await res.message.save();
    res.json(updatedMessage);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a message by ID
router.delete('/:id', getMessage, async (req, res) => {
  try {
    await res.message.remove();
    res.json({ message: 'Deleted Message' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware to get a message object by ID
async function getMessage(req, res, next) {
  let message;
  try {
    message = await Message.findById(req.params.id);
    if (message == null) {
      return res.status(404).json({ message: 'Cannot find message' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.message = message;
  next();
}

// module.exports = router;
export default router;
