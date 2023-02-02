import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FormEvent } from "react";

function ChatInput({
  handleSubmit,
  input,
  handleInput,
}: {
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  input: string;
  handleInput: (e: FormEvent<HTMLFormElement>) => void;
}) {
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
        <FontAwesomeIcon icon={faPaperPlane} />
      </Button>
    </form>
  );
}

export default ChatInput;
