import React, { useState, useEffect } from "react";
import { Typography, List, ListItem, ListItemAvatar, Avatar, ListItemText, Divider, Box } from "@mui/material";
import { useParams, Link } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";

const BACKEND_URL = "https://c3qzd5-8081.csb.app"; // Thay bằng URL của bạn

function UserComments() {
  const { userId } = useParams();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // Gọi API mới bạn vừa viết ở Backend
    fetchModel(`/user/commentsOfUser/${userId}`).then(res => {
      setComments(res.data);
    });
  }, [userId]);

  if (comments.length === 0) return <Typography sx={{p:2}}>Người dùng này chưa viết bình luận nào.</Typography>;

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom color="primary">Bình luận đã viết</Typography>
      <List>
        {comments.map((c, index) => (
          <React.Fragment key={index}>
            {/* Click vào comment sẽ dẫn đến trang ảnh của người đó */}
            <ListItemAvatar >
                {/* Hiển thị ảnh nhỏ (thumbnail) */}
                <Avatar 
                   variant="rounded" 
                   src={`${BACKEND_URL}/images/${c.photo_file_name}`} 
                   sx={{ width: 60, height: 60, mr: 2 }}
                   Button component={Link} to={`/photos/${userId}`}
                />
              </ListItemAvatar>
            <ListItem alignItems="flex-start" button component={Link} to={`/photos/${userId}`}>
              <ListItemText
                primary={<Typography variant="body1">"{c.comment}"</Typography>}
                secondary={
                  <Typography variant="caption" color="textSecondary">
                    Đã viết vào: {new Date(c.date_time).toLocaleString()}
                  </Typography>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
}

export default UserComments;