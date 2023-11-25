import React from "react";
import { Box, Typography } from "@mui/material";

import "./user-card.css";
import { WHITE } from "../../constant/colorConstant";

function UserCard({ userName, postCount }) {
  return (
    <Box className="user-card">
      <Typography color={WHITE} fontWeight={700}>
        {`Name: ${userName}`}
      </Typography>
      <Typography color={WHITE} fontWeight={700}>
        {`Posts: ${postCount}`}
      </Typography>
    </Box>
  );
}

export default UserCard;
