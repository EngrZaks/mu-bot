import { Box, Button, TextField, Typography } from "@mui/material";
import React, { FormEvent, FormEventHandler, RefObject } from "react";
import ChatInput from "./ChatInput";
import styles from "./chat.module.scss";
const token = import.meta.env.VITE_TOKEN;

function Chat() {
  const [chats, setChats] = React.useState([""]);
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
        query_input: {
          text: { text: "Hello", language_code: "en-US" },
        },
      }),
    };

    fetch(
      "https://dialogflow.googleapis.com/v2/projects/wise-philosophy-348109/agent/sessions/123444:detectIntent",
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => console.log(data));
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
        <Typography variant="h4" sx={{ textAlign: "center !important" }}>
          Welcome to Middlesex University Alumni Chat Bot
        </Typography>

        <Box sx={{ p: 4, mb: 8, display: "flex", flexDirection: "column" }}>
          {chats.map((chat) => (
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
