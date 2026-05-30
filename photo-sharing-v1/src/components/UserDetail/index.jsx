import React, { useState, useEffect } from "react";
import { Typography, Box, Paper, Button } from "@mui/material";
import { useParams, Link } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";

function UserDetail() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (userId) {
      fetchModel(`/user/${userId}`)
        .then((response) => setUser(response.data))
        .catch((err) => console.error(err));
    }
  }, [userId]);

  if (!user) return <Typography sx={{ p: 2 }}>Loading user information...</Typography>;

  return (
    <Box sx={{ p: 3 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h3">{user.first_name} {user.last_name}</Typography>
        <Typography variant="h6" sx={{ mt: 2 }}>Location: {user.location}</Typography>
        <Typography variant="h6">Occupation: {user.occupation}</Typography>
        <Typography variant="body1" sx={{ mt: 2, p: 2, bgcolor: "#f5f5f5" }}>
          {user.description}
        </Typography>
        <Button variant="contained" component={Link} to={`/photos/${user._id}`} sx={{ mt: 3 }}>
          View photos of {user.first_name}
        </Button>
      </Paper>
    </Box>
  );
}

export default UserDetail;
