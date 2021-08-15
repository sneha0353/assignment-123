// import React from 'react';
// import Carousel from 'react-material-ui-carousel'
// import { Paper, Button } from '@material-ui/core'

// const Item = (props) => {
//     return (
//         <Paper style={{padding:'20px'}}>
//             <h2>{props.item.name}</h2>
//             <p>{props.item.description}</p>

//             <Button className="CheckButton">
//                 Check it out!
//             </Button>
//         </Paper>
//     )
// }

// const CustomizedCarousel = (props) => {
//     var items = [
//         {
//             name: "Random Name #1",
//             description: "Probably the most random thing you have ever seen!"
//         },
//         {
//             name: "Random Name #2",
//             description: "Hello World!"
//         }
//     ]

//     return (
//         <div style={{width:'70%',marginTop:'25px'}}>
//         <Carousel>
//             {
//                 items.map( (item, i) => <Item key={i} item={item} /> )
//             }
//         </Carousel>
//         </div>
//     )
// }

// export default CustomizedCarousel;


import React,{useEffect, useState} from "react";
import cx from "classnames";
import NonPassiveTouchTarget from "./NonPassiveTouchTarget";
import TouchCarousel, { clamp } from "react-touch-carousel";
import touchWithMouseHOC from "react-touch-carousel/lib/touchWithMouseHOC";
import axios from "../../axios";
import "./styles.css"

const cardSize = 200;
const cardPadCount = 3;
const carouselWidth = clamp(window.innerWidth, 0, 960);

const CustomizedCarousel=()=>
{
    const [listOfData,setListOfData] = useState([])

    useEffect(()=>{
        axios.get(`/quote?author=${localStorage.getItem('name')}`).then(quotes => {
            console.log(quotes.data)
            var arr = []
            quotes.data.map(item => (
                arr.push({title:item.series,background:"#ffffff",text:`"${item.quote}"`,textsay:`By:- ${item.author}`})
            ));
            setListOfData(arr);
        })
    },[]);

    function CarouselContainer(props) {
        const {
          cursor,
          carouselState: { active, dragging },
          ...rest
        } = props;
        let current = -Math.round(cursor) % listOfData ? listOfData.length : 0
        while (current < 0) {
          current += listOfData ?listOfData.length : 0
        }
        // Put current card at center
        const translateX =
          (cursor - cardPadCount) * cardSize + (carouselWidth - cardSize) / 2;
      
        return (
          <NonPassiveTouchTarget
            className={cx("carousel-container", {
              "is-active": active,
              "is-dragging": dragging
            })}
          >
            <NonPassiveTouchTarget
              className="carousel-track"
              style={{ transform: `translate3d(${translateX}px, 0, 0)` }}
              {...rest}
            />
      
            <div className="carousel-pagination-wrapper">
              <ol className="carousel-pagination">
                {listOfData && listOfData.map((_, index) => (
                  <li key={index} className={current === index ? "current" : ""} />
                ))}
              </ol>
            </div>
          </NonPassiveTouchTarget>
        );
      }
      
    const Container = touchWithMouseHOC(CarouselContainer);
    function renderCard (index, modIndex, cursor) {
    const item = listOfData ? listOfData[modIndex]:""
        return (
            <div
            key={index}
            className="carousel-card"
            onClick={() => console.log(`clicked card ${1 + modIndex}`)}
            >
            <div
                className="carousel-card-inner"
                style={{ backgroundColor: item ? item.background :" " }}
            >
                <div className="carousel-title">{item ? item.title : ""}</div>
                <div className="carousel-text">{item ? item.text :""}</div>
                <div className="carousel-text1">{item ? item.textsay :""}</div>
            </div>
            </div>
        )
    }

    return(
        listOfData.length > 0 &&
        <TouchCarousel
          component={Container}
          cardCount={listOfData ? listOfData.length : 0}
          cardSize={375}
          renderCard={renderCard}
          loop
          autoplay={3000}
        />
    )
}

export default CustomizedCarousel;

