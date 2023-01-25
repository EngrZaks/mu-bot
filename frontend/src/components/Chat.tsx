import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import uuid from "react-uuid";
import React, { FormEvent, FormEventHandler, RefObject } from "react";
import ChatInput from "./ChatInput";
import styles from "./chat.module.scss";
const token = import.meta.env.VITE_TOKEN;

function Chat() {
  const [chats, setChats] = React.useState(["let's chat"]);
  const [input, setInput] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const dummy: RefObject<HTMLDivElement> = React.useRef(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
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
        sessionId: uuid(),
      }),
    };

    setLoading(true);
    fetch("http://localhost:8080/detect", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setLoading(false);
        setChats((state) => {
          return [...state, data.response];
        });
        dummy.current?.scrollIntoView({ behavior: "smooth" });
      });
  };

  const handleInput = (e: FormEvent<HTMLFormElement>) => {
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
          <div style={{ marginTop: 50 }} ref={dummy}></div>
        </Box>
        {/* <Box sx={{ m: "0 auto", width: "10px" }}> */}
        {/* {loading && ( */}
        <CircularProgress />
        {/* )} */}
        {/* </Box> */}
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
