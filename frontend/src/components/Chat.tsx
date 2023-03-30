import { Box, CircularProgress, Typography } from "@mui/material";
import uuid from "react-uuid";
import React, { ChangeEvent, FormEvent, RefObject } from "react";
import ChatInput from "./ChatInput";
import styles from "./chat.module.scss";
import SubHero from "./SubHero";
import ChatItem from "./ChatItem";
const token = import.meta.env.VITE_TOKEN;

function Chat() {
  const [chats, setChats] = React.useState([
    "Hello there! How can we assist you today? Are you looking for information on upcoming events, latest news, alumni connections, resources, opportunities, graduate programs, mentorship opportunities, scholarships, or alumni benefits? Please let us know and we'll be happy to help!",
  ]);
  const [input, setInput] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const dummy: RefObject<HTMLDivElement> = React.useRef(null);

  const addChat = (chat: string) => {
    setLoading(false);
    setChats((state) => {
      return [...state, chat];
    });
    dummy.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "nearest",
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input) return;
    setLoading(true);
    setChats((state) => [...state, input]);
    setInput("");
    dummy.current?.scrollIntoView({ behavior: "smooth" });
    const reqHeaders = new Headers();
    reqHeaders.append("Content-Type", "application/json");
    // reqHeaders.append("Authorization", `Bearer ${token}`);
    const requestOptions: RequestInit = {
      method: "POST",
      headers: reqHeaders,
      body: JSON.stringify({
        queryText: input,
        sessionId: uuid(),
      }),
    };
    setLoading(true);
    if (!navigator.onLine) {
      addChat(
        "<span style='color:red;'>Your device is offline, try again later</span>"
      );
      return;
    }
    try {
      const response = (await Promise.race([
        fetch("/api/detectIntent", requestOptions),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("timeout")), 10000)
        ),
      ])) as Response;
      if (response.status == 502) {
        addChat(
          "<span style='color:red;'> Connection timeout, try again</span>"
        );
      } else if (response.status != 200) {
        addChat("<span style='color:red;'> Network Error, try again</span>");
      } else {
        const data = await response.json();
        console.log(data.response);

        addChat(
          data.response ||
            "<span style='color:red;'> Something is wrong with our Chat service provider. Please Try again!</span>"
        );
      }
    } catch (error: any) {
      if (error.message === "timeout") {
        addChat(
          "<span style='color:red;'>Request timeout, please try again</span>"
        );
      } else {
        addChat(
          "<span style='color:red;'>Request failed, please check your internet connection and try again</span>"
        );
      }
    }
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
          maxWidth: 900,
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <Box className={styles.hero}>
          <Typography
            variant="h4"
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
          <SubHero />
        </Box>

        <Box sx={{ p: 4, mb: 8, display: "flex", flexDirection: "column" }}>
          {chats.length > 0 &&
            chats.map((chat) => (
              <ChatItem chat={chat} styles={styles} key={uuid()} />
            ))}
          <Box
            ref={dummy}
            sx={{ m: "10px auto", width: "50px", mb: "100px" }}
          ></Box>
        </Box>
      </Box>
      <ChatInput
        loading={loading}
        handleInput={handleInput}
        input={input}
        handleSubmit={handleSubmit}
      />
    </Box>
  );
}

export default Chat;
