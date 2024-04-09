import { Pagination, ThemeProvider, createTheme } from '@mui/material'
import React from 'react'


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

const CustomPagination = ({setPage,numOfPages = 10}) => {

    const handlePageChange = (page) =>{
        setPage(page);
        window.scroll(0,0);
    }

  return (
    <div style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        marginTop: 10,
      }}>
        <ThemeProvider theme={darkTheme} >
        <Pagination color='primary' count={numOfPages} onChange={(e)=>handlePageChange(e.target.textContent)} variant="outlined" shape="rounded" hideNextButton hidePrevButton/>
        </ThemeProvider>
    </div>
  )
}

export default CustomPagination