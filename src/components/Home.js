import "../App.css";
import { Link } from "react-router-dom";
import Map from "./Map";
import { useEffect, useState } from "react";
import { Box, Button, Modal, Typography } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function Home() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <h1>999.com</h1>
      <br />
      <Button onClick={() => setOpen(true)}>Login</Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Login
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <input placeholder="아이디"></input> <br />
            <input type={"password"} placeholder="비밀번호"></input> <br />
            <button type="submit">Login</button>
          </Typography>
        </Box>
      </Modal>
      <Link to={"/posting"}>Post</Link>
      <h2 className="map">Map</h2>
      <Map />
    </div>
  );
}

export default Home;
