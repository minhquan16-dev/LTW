import React from "react";
import { Typography, Button, Box, Paper } from "@mui/material";
import { useParams, Link } from "react-router-dom";
import "./styles.css";
import models from "../../modelData/models";

function UserDetail() {
    // 1. Sửa userID thành userId (khớp với App.js)
    const { userId } = useParams(); 
    console.log("ID người dùng đang xem là:", userId);
    const user = models.userModel(userId);
    console.log("Dữ liệu người dùng tìm được:", user);
    if (!user) {
      return <Typography variant="h5">Không tìm thấy người dùng.</Typography>;
    }

    return (
        <Box sx={{ p: 3 }}>
          <Paper elevation={3} sx={{ p: 4 }}>
            <Typography variant="h3" gutterBottom>
              {user.first_name} {user.last_name}
            </Typography>
            
            <Typography variant="h6" color="textSecondary" sx={{ mt: 2 }}>
              <strong>Vị trí:</strong> {user.location}
            </Typography>
            
            <Typography variant="h6" color="textSecondary">
              <strong>Nghề nghiệp:</strong> {user.occupation}
            </Typography>

            {/* 2. Sửa varian thành variant và bdcolor thành bgcolor */}
            <Typography variant="body1" sx={{ mt: 3, p: 2, bgcolor: "#f9f9f9", borderRadius: 1 }}>
              <strong>Mô tả:</strong> {user.description}
            </Typography>

            <Box sx={{ mt: 4 }}>
              {/* 3. Sửa /photo/ thành /photos/ (số nhiều) */}
              <Button 
                variant="contained" 
                color="primary" 
                size="large" 
                component={Link}
                to={`/photos/${userId}`}
              >
                Xem ảnh của {user.first_name.toUpperCase()}
              </Button>
            </Box>
          </Paper>
        </Box>
    );
}

export default UserDetail;