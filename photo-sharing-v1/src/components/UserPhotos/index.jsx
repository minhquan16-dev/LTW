import React, { useState, useEffect, useCallback } from "react";
import { Typography, Card, CardHeader, CardMedia, CardContent, Box, Button, TextField } from "@mui/material";
import { useParams, Link, useNavigate } from "react-router-dom";
import fetchModel, { postModel, baseURL } from "../../lib/fetchModelData";

function UserPhotos({ advancedFeatures, onDataChange }) {
  const { userId, photoIndex } = useParams();
  const navigate = useNavigate();
  const [photos, setPhotos] = useState(null);
  const [commentTexts, setCommentTexts] = useState({});
  const parsedPhotoIndex = Number.parseInt(photoIndex, 10);
  const currentStep = Number.isInteger(parsedPhotoIndex) && parsedPhotoIndex >= 0 ? parsedPhotoIndex : 0;
  const showSinglePhoto = advancedFeatures || photoIndex !== undefined;

  const loadPhotos = useCallback(() => {
    if (userId && userId.length === 24) {
      fetchModel(`/photosOfUser/${userId}`)
        .then((response) => {
          const sortedPhotos = [...response.data].sort(
            (a, b) => new Date(a.date_time) - new Date(b.date_time)
          );
          setPhotos(sortedPhotos);
        })
        .catch((err) => console.error("Load photos error:", err));
    }
  }, [userId]);

  useEffect(() => {
    loadPhotos();
  }, [loadPhotos]);

  const handleAddComment = (photoId) => {
    const text = commentTexts[photoId];
    if (!text || text.trim() === "") return;

    postModel(`/commentsOfPhoto/${photoId}`, { comment: text }).then(() => {
      loadPhotos();
      onDataChange();
      setCommentTexts({ ...commentTexts, [photoId]: "" });
    });
  };

  if (!photos) return <Typography sx={{ p: 2 }}>Loading photos from server...</Typography>;
  if (photos.length === 0) return <Typography sx={{ p: 2 }}>This user has no photos.</Typography>;

  if (showSinglePhoto && currentStep >= photos.length) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography color="error" gutterBottom>
          Photo at position {currentStep + 1} was not found.
        </Typography>
        <Button variant="contained" onClick={() => navigate(`/photos/${userId}/0`, { replace: true })}>
          Back to first photo
        </Button>
      </Box>
    );
  }

  const renderComments = (photo) => (
    photo.comments?.map((c) => (
      <Box key={c._id} sx={{ mb: 1, pl: 2, borderLeft: "3px solid #1976d2", bgcolor: "#f9f9f9", p: 1, borderRadius: "4px" }}>
        <Typography variant="caption">
          {c.user ? (
            <Link to={`/users/${c.user._id}`} style={{ fontWeight: "bold", textDecoration: "none" }}>
              {c.user.first_name} {c.user.last_name}
            </Link>
          ) : (
            <span>Unknown user</span>
          )}
          <span style={{ color: "gray", marginLeft: "8px" }}>
            ({new Date(c.date_time).toLocaleString()})
          </span>
        </Typography>
        <Typography variant="body2" sx={{ mt: 0.5 }}>{c.comment}</Typography>
      </Box>
    ))
  );

  const renderCommentInput = (photo) => (
    <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
      <TextField
        size="small"
        fullWidth
        placeholder="Write a comment..."
        value={commentTexts[photo._id] || ""}
        onChange={(e) => setCommentTexts({ ...commentTexts, [photo._id]: e.target.value })}
      />
      <Button variant="contained" size="small" onClick={() => handleAddComment(photo._id)}>
        Send
      </Button>
    </Box>
  );

  if (!showSinglePhoto) {
    return (
      <Box sx={{ p: 1 }}>
        {photos.map((p) => (
          <Card key={p._id} sx={{ mb: 4, boxShadow: 3 }}>
            <CardHeader title={`Posted at: ${new Date(p.date_time).toLocaleString()}`} />
            <CardMedia
              component="img"
              image={`${baseURL}/images/${p.file_name}`}
              sx={{ maxHeight: 500, objectFit: "contain", bgcolor: "#f5f5f5" }}
            />
            <CardContent>
              <Typography variant="h6" gutterBottom>Comments: ({p.comments.length})</Typography>
              {renderComments(p)}
              {renderCommentInput(p)}
            </CardContent>
          </Card>
        ))}
      </Box>
    );
  }

  const p = photos[currentStep];
  return (
    <Box sx={{ p: 1 }}>
      <Card sx={{ boxShadow: 5 }}>
        <CardHeader
          title={`Photo ${currentStep + 1} / ${photos.length}`}
          subheader={`Posted at: ${new Date(p.date_time).toLocaleString()}`}
        />
        <CardMedia
          component="img"
          image={`${baseURL}/images/${p.file_name}`}
          sx={{ maxHeight: 600, objectFit: "contain", bgcolor: "#000" }}
        />
        <CardContent>
          <Typography variant="h6" gutterBottom>Comments ({p.comments.length}):</Typography>
          {renderComments(p)}
          {renderCommentInput(p)}
        </CardContent>
      </Card>
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
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
