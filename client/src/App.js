import React, { useState, useEffect } from "react";

import { Navbar, Card } from './components';
import { Box, Pagination } from '@mui/material';


import './App.css';

function App() {
  let [ isLoading, setIsLoading ] = useState(true)
  let [schools, setSchools] = useState(null);
  let [schoolName, setSchoolName] = useState(null);
  let [page, setPage] = useState(1);
  let [pageSize, setPageSize] = useState(24);
  let [pageCount, setPageCount] = useState(1);

  const fetchSchools = () => {
    let url = schoolName
      ? `/schoolsList?per_page=${pageSize}&page=${page}&school.name=${encodeURIComponent(schoolName)}`
      : `/schoolsList?per_page=${pageSize}&page=${page}`
    setIsLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setSchools(data.results)
        setPageCount(Math.ceil(data.metadata.total/pageSize));
      })
      .then(() => {
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (e, p) => {
    setPage(p);
    fetchSchools();
  };
  const handleSchoolSearch = (s) => {
    setSchoolName(s);
    fetchSchools();
  }

  useEffect(fetchSchools, [page, pageSize, schoolName]);

  return (
    <div className="App">
      <Navbar handleSchoolSearch={handleSchoolSearch} />
      {isLoading ? <div>Loading</div> : <Card schools={(schools)} />}
      <Box my={1} display="flex" justifyContent="center">
        <Pagination
          count={pageCount}
          showFirstButton
          showLastButton
          onChange={handleChange}
          page={page} />
      </Box>
    </div>
  );
}

export default App;
