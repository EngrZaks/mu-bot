import { Typography } from "@mui/material";
import { Box } from "@mui/material";

function About() {
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
          About MU Bot
        </Typography>
        <Typography>
          Welcome to the Middlesex University Student Alumni Chatbot!
        </Typography>
        <Typography>
          This chat bot was created as a project to provide current students and
          alumni with a convenient way to access information about the
          university and alumni events and opportunities.
        </Typography>
        <Typography>
          The chatbot uses natural language processing to understand and respond
          to user inquiries. It can answer questions about the latest alumni
          news, events, and opportunities available to students and alumni. The
          chatbot has been tested and shown to be an effective tool for
          providing information and improving communication between the
          university and its alumni community.
        </Typography>
        <Typography>
          Whether you're a current student or a proud alumni, our chatbot is
          here to help you stay informed about the latest news and events
          happening at Middlesex University. You can use our chatbot to get
          answers to questions about opportunities available to students and
          alumni, find out about the latest alumni news, and stay up-to-date on
          events and happenings.
        </Typography>
        <Typography>
          We believe that our chatbot will help improve communication and create
          a stronger community between current students and alumni. Johnson is
          constantly working to improve and enhance the chatbot to better serve
          our users. If you have any suggestions or feedback, please let us
          know.
        </Typography>
        <Typography>
          Thank you for using our Middlesex University Student Alumni Chatbot!
        </Typography>
      </Box>
    </Box>
  );
}

export default About;
