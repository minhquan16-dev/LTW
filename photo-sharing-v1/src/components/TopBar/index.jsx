import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Checkbox, FormControlLabel, Button, Box } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import fetchModel, { postFormData } from "../../lib/fetchModelData";

function TopBar({ advancedFeatures, setAdvancedFeatures, user, onLogout, onDataChange }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [contextText, setContextText] = useState("");

  useEffect(() => {
    if (!user) { setContextText(""); return; }
    const parts = location.pathname.split("/");
    if (parts.length > 2 && (parts[1] === "users" || parts[1] === "photos")) {
      const userId = parts[2];
      if (userId.length === 24) {
        fetchModel(`/user/${userId}`).then((res) => {
          const u = res.data;
          const name = `${u.first_name} ${u.last_name}`;
          setContextText(parts[1] === "users" ? name : `Photos of ${name}`);
        }).catch(() => setContextText(""));
      }
    } else {
      setContextText("Photo App");
    }
  }, [location.pathname, user]);

  const handleLogout = () => {
    localStorage.removeItem("token");  // Xóa JWT token
    onLogout();
  };

  const handleUploadPhoto = (e) => {
    const file = e.target.files[0];
    e.target.value = "";
    if (!file) return;
    const formData = new FormData();
    formData.append("photo", file);
    postFormData("/photos/new", formData).then(() => {
      if (onDataChange) onDataChange();
      navigate(`/photos/${user._id}?refresh=${Date.now()}`);
    });
  };

  return (
    <AppBar position="fixed" sx={{ zIndex: 2000 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
        <Typography variant="h6">
          {user ? `Hi ${user.first_name}` : "Please Login"}
        </Typography>

        {user && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={advancedFeatures}
                  onChange={(e) => setAdvancedFeatures(e.target.checked)}
                  sx={{ color: "white", "&.Mui-checked": { color: "white" } }}
                />
              }
              label="Enable Advanced Features"
              sx={{ color: "white" }}
            />
            <Typography variant="h6" sx={{ fontStyle: "italic" }}>
              {contextText}
            </Typography>
          </Box>
        )}

        {user && (
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button color="inherit" component="label">
              Add Photo
              <input type="file" hidden accept="image/*" onChange={handleUploadPhoto} />
            </Button>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
