import React, { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";
import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

const LiveChat = () => {
  const socket = useMemo(
    () =>
      // io("http://localhost:3001", {
        io("https://dsa-practice-site.onrender.com", {
        withCredentials: true,
      }),
    []
  );

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("");
  const [socketID, setSocketId] = useState("");
  const [roomName, setRoomName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", { message, room });
    setMessage("");
  };

  const joinRoomHandler = (e) => {
    e.preventDefault();
    socket.emit("join-room", roomName);
    setRoomName("");
  };

  useEffect(() => {
    socket.on("connect", () => {
      setSocketId(socket.id);
      console.log("connected", socket.id);
    });

    socket.on("receive-message", (data) => {
      console.log(data);
      setMessages((messages) => [...messages, data]);
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return (
    <Container maxWidth="sm">
      <Box sx={{ height: 500 }} />
      <Typography variant="h6" component="div" gutterBottom>
        {socketID}
      </Typography>

      <form onSubmit={joinRoomHandler}>
        <Typography variant="h5" component="div">
          Join Room
        </Typography>
        <TextField
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          id="outlined-basic"
          label="Room Name"
          variant="outlined"
          fullWidth
        />
        <Button type="submit" variant="contained" color="primary">
          Join
        </Button>
      </form>

      <form onSubmit={handleSubmit}>
        <TextField
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          id="outlined-basic"
          label="Message"
          variant="outlined"
          fullWidth
        />
        <TextField
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          id="outlined-basic"
          label="Room"
          variant="outlined"
          fullWidth
        />
        <Button type="submit" variant="contained" color="primary">
          Send
        </Button>
      </form>

      <Stack spacing={2}>
        {messages.map((m, i) => (
          <Typography key={i} variant="body1">
            {m}
          </Typography>
        ))}
      </Stack>
    </Container>
  );
};

export default LiveChat;
