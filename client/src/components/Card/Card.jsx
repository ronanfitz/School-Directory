import React, { useState } from 'react';

import { Grid, Collapse, Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import Image from '../../images/american_flag.jpg'

function SchoolDisplayCard(props) {
  const regionColorMap = {
    0 : { backgroundImage: `url(${Image})`, backgroundSize: 'contain' },
    1 : { backgroundColor : '#005f73'},
    2 : { backgroundColor : '#0a9396'},
    3 : { backgroundColor : '#94d2bd'},
    4 : { backgroundColor : '#e9d8a6'},
    5 : { backgroundColor : '#ee9b00'},
    6 : { backgroundColor : '#ca6702'},
    7 : { backgroundColor : '#bb3e03'},
    8 : { backgroundColor : '#ae2012'},
    9 : { backgroundColor : '#9b2226'},
  }

  const [expandId, setExpandId] = useState(-1);

  const handleChange = (i) => {
    setExpandId(expandId === i ? -1 : i);
  };

  return (
    <React.Fragment>
      <Grid
        container
        spacing={2}
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
      >
        {props.schools.map((school, i) => (
          <Grid key={i} item xs={4}>
            <Collapse key={i} in={expandId === i} collapsedSize={50}>
              <Card sx={regionColorMap[school['school.region_id']]}>
                <CardActionArea onClick={() => handleChange(i)}>
                  <CardContent>
                    <Typography gutterBottom variant="inherit" component="div" sx={{color: 'white'}}>
                        {school['school.name']}
                    </Typography>
                  </CardContent>
                  <CardMedia>
                    <iframe
                      title='Maps'
                      width="100%"
                      height="400"
                      style={{ border: 0 }}
                      loading="lazy"
                      allowFullScreen
                      referrerPolicy="no-referrer-when-downgrade"
                      src={`https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_MAPS_PUBLIC_KEY}
                      &q=${encodeURIComponent(school['school.name'])}`}>
                    </iframe>
                  </CardMedia>
                </CardActionArea>
              </Card>
            </Collapse>
          </Grid>
        ))}
      </Grid>
    </React.Fragment>
  );
};

export default SchoolDisplayCard;