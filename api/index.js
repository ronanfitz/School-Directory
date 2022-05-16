const express = require("express");

const PORT = process.env.PORT || 3001;
const app = express();
const needle = require('needle');
const url = require('url')
require('dotenv').config();

app.use(express.json());

const COLLEGE_BASE_URL = process.env.COLLEGE_BASE_URL;
const COLLEGE_BASE_KEY = process.env.COLLEGE_BASE_KEY;
const COLLEGE_PUBLIC_KEY = process.env.COLLEGE_PUBLIC_KEY;
 
app.get("/schoolsList", async (req, res) => {
  try {
    const params = new URLSearchParams({
      [COLLEGE_BASE_KEY] : COLLEGE_PUBLIC_KEY,
      'fields' : 'id,school.name,school.region_id',
      'sort' : 'school.name:asc',
      ...url.parse(req.url, true).query,
    });
 
    const apiRes = await needle("get", `${COLLEGE_BASE_URL}?${params}`);
    const data = apiRes.body;
 
    // Log the request to the public API
    if (process.env.NODE_ENV !== "production") {
      console.log(`REQUEST: ${COLLEGE_BASE_URL}?${params}`);
    }
 
    res.status(200).json(data);
  } catch (error) {
    console.log(error)
  }
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});