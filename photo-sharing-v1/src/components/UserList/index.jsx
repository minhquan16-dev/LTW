import React, { useState, useEffect } from "react";
import { List, ListItem, ListItemText, Divider, Typography, Badge, Box, Button } from "@mui/material";
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
          <ListItem button component={Link} to={`/users/${item._id}`} sx={{display: "grid", gridTemplateColumns: "1fr auto auto", alignItems : "center", gap: 2}}>
            <ListItemText primary={`${item.first_name} ${item.last_name}`} />
            <Box sx={{ display: "flex", justifyContent: "center"}}>
              <Badge badgeContent={item.photoCount} color="success" showZero />
            </Box >
            {/* <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Link
                to={`/comments/${item._id}`}
                onClick={(e) => e.stopPropagation()}
                style={{ textDecoration: "none" }}
              >
                <Badge badgeContent={item.commentCount} color="error" showZero />
              </Link>
            </Box> */}
            <Button
            variant="contained"
            color="inherit"
            size="small"
            component={Link}
            to={`/comments/${item._id}`}
            onClick={(e) => e.stopPropagation()}
            sx={{ minWidth: 0, borderRadius: 2 }}
            >
            {item.commentCount}
            </Button>
          </ListItem>
          <Divider />
        </React.Fragment>
      ))}
    </List>
  );
}

export default UserList;
