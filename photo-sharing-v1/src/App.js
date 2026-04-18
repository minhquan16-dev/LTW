import React, { useState } from "react";
import { Grid, Paper, Box, Toolbar } from "@mui/material";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import TopBar from "./components/TopBar";
import UserDetail from "./components/UserDetail";
import UserList from "./components/UserList";
import UserPhotos from "./components/UserPhotos";
import UserComments from "./components/UserComments";
const App = () => {
  const [advancedFeatures, setAdvancedFeatures] = useState(false);
  return (
    <Router>
      <Box sx={{ flexGrow: 1 }}>
        <TopBar advancedFeatures={advancedFeatures} setAdvancedFeatures={setAdvancedFeatures} />
        <Toolbar />
        <Grid container spacing={2} sx={{ mt: 1, px: 2 }}>
          <Grid item sm={3}>
            <Paper elevation={3} sx={{ height: '85vh', overflow: 'auto', borderRadius: '15px' }}><UserList /></Paper>
          </Grid>
          <Grid item sm={9}>
            <Paper elevation={3} sx={{ height: '85vh', overflow: 'auto', p: 3, borderRadius: '15px' }}>
              <Routes>
                <Route path="/users/:userId" element={<UserDetail />} />
                <Route path="/photos/:userId/:photoIndex" element={<UserPhotos advancedFeatures={advancedFeatures} />} />
                <Route path="/photos/:userId" element={<UserPhotos advancedFeatures={advancedFeatures} />} />
                <Route path="/comments/:userId" element={<UserComments />} />
                <Route path="/" element={<h3>Vui lòng chọn một người dùng.</h3>} />
              </Routes>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Router>
  );
};
export default App;