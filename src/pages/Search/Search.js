import { Button, Tab, Tabs, TextField, ThemeProvider, createTheme } from '@mui/material';
import React, { useEffect, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import "./Search.css";
import axios from "axios"
import CustomPagination from '../../components/Pagination/CustomPagination';
import SingleContent from '../../components/SingleContent/SingleContent';


const darkTheme = createTheme({
  palette: {
    mode: 'dark', // Set to 'dark' for dark mode, 'light' for light mode
    primary: {
      main: '#34D89F', // Define the primary color for Pagination in dark mode
    },
    background: {
      paper: '#121212', // Define the background color for Pagination in dark mode
    },
  },
});






const Search = () => {

  const [type,setType ] = useState(0);
  const [page,setPage] = useState(1)
  const [searchText,setSearchText] = useState("")
  const [content,setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();


  const fetchSearch = async()=>{
    try {
      const { data } = await axios.get(`https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${searchText}&page=${page}&include_adult=false`);
      setContent(data.results);
      setNumOfPages(data.total_pages);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
  
  useEffect(() => {
    window.scroll(0, 0);
    fetchSearch();
  },);


  return (
    <div>
    <ThemeProvider theme={darkTheme} >
      <div className="search">
        <TextField style={{ flex: 1,backgroundColor:'#101110',color:'#34D89F' }} className="searchBox" label="Search" variant="filled" onChange={(e) => setSearchText(e.target.value)} />
        <Button variant="contained" style={{ marginLeft: 10 }} onClick={fetchSearch}> <SearchIcon/> </Button>
      </div>
      <Tabs value={type} indicatorColor="primary" textColor="primary"  onChange={(event,newValue) => {setType(newValue);setPage(1)}} style={{paddingBottom:5}}>
          <Tab style={{ width: "50%" }} label="Search Movies" />
          <Tab style={{ width: "50%" }} label="Search TV Series" />
      </Tabs>
    </ThemeProvider>

    <div className="trending">
        {
            content && content.map((c)=>
                <SingleContent key={c.id} id={c.id} poster={c.poster_path} title={c.title || c.name} date={c.first_air_date || c.release_date} media_type={type? "tv" : "movie"} vote_average={c.vote_average}/>
            )
        }
        {searchText && !content && (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}
    </div>

    {numOfPages > 1 && (
    <CustomPagination setPage={setPage} numOfPages={numOfPages>500?500:numOfPages}/>
    )}
    
    </div>
  )
}

export default Search