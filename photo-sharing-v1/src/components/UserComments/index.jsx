import React, { useState, useEffect } from "react";
import { Typography, List, ListItem, ListItemAvatar, Avatar, ListItemText, Divider, Box } from "@mui/material";
import { useParams, Link } from "react-router-dom";
import fetchModel, { baseURL } from "../../lib/fetchModelData";

function UserComments() {
  const { userId } = useParams();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchModel(`/user/commentsOfUser/${userId}`).then((res) => {
      setComments(res.data);
    });
  }, [userId]);

  if (comments.length === 0) return <Typography sx={{ p: 2 }}>This user has not written any comments.</Typography>;

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom color="primary">Written Comments</Typography>
      <List>
        {comments.map((c) => {
          const photoLink = `/photos/${c.photo_owner_id}/${c.photo_index}`;
          return (
            <React.Fragment key={c._id}>
              <ListItem alignItems="flex-start" component={Link} to={photoLink} sx={{ textDecoration: "none", color: "inherit" }}>
                <ListItemAvatar>
                  <Avatar
                    variant="rounded"
                    src={`${baseURL}/images/${c.photo_file_name}`}
                    sx={{ width: 60, height: 60, mr: 2 }}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={<Typography variant="body1">"{c.comment}"</Typography>}
                  secondary={
                    <Typography variant="caption" color="textSecondary">
                      Written at: {new Date(c.date_time).toLocaleString()}
                    </Typography>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </React.Fragment>
          );
        })}
      </List>
    </Box>
  );
}

export default UserComments;
