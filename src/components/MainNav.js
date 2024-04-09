import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import MovieCreationIcon from '@mui/icons-material/MovieCreation';
import TvIcon from '@mui/icons-material/Tv';
import SearchIcon from '@mui/icons-material/Search';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';





export default function SimpleBottomNavigation() {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();

  useEffect(()=>{
    if(value === 0){
        navigate("/");
    }
    else if(value === 1){
        navigate("/movies");
    }
    else if(value === 2){
        navigate("/series");
    }
    else if(value === 3){
        navigate("/search");
    }
  },[value,navigate])

  return (
    <Box sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
  <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        sx={{
          "& .Mui-selected, .Mui-selected > svg": {
            color: "rgb(52, 216, 159)",
          },
          backgroundColor: "#101110;",
        }}
      >
        <BottomNavigationAction sx={{color:'white',fontSize:'20px'}} label="Trending" icon={<WhatshotIcon />} />
        <BottomNavigationAction sx={{color:'white',fontSize:'20px'}} label="Movies" icon={<MovieCreationIcon />} />
        <BottomNavigationAction sx={{color:'white',fontSize:'20px'}} label="TV Series" icon={<TvIcon />} />
        <BottomNavigationAction sx={{color:'white',fontSize:'20px'}} label="Search" icon={<SearchIcon />} />
      </BottomNavigation>
      </Box>
  );
}