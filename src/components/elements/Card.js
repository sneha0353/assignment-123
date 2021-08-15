import React from 'react';
import { alpha, makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import WorkIcon from '@material-ui/icons/Work';
import { Collapse, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { ExpandLess, StarBorder } from '@material-ui/icons';
import MovieIcon from '@material-ui/icons/Movie';
import GroupWorkIcon from '@material-ui/icons/GroupWork';
import ExpandMore from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop:10
  },
  paper: {
    backgroundColor: alpha(theme.palette.common.white,0.85),
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 800,
  },
  image: {
    width: 300,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));

export default function ComplexCard({data}) {
  const classes = useStyles();
    console.log(data)

  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleClick1 = () => {
    setOpen1(!open1);
  };
  const generateBirthday = (birthday) => {
    if(birthday === 'Unknown'){
        return 'UNKNOWN'
    } else {
        var date = new Date(birthday);
        return date.toString().slice(0,16)
    }
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={4}>
          <Grid item>
            <ButtonBase className={classes.image}>
              <img className={classes.img} alt="complex" src={data.img} />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={3}>
              <Grid item xs>
              <Card className={classes.root} variant="outlined">
                <CardContent>
                    <Typography variant="h5" className={classes.title} component="h2">
                    {data.name} {data.nickname && "("+data.nickname+")"}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                    {generateBirthday(data.birthday)}
                    </Typography>
                    <br/>
                    <Typography className={classes.pos} color="textSecondary">
                    Portrayed By, &nbsp;{data.portrayed}{"("+data.status+")"}
                    </Typography>
                    <br/>
                    <Typography className={classes.pos} component="p">
                    <ListItem button onClick={handleClick}>
                        <ListItemIcon>
                        <WorkIcon />
                        </ListItemIcon>
                        <ListItemText primary="Occupations" />
                        {open ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {data.occupation.map(item => (
                                <ListItem button className={classes.nested}>
                            <ListItemIcon>
                            <StarBorder />
                            </ListItemIcon>
                            <ListItemText primary={item} />
                        </ListItem>
                        ))}   
                        </List>
                    </Collapse>
                    <br />
                    </Typography>
                    <Typography className={classes.pos} component="p">
                    <ListItem button onClick={handleClick1}>
                        <ListItemIcon>
                        <MovieIcon />
                        </ListItemIcon>
                        <ListItemText primary="Appearance" />
                        {open1 ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={open1} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {data.appearance.map(item => (
                                <ListItem button className={classes.nested}>
                            <ListItemIcon>
                            <GroupWorkIcon />
                            </ListItemIcon>
                            <ListItemText primary={'Season '+item} />
                        </ListItem>
                        ))}   
                        </List>
                    </Collapse>
                    <br />
                    </Typography>
                </CardContent>
                <br />
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
