import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Container,
  useTheme,
  Typography,
} from "@mui/material";
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      Nechama Donnebaum & Tova Movshovitz {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
const Footer = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const theme = useTheme(); // Access the Material-UI theme

  const handleSendMessage = () => {
    const toEmail = "tova67769@gmail.com"; // Replace with the actual email address to receive messages
    const subject = `Message from ${name}`;
    const mailtoLink = `mailto:${toEmail}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(message)}`;
    window.location.href = mailtoLink;
  };

  return (
    <footer
      style={{ backgroundColor: "#f5f5f5", padding: "1rem", marginTop: "50px" }}
    >
      <Container>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          {/* Left side - Logo */}
          <img
            src="/logo.png" // Replace with the actual path to your logo image
            alt="Logo"
            style={{ width: "40%" }}
          />

          {/* Right side - Contact Us Form */}
          <Box
            display="flex"
            flexDirection="column"
            alignItems="flex-end"
            flexGrow={1}
          >
            <div style={{ width: "80%", backgroundColor: "0ff000" }}>
              <Typography
                variant="h6"
                gutterBottom
                style={{ color: "#ba8786", marginBottom: "10px" }}
              >
                Contact Us!!
              </Typography>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                width="100%"
              >
                <TextField
                  label="Name"
                  variant="outlined"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  size="small"
                  style={{ marginBottom: "10px", marginRight: "10px", flex: 1 }}
                />
                <TextField
                  label="Email"
                  type="email"
                  variant="outlined"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  size="small"
                  style={{ marginBottom: "10px", flex: 1 }}
                />
              </Box>
              {/* Message */}
              <TextField
                label="Message"
                multiline
                rows={3} // Number of rows to display
                variant="outlined"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                size="small"
                style={{ width: "100%", marginBottom: "10px" }}
              />
            </div>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSendMessage}
            >
              Send
            </Button>
          </Box>
        </Box>
        <Copyright/>
      </Container>
    </footer>
  );
};

export default Footer;
