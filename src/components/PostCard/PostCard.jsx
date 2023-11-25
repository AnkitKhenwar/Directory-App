import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function PostCard({ title, content }) {
  return (
    <Card
      sx={{
        minWidth: 275,
        minHeight: 170,
        backgroundColor: "#C0E87B",
        cursor: "pointer",
      }}
    >
      <CardContent>
        <Typography
          sx={{ fontSize: 14, textAlign: "center" }}
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
