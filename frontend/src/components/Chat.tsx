import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import uuid from "react-uuid";
import React, {
  ChangeEvent,
  ChangeEventHandler,
  FormEvent,
  FormEventHandler,
  RefObject,
} from "react";
import ChatInput from "./ChatInput";
import styles from "./chat.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faRobot } from "@fortawesome/free-solid-svg-icons";
import Intents from "./Intents";
import ChatItem from "./ChatItem";
const token = import.meta.env.VITE_TOKEN;
console.log(token);

function Chat() {
  const [chats, setChats] = React.useState(["let's chat"]);
  const [input, setInput] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const dummy: RefObject<HTMLDivElement> = React.useRef(null);

  const addChat = (chat: string) => {
    setLoading(false);
    setChats((state) => {
      return [...state, chat];
    });
    dummy.current?.scrollIntoView({ behavior: "smooth" });
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setChats((state) => [...state, input]);
    setInput("");
    dummy.current?.scrollIntoView({ behavior: "smooth" });
    console.log(token);

    const reqHeaders = new Headers();
    reqHeaders.append("Content-Type", "application/json");
    // reqHeaders.append("Authorization", `Bearer ${token}`);
    const requestOptions = {
      method: "POST",
      headers: reqHeaders,
      body: JSON.stringify({
        queryText: input,
        sessionId: uuid(),
      }),
    };

    setLoading(true);
    const response = await fetch("/api/detectIntent", requestOptions);
    const data = await response.json();
    console.log(response.status);
    if (response.status == 502) {
      addChat("Connection timeout, try again");
    } else if (response.status != 200) {
      addChat("Network Error, try again");
    } else addChat(data.response);
  };
  // addChat("Hello everyone");
  const handleInput = (e: ChangeEvent) => {
    setInput((e.target as HTMLInputElement).value);
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
        <Box className={styles.hero}>
          <Typography
            variant="h5"
            component="h1"
            sx={{ textAlign: "center !important" }}
          >
            Welcome to Middlesex University Alumni Chat Bot
          </Typography>
        </Box>
        <Box className={styles.info}>
          <div className={styles.curve}>
            <svg
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <path
                d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                className={styles.fill}
              ></path>
            </svg>
          </div>
          <Intents />
        </Box>

        <Box sx={{ p: 4, mb: 8, display: "flex", flexDirection: "column" }}>
          {chats.length > 0 &&
            chats.map((chat) => (
              <ChatItem chat={chat} styles={styles} key={uuid()} />
            ))}
          <Box ref={dummy} sx={{ m: "10px auto", width: "50px", mb: "100px" }}>
            {loading && <CircularProgress />}
          </Box>
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
