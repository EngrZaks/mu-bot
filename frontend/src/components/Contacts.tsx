import { Box, Typography } from "@mui/material";

function Contacts() {
  return (
    <Box
      sx={{
        maxWidth: 800,
        m: 1,
        p: 1,
        position: "absolute",
        left: "50%",
        transform: "translateX(-50%)",
      }}
    >
      <Typography
        variant="h4"
        component="h2"
        sx={{ textAlign: "center", m: 2 }}
      >
        Contact
      </Typography>
      <Typography>
        Welcome to the Middlesex University Student Alumni Chatbot!
      </Typography>
    </Box>
  );
}
export default Contacts;
