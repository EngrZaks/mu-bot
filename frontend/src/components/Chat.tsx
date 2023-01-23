import { Box, Button, TextField, Typography } from "@mui/material";
import React, { FormEvent, FormEventHandler, RefObject } from "react";
import ChatInput from "./ChatInput";
import styles from "./chat.module.scss";
const token = import.meta.env.VITE_TOKEN;

function Chat() {
  const [chats, setChats] = React.useState(["let's chat"]);
  const [input, setInput] = React.useState("");
  const dummy: RefObject<HTMLDivElement> = React.useRef(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setChats([...chats, input]);
    setInput("");
    dummy.current?.scrollIntoView({ behavior: "smooth" });
    console.log(token);

    const reqHeaders = new Headers();
    reqHeaders.append("Content-Type", "application/json");
    reqHeaders.append("Authorization", `Bearer ${token}`);
    const requestOptions = {
      method: "POST",
      headers: reqHeaders,
      body: JSON.stringify({
        queryText: input,
        sessionId: "122abssd",
      }),
    };

    fetch("http://localhost:8080/detect", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setChats((state) => {
          return [...state, data.response];
        });
      });
  };

  const handleInput = (e: FormEvent) => {
    setInput(e.target.value);
  };
  return (
    <Box>
      <Box
        sx={{
          width: "100%",
          maxWidth: 700,
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <Typography
          variant="h5"
          component="h2"
          sx={{ textAlign: "center !important", mt: 2 }}
        >
          Welcome to Middlesex University Alumni Chat Bot
        </Typography>
        <Box className={styles.info}>
          <Typography variant="h6" component="h2">
            You can make enquiry about:
          </Typography>
          <Typography variant="body2">Alumni Resources</Typography>
          <Typography variant="body2">Alumi Events</Typography>
          <Typography variant="body2">Alumni Connections</Typography>
          <Typography variant="body2">Alumni News</Typography>
          <Typography variant="body2">Alumni News</Typography>
        </Box>

        <Box sx={{ p: 4, mb: 8, display: "flex", flexDirection: "column" }}>
          {chats.length > 0 &&
            chats.map((chat) => (
              <Box key={chat} className={styles.chat}>
                <Typography>{chat}</Typography>
              </Box>
            ))}
          <div ref={dummy}></div>
        </Box>
      </Box>
      <ChatInput
        handleInput={handleInput}
        input={input}
        handleSubmit={handleSubmit}
      />
    </Box>
  );
}

export default Chat;
