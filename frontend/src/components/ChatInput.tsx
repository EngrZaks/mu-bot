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
import styles from "./styles.module.scss";

interface InputProps {
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  input: string;
  handleInput: (e: ChangeEvent) => void;
  loading: boolean;
}

function ChatInput({ handleSubmit, input, handleInput, loading }: InputProps) {
  return (
    <form onSubmit={handleSubmit} className={styles.chatForm}>
      <TextField
        className={styles.input}
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
