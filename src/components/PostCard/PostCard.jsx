import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import "./PostCard.css";
export default function PostCard({ title, content }) {
  return (
    <Card sx={{backgroundColor:"#C0E87B"}}  className="card">
      <CardContent>
        <Typography className="typography"
          color="text.secondary"
          gutterBottom
        >
          {title}
        </Typography>

        <Typography variant="body2">{content}</Typography>
      </CardContent>
    </Card>
  );
}
