import Typography from "@mui/material/Typography";

function SubHero() {
  return (
    <>
      <Typography
        variant="body1"
        component="h2"
        sx={{
          fontWeight: 800,
          mt: { xs: 1, sm: 6, md: 8 },
        }}
      >
        Get ready to explore a world of opportunities, resources, and
        connections. Whether you're a current student, an alum, or just curious
        about what's happening on campus, our chat bot is here to help. With
        features like event and news updates, alumni connections, and
        scholarship opportunities, you'll never miss a beat. So come on in and
        let's chat!
      </Typography>
    </>
  );
}

export default SubHero;
