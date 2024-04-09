import * as React from 'react';
import { useEffect, useState } from 'react'
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// eslint-disable-next-line
import axios from "axios"
import { img_500, unavailable } from '../../config/config';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { ThemeProvider, createTheme } from '@mui/material';
import "./ContentModal.css";



const darkTheme = createTheme({
    palette: {
      mode: 'dark', // Set to 'dark' for dark mode, 'light' for light mode
      primary: {
        main: '#34D89F', // Define the primary color for Pagination in dark mode
      },
      background: {
        paper: '#34D89F', // Define the background color for Pagination in dark mode
      },
    },
  });




const style = {
  position: 'absolute',
  top: '20%',
  left: '20%',
  transform: 'translate(-20%, -17%)',
  width: "90%",
  height: "80%",
  bgcolor: '#101110',
  borderRadius:'20px',
  border: '2px solid #34D89F',
  outline:'none',
//   boxShadow: 24,
  p: 4,
  color:'#34D89F'
};

export default function ContentModal({children,media_type,id}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [content, setContent] = useState();
  const [video, setVideo] = useState();

  
  useEffect(()=>{
    const fetchData = async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
      );
  
      setContent(data);
    };
  
    const fetchVideo = async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
      );
      console.log(data);
      setVideo(data.results[0]?.key);
    };
    fetchData();
    fetchVideo();
  },[id,media_type])

  return (
    <div>
      <div onClick={handleOpen}  className="media" >{children}</div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
           
          {content && <Box sx={style}>
            <div className="ContentModal">
                <img className='ContentModal__portrait' src={content.poster_path?`${img_500}/${content.poster_path}`: unavailable} alt={content.name || content.title} />
                <img className='ContentModal__landscape' src={content.backdrop_path?`${img_500}/${content.backdrop_path}`: unavailable} alt={content.name || content.title} />
                <div className="ContentModal__about">

                    <span className="ContentModal__title">
                    {content.name || content.title} (
                    {(
                      content.first_air_date ||
                      content.release_date ||
                      "-----"
                    ).substring(0, 4)}
                    )
                    </span>

                    {content.tagline && (<i className="tagline">{content.tagline}</i>)}

                    <span className="ContentModal__description">{content.overview}</span>

                    {/* <div>
                    <Carousel id={id} media_type={media_type} />
                    </div> */}

                    <ThemeProvider theme={darkTheme}>
                    <Button style={{fontWeight:'bold'}} variant="contained" startIcon={<YouTubeIcon />} color='primary' target="__blank" href={`https://www.youtube.com/watch?v=${video}`}> Watch the Trailer </Button>
                    </ThemeProvider>
                </div>
            </div>
          </Box>}
          
        </Fade>
      </Modal>
    </div>
  );
}