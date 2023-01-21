import React from 'react';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Grid from "@mui/material/Grid";
  
const Home = () => {
  return (
    <div
      style={{
        display: 'inline',
        justifyContent: 'left',
        alignItems: 'Right',
        height: '80vh'
      }}
    >
        <Paper style={{ margin: "20px" }} elevation={24}>
            <Grid container spacing={1}>
                <h2 style={{
                    paddingLeft: "30px",
                    paddingRight: "30px"
                }}>
                    Your recent activities:
                </h2>
                <Button variant="contained" style={{margin: "10px"}}>Start Logging</Button>
            </Grid>
        </Paper>
    </div>
  );
};
  
export default Home;
