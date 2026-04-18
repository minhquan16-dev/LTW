import React, { useState, useEffect } from "react";
import { List, ListItem, ListItemText, Divider, Typography, Badge, Box} from "@mui/material";
import { Link } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";

function UserList() {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    // Gọi API lấy danh sách người dùng thực từ DB
    fetchModel("/user/list").then((response) => {
      setUsers(response.data);
    }).catch(err => console.error(err));
  }, []);

  if (!users) return <Typography sx={{ p: 2 }}>Đang tải...</Typography>;

  return (
    <List component="nav">
      {users.map((item) => (
        <React.Fragment key={item._id}>
          {/* QUAN TRỌNG: Link phải dùng item._id (mã của MongoDB) */}
          <ListItem Button component={Link} to={`/users/${item._id}`}>
            <ListItemText primary={`${item.first_name} ${item.last_name}`} />
            <Box sx={{ display: 'flex', gap: 2 }}>
              {/* Bong bóng Xanh: Số lượng ảnh */}
              <Badge badgeContent={item.photoCount} color="success" showZero />

              {/* Bong bóng Đỏ: Số lượng bình luận - Click để xem chi tiết */}
              {/* Lưu ý: Dùng onClick stopPropagation để khi nhấn vào badge không bị nhảy sang trang UserDetail */}
              <Link 
                  to={`/comments/${item._id}`} 
                  onClick={(e) => e.stopPropagation()} 
                  style={{ textDecoration: 'none' }}
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