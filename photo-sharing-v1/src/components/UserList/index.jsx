import React, { useState, useEffect } from "react";
import { List, ListItem, ListItemText, Divider, Typography, Badge, Box } from "@mui/material";
import { Link } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";

function UserList({ refreshKey }) {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    fetchModel("/user/list")
      .then((response) => setUsers(response.data))
      .catch((err) => console.error(err));
  }, [refreshKey]);

  if (!users) return <Typography sx={{ p: 2 }}>Loading...</Typography>;

  return (
    <List component="nav">
      {users.map((item) => (
        <React.Fragment key={item._id}>
          <ListItem button component={Link} to={`/users/${item._id}`}>
            <ListItemText primary={`${item.first_name} ${item.last_name}`} />
            <Box sx={{ display: "flex", gap: 2 }}>
              <Badge badgeContent={item.photoCount} color="success" showZero />
              <Link
                to={`/comments/${item._id}`}
                onClick={(e) => e.stopPropagation()}
                style={{ textDecoration: "none" }}
              >
                <Badge badgeContent={item.commentCount} color="error" showZero />
              </Link>
            </Box>
          </ListItem>
          <Divider />
        </React.Fragment>
      ))}
    </List>
  );
}

export default UserList;
