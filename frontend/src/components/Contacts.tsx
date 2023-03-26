import { Box, Typography } from "@mui/material";

function Contacts() {
  return (
    <Box
      sx={{
        width: "100vw",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "800px",
          m: "0 auto",
          p: 2,
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
    </Box>
  );
}
export default Contacts;
