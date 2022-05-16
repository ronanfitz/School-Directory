import React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Tooltip from '@mui/material/Tooltip';

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

function SearchAppBar(props) {
  const regionsList = ['U.S. Service Schools', 'New England', 'Mid East', 'Great Lakes', 'Plains', 'Southeast', 'Southwest', 'Rocky Mountains', 'Far West', 'Outlying Areas'];
  const regionColorList = ['#005f73', '#0a9396', '#94d2bd', '#e9d8a6', '#ee9b00', '#ca6702', '#bb3e03', '#ae2012', '#9b2226']

  return (
    <Box mb={2} sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "flex" } }}
          >
            School Directory
          </Typography>
          <Tooltip
          arrow
          title={
            regionsList.map((region, i) => (
              <div style={ i===0 ? {background: `-webkit-linear-gradient(#750000, white, blue)`} : {color: regionColorList[i]}}>
                {region}
              </div>
            ))
          }
          placement="bottom-end"
          >
            <HelpOutlineIcon
              sx={{ display: { xs: "none", sm: "block" } }}
            />
          </Tooltip>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  props.handleSchoolSearch(e.target.value)
                }
              }}
            />
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default SearchAppBar;
