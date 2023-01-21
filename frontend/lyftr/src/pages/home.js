import { useLocation } from 'react-router-dom';
import React, { useContext } from 'react';
import Navbar from './components/Navbar/postLoginNavbar';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Grid from "@mui/material/Grid";
import { AuthContext } from '../App';
  
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
      <script>
        const [token, dispatchToken] = useContext(AuthContext);
        dispatchToken(useLocation().state.accessToken);
        console.log(token);
      </script>
      <Navbar/>
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
