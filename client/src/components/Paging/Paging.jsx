import React, { useState, useEffect } from "react";

import { Box, Pagination } from '@mui/material';

function Paging() {
  let [page, setPage] = useState(1);
  let [pageSize, setPageSize] = useState(24);
  let [pageCount, setPageCount] = useState(1);

  const handleChange = (e, p) => {
    setPage(p);
  };

  return (
    <Box my={1} display="flex" justifyContent="center">
    <Pagination
        count={pageCount}
        showFirstButton
        showLastButton
        onChange={handleChange}
        page={page} />
    </Box>
  );
}

export default Paging;
