import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import React from "react";

function ChatInput({ handleSubmit, input, handleInput }) {
  return (
    <form
      onSubmit={handleSubmit}
      style={{
        position: "fixed",
        bottom: 0,
        // left: 0,
        padding: 20,
        width: "100%",
        maxWidth: 700,
        display: "flex",
        // position: "absolute",
        backgroundColor: "white",
        left: "50%",
        transform: "translateX(-50%)",
      }}
    >
      <TextField
        fullWidth
        placeholder="Ask your question"
        value={input}
        onChange={handleInput}
      />
      <Button variant="contained" type="submit" sx={{ ml: 2 }}>
        Send
      </Button>
    </form>
  );
}

export default ChatInput;
