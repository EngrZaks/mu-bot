import { faUser, faRobot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Typography } from "@mui/material";
import DOMPurify from "dompurify";
import uuid from "react-uuid";

interface ChatProps {
  chat: string;
  styles: any;
}

function ChatItem({ chat, styles }: ChatProps) {
  const cleanHtml = DOMPurify.sanitize(chat);

  return (
    <Box key={uuid()} className={styles.chat}>
      <div dangerouslySetInnerHTML={{ __html: cleanHtml }} />
      <FontAwesomeIcon icon={faUser} className={styles.user} />
      <FontAwesomeIcon icon={faRobot} className={styles.bot} />
    </Box>
  );
}

export default ChatItem;
