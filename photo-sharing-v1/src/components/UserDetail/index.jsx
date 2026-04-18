import React, { useState, useEffect } from "react";
import { Typography, Box, Paper, Button } from "@mui/material";
import { useParams, Link } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";

function UserDetail() {
  const { userId } = useParams();
  // KHAI BÁO BIẾN user Ở ĐÂY
  const [user, setUser] = useState(null); 

  useEffect(() => {
    if (userId) {
      fetchModel(`/user/${userId}`).then((response) => {
        setUser(response.data); // Lưu dữ liệu vào biến user
      }).catch(err => console.error(err));
    }
  }, [userId]);

  // Nếu chưa tải xong dữ liệu, hiện thông báo (Tránh lỗi user is not defined)
  if (!user) return <Typography sx={{ p: 2 }}>Đang tải thông tin...</Typography>;

  return (
    <Box sx={{ p: 3 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h3">{user.first_name} {user.last_name}</Typography>
        <Typography variant="h6" sx={{ mt: 2 }}>Vị trí: {user.location}</Typography>
        <Typography variant="h6">Nghề nghiệp: {user.occupation}</Typography>
        <Typography variant="body1" sx={{ mt: 2, p: 2, bgcolor: "#f5f5f5" }}>
          {user.description}
        </Typography>
        <Button variant="contained" component={Link} to={`/photos/${user._id}`} sx={{ mt: 3 }}>
          Xem ảnh của {user.first_name}
        </Button>
      </Paper>
    </Box>
  );
}
export default UserDetail;