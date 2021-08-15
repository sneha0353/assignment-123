import React, { useState } from "react";
import axios from "../axios";
import CustomizedCarousel from "./elements/Carousel";
import { CircularProgress, Grid } from "@material-ui/core";
import ComplexCard from "./elements/Card";

export default function Character() {
  const [characterData,setCharacterData] = useState();

    React.useEffect(()=>{
        axios.get(`/characters/${localStorage.getItem('id')}`).then(data => {
            setCharacterData(data.data[0])
            console.log(data.data[0])
        })
    },[]);


  return (
    <div>
    <Grid container >
    <Grid xs={12} direction="row"> 
      {characterData ? 
      <ComplexCard data={characterData}  />
      :
      <div><CircularProgress/></div>
      }
    </Grid>
    <Grid xs={12}>
        <CustomizedCarousel />
    </Grid>
    </Grid>
    </div>
  );
}