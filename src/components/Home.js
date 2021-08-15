import React from 'react';
import { alpha, makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from "./elements/Button"

import bbimage from "../images/breaking-bad-1.jpg";

import './Home.css'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 500,
    backgroundColor: alpha(theme.palette.common.white,0.85)
  },
  media: {
    height: 300,
    width: 500
  },
}));

export default function Home() {
  const classes = useStyles();

  return (
    <div className='home' style={{paddingLeft:'40px',paddingTop:'30px'}}> 
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={bbimage}
          title="breaking-bad"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Breaking Bad Cast
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          Breaking Bad is an American neo-Western crime drama television series created and produced by Vince Gilligan. The show aired on AMC from January 20, 2008, to September 29, 2013, consisting of five seasons for a total of 62 episodes. It was set and filmed in Albuquerque, New Mexico, and tells the story of Walter White (Bryan Cranston), an underpaid, overqualified and dispirited high school chemistry teacher who is struggling with a recent diagnosis of stage-three lung cancer. White turns to a life of crime, partnering with his former student Jesse Pinkman (Aaron Paul), by producing and distributing crystal meth to secure his family's financial future before he dies, while navigating the dangers of the criminal underworld.
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>     
      <Button text="Get Started" value="/get-started"/>
      </CardActions>
    </Card>
    </div>
  );
}
