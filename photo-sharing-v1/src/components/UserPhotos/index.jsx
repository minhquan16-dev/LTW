import React from "react";
import { Typography, Box, Card, CardMedia,CardHeader,CardContent} from "@mui/material";

import "./styles.css";
import {useParams, Link} from "react-router-dom";
import models from "../../modelData/models";
/**
 * Define UserPhotos, a React component of Project 4.
 */
function UserPhotos () {
    const {userId} = useParams();
    const photos=models.photoOfUserModel(userId);
    if(!photos || photos.length===3 ){
      return <Typography variant="h5">Không tìm thấy ảnh nào của người dùng.</Typography>
    }
    return (
      <Box sx={{padding:3}}>
        {photos.map((photo)=>(
          <Card key={photo._id} sx={{mb:2, border: "1px solid black"}} >
            <CardHeader title={`Đăng vào: ${new Date(photo.date_time).toLocaleString()}`} />
            <CardMedia component="img" image={`/images/${photo.file_name}`} alt="User post" sx={{width:"100%", heigth:"auto"}} />
            <CardContent>
              <Typography variant="h6" sx={{mt:2, mb:1}}>Bình luận:</Typography>
              
            </CardContent>
          </Card>

        ))}
        

        
      </Box>
    );
}

export default UserPhotos;
