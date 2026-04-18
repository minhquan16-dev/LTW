import React, { useState, useEffect } from "react";
import { Typography, Card, CardHeader, CardMedia, CardContent, Box, Divider, Button } from "@mui/material";
import { useParams, Link, useNavigate } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";

// Bước 3.1: Khai báo URL Backend
const BACKEND_URL = "https://c3qzd5-8081.csb.app";

function UserPhotos({ advancedFeatures }) {
  const { userId, photoIndex } = useParams();
  const navigate = useNavigate();
  const [photos, setPhotos] = useState(null); // Sửa thành null để dễ kiểm tra loading
  const currentStep = photoIndex ? parseInt(photoIndex, 10) : 0;

  useEffect(() => {
    if (userId && userId.length === 24) { // Chỉ gọi nếu ID chuẩn
      fetchModel(`/photosOfUser/${userId}`) // GỌI ĐÚNG API NÀY
        .then((response) => {
          setPhotos(response.data);
        })
        .catch((err) => console.error("Lỗi khi lấy ảnh:", err));
    }
  }, [userId]);

  // Kiểm tra trạng thái đang tải dữ liệu
  if (!photos) return <Typography sx={{ p: 2 }}>Đang tải ảnh từ server...</Typography>;
  
  if (photos.length === 0) return <Typography sx={{ p: 2 }}>Người dùng này chưa có ảnh nào.</Typography>;

  const renderComments = (photo) => (
    photo.comments?.map(c => (
      <Box key={c._id} sx={{ mb: 1, pl: 2, borderLeft: '3px solid #1976d2', bgcolor: '#f9f9f9', p: 1, borderRadius: '4px' }}>
        <Typography variant="caption">
            {/* Link dẫn tới người bình luận */}
            <Link to={`/users/${c.user._id}`} style={{ fontWeight: 'bold', textDecoration: 'none' }}>
                {c.user.first_name} {c.user.last_name}
            </Link> 
            <span style={{ color: 'gray', marginLeft: '8px' }}>
                ({new Date(c.date_time).toLocaleString()})
            </span>
        </Typography>
        <Typography variant="body2" sx={{ mt: 0.5 }}>{c.comment}</Typography>
      </Box>
    ))
  );

  // CHẾ ĐỘ XEM TẤT CẢ ẢNH
  if (!advancedFeatures) {
    return (
      <Box sx={{ p: 1 }}>
        {photos.map(p => (
          <Card key={p._id} sx={{ mb: 4, boxShadow: 3 }}>
            <CardHeader title={`Đăng lúc: ${new Date(p.date_time).toLocaleString()}`} />
            {/* Bước 3.2: Dùng URL từ server */}
            <CardMedia 
                component="img" 
                image={`${BACKEND_URL}/images/${p.file_name}`} 
                sx={{ maxHeight: 500, objectFit: 'contain', bgcolor: '#f5f5f5' }} 
            />
            <CardContent>
              <Typography variant="h6" gutterBottom>Bình luận:</Typography>
              {renderComments(p)}
            </CardContent>
          </Card>
        ))}
      </Box>
    );
  }

  // CHẾ ĐỘ STEPPER (XEM TỪNG TẤM)
  const p = photos[currentStep];
  return (
    <Box sx={{ p: 1 }}>
      <Card sx={{ boxShadow: 5 }}>
        <CardHeader 
            title={`Ảnh ${currentStep + 1} / ${photos.length}`} 
            subheader={`Ngày đăng: ${new Date(p.date_time).toLocaleString()}`} 
        />
        {/* Bước 3.2: Dùng URL từ server */}
        <CardMedia 
            component="img" 
            image={`${BACKEND_URL}/images/${p.file_name}`} 
            sx={{ maxHeight: 600, objectFit: 'contain', bgcolor: '#000' }} 
        />
        <CardContent>
          <Typography variant="h6" gutterBottom>Bình luận:</Typography>
          {renderComments(p)}
        </CardContent>
      </Card>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <Button 
            disabled={currentStep === 0} 
            onClick={() => navigate(`/photos/${userId}/${currentStep - 1}`)} 
            variant="contained"
        >
            Back
        </Button>
        <Button 
            disabled={currentStep === photos.length - 1} 
            onClick={() => navigate(`/photos/${userId}/${currentStep + 1}`)} 
            variant="contained"
        >
            Next
        </Button>
      </Box>
    </Box>
  );
}

export default UserPhotos;