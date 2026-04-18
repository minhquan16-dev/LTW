import React, { useState, useEffect } from "react";
// 1. Phải import thêm Checkbox và FormControlLabel
import { AppBar, Toolbar, Typography, Checkbox, FormControlLabel } from "@mui/material";
import { useLocation } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";

// 2. Phải nhận props { advancedFeatures, setAdvancedFeatures } từ App.js
function TopBar({ advancedFeatures, setAdvancedFeatures }) {
  const location = useLocation();
  const [contextText, setContextText] = useState("");

  useEffect(() => {
    const parts = location.pathname.split("/");
    if (parts.length > 2 && (parts[1] === "users" || parts[1] === "photos")) {
      const userId = parts[2];
      // Kiểm tra độ dài ID để tránh lỗi format 400
      if (userId.length === 24) {
        fetchModel(`/user/${userId}`).then((res) => {
          const user = res.data;
          const name = `${user.first_name} ${user.last_name}`;
          setContextText(parts[1] === "users" ? name : `Photos of ${name}`);
        }).catch(() => setContextText(""));
      }
    } else {
      setContextText("Photo App");
    }
  }, [location]);

  return (
    <AppBar position="fixed" sx={{ zIndex: 2000 }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6">Nguyễn Minh Quân</Typography>

        {/* 3. THÊM CHECKBOX Ở ĐÂY ĐỂ BẬT TẮT STEPPER */}
        <FormControlLabel
          control={
            <Checkbox
              checked={advancedFeatures}
              onChange={(e) => setAdvancedFeatures(e.target.checked)}
              sx={{ color: "white", '&.Mui-checked': { color: "white" } }}
            />
          }
          label="Enable Advanced Features"
          sx={{ color: "white" }}
        />

        <Typography variant="h6" sx={{ fontStyle: 'italic' }}>
          {contextText}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;