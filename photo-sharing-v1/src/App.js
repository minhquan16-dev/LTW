import React, { useState } from "react";
import { Grid, Paper, Box, Toolbar } from "@mui/material";
import { HashRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import TopBar from "./components/TopBar";
import UserDetail from "./components/UserDetail";
import UserList from "./components/UserList";
import UserPhotos from "./components/UserPhotos";
import UserComments from "./components/UserComments";
import LoginRegister from "./components/LoginRegister";

const App = () => {
  const [advancedFeatures, setAdvancedFeatures] = useState(false);
  const [user, setUser] = useState(null);
  const [userListVersion, setUserListVersion] = useState(0);

  const handleLogin = (loggedInUser) => setUser(loggedInUser);
  const handleLogout = () => setUser(null);
  const refreshUserList = () => setUserListVersion((version) => version + 1);

  return (
    <Router>
      <Box sx={{ flexGrow: 1 }}>
        <TopBar
          advancedFeatures={advancedFeatures}
          setAdvancedFeatures={setAdvancedFeatures}
          user={user}
          onLogout={handleLogout}
          onDataChange={refreshUserList}
        />
        <Toolbar />
        <Grid container spacing={2} sx={{ mt: 1, px: 2 }}>
          {/* Sidebar: chỉ hiện khi đã đăng nhập */}
          {user && (
            <Grid item sm={3}>
              <Paper elevation={3} sx={{ height: "85vh", overflow: "auto", borderRadius: "15px" }}>
                <UserList refreshKey={userListVersion} />
              </Paper>
            </Grid>
          )}

          <Grid item sm={user ? 9 : 12}>
            <Paper elevation={3} sx={{ height: "85vh", overflow: "auto", p: 3, borderRadius: "15px" }}>
              <Routes>
                {user ? (
                  <>
                    <Route path="/users/:userId" element={<UserDetail />} />
                    <Route path="/photos/:userId/:photoIndex" element={<UserPhotos advancedFeatures={advancedFeatures} onDataChange={refreshUserList} />} />
                    <Route path="/photos/:userId" element={<UserPhotos advancedFeatures={advancedFeatures} onDataChange={refreshUserList} />} />
                    <Route path="/comments/:userId" element={<UserComments />} />
                    <Route path="/" element={<Navigate to={`/users/${user._id}`} />} />
                    <Route path="*" element={<Navigate to={`/users/${user._id}`} />} />
                  </>
                ) : (
                  <>
                    <Route path="*" element={<LoginRegister onLogin={handleLogin} />} />
                  </>
                )}
              </Routes>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Router>
  );
};

export default App;
