import {
  faEnvelope,
  faLocation,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Button, Card, Typography } from "@mui/material";
import styles from "./styles.module.scss";

function Contacts() {
  return (
    <Box className={styles.contact}>
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
          Contact Us
        </Typography>
        <Card className={styles.contact_item}>
          <FontAwesomeIcon className={styles.icon} icon={faLocation} />
          <Typography>
            Department of Computer Science, MiddleSex Universit, London.
          </Typography>
        </Card>
        <Card className={styles.contact_item}>
          <FontAwesomeIcon className={styles.icon} icon={faEnvelope} />
          <Typography>Je466@live.mdx.ac.uk </Typography>
          <Button
            variant="contained"
            color="secondary"
            className={styles.btn}
            href="mailto:Je466@live.mdx.ac.uk"
          >
            Email
          </Button>
        </Card>
        <Card className={styles.contact_item}>
          <FontAwesomeIcon className={styles.icon} icon={faEnvelope} />
          <Typography>Jayeseyinjay@yahoo.com </Typography>
          <Button
            variant="contained"
            color="secondary"
            className={styles.btn}
            href="mailto:Je466@live.mdx.ac.uk"
          >
            Email
          </Button>
        </Card>
        <Card className={styles.contact_item}>
          <FontAwesomeIcon className={styles.icon} icon={faPhone} />
          <Typography>58595662 </Typography>
          <Button
            variant="contained"
            color="secondary"
            className={styles.btn}
            href="tel:58595662"
          >
            Place a call
          </Button>
        </Card>
      </Box>
    </Box>
  );
}
export default Contacts;
