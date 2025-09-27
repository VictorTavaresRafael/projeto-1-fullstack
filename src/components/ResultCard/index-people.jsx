import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function ResultCard({ name, gender, height, onClick }) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardContent
        style={{ display: "flex", flexDirection: "column", gap: "4px" }}
      >
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Height: {height}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Gender: {gender}
        </Typography>
      </CardContent>
      <CardActions onClick={onClick}>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
