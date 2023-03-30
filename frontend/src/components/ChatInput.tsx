import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faPaperPlane,
  faBlackboard,
} from "@fortawesome/free-solid-svg-icons";
import React, { ChangeEvent, FormEvent } from "react";
import { LoadingButton } from "@mui/lab";

interface InputProps {
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  input: string;
  handleInput: (e: ChangeEvent) => void;
  loading: boolean;
}

function ChatInput({ handleSubmit, input, handleInput, loading }: InputProps) {
  return (
    <form
      onSubmit={handleSubmit}
      style={{
        position: "fixed",
        bottom: 5,
        padding: 5,
        width: "100%",
        maxWidth: 900,
        display: "flex",
        boxShadow: "-3px -2px 4px 2px #e3e3e3",
        borderRadius: 5,
        left: "50%",
        transform: "translateX(-50%)",
      }}
    >
      <TextField
        sx={{ bgcolor: "white" }}
        fullWidth
        placeholder="Ask your question"
        value={input}
        onChange={handleInput}
      />
      <LoadingButton
        loading={loading}
        variant="contained"
        type="submit"
        sx={{ ml: 1 }}
      >
        <FontAwesomeIcon icon={faPaperPlane} />
      </LoadingButton>
    </form>
  );
}

export default ChatInput;
