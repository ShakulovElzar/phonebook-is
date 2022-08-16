import React from 'react';
import Carousel from 'react-material-ui-carousel'
import { Paper } from '@mui/material'
import { styled } from '@mui/material/styles';
import {useNavigate} from "react-router-dom";

const Item = styled(Paper)(() => ({
  width: 515,
  height: 320,
}));

const Profcom = () => {

    const items = [
        {"content": "https://ak.picdn.net/shutterstock/videos/1057977454/preview/stock-footage-white-curtain-blowing-by-wind-in-room-outside-is-coconut-tree-swaying-by-wind-fresh-and-deep.webm", "text": "1"},
        {"content": "https://ak.picdn.net/shutterstock/videos/1057977454/preview/stock-footage-white-curtain-blowing-by-wind-in-room-outside-is-coconut-tree-swaying-by-wind-fresh-and-deep.webm", "text": "2"},
        {"content": "https://ak.picdn.net/shutterstock/videos/1057977454/preview/stock-footage-white-curtain-blowing-by-wind-in-room-outside-is-coconut-tree-swaying-by-wind-fresh-and-deep.webm", "text": "3"},
        {"content": "https://ak.picdn.net/shutterstock/videos/1057977454/preview/stock-footage-white-curtain-blowing-by-wind-in-room-outside-is-coconut-tree-swaying-by-wind-fresh-and-deep.webm", "text": "4"},
        {"content": "https://ak.picdn.net/shutterstock/videos/1057977454/preview/stock-footage-white-curtain-blowing-by-wind-in-room-outside-is-coconut-tree-swaying-by-wind-fresh-and-deep.webm", "text": "5"},
        {"content": "https://ak.picdn.net/shutterstock/videos/1057977454/preview/stock-footage-white-curtain-blowing-by-wind-in-room-outside-is-coconut-tree-swaying-by-wind-fresh-and-deep.webm", "text": "6"},
        {"content": "https://ak.picdn.net/shutterstock/videos/1057977454/preview/stock-footage-white-curtain-blowing-by-wind-in-room-outside-is-coconut-tree-swaying-by-wind-fresh-and-deep.webm", "text": "7"},
        {"content": "https://ak.picdn.net/shutterstock/videos/1057977454/preview/stock-footage-white-curtain-blowing-by-wind-in-room-outside-is-coconut-tree-swaying-by-wind-fresh-and-deep.webm", "text": "8"},
        {"content": "https://ak.picdn.net/shutterstock/videos/1057977454/preview/stock-footage-white-curtain-blowing-by-wind-in-room-outside-is-coconut-tree-swaying-by-wind-fresh-and-deep.webm", "text": "9"},
        {"content": "https://ak.picdn.net/shutterstock/videos/1057977454/preview/stock-footage-white-curtain-blowing-by-wind-in-room-outside-is-coconut-tree-swaying-by-wind-fresh-and-deep.webm", "text": "10"},
        {"content": "https://ak.picdn.net/shutterstock/videos/1057977454/preview/stock-footage-white-curtain-blowing-by-wind-in-room-outside-is-coconut-tree-swaying-by-wind-fresh-and-deep.webm", "text": "11"},
        {"content": "https://ak.picdn.net/shutterstock/videos/1057977454/preview/stock-footage-white-curtain-blowing-by-wind-in-room-outside-is-coconut-tree-swaying-by-wind-fresh-and-deep.webm", "text": "12"},
        {"content": "https://ak.picdn.net/shutterstock/videos/1057977454/preview/stock-footage-white-curtain-blowing-by-wind-in-room-outside-is-coconut-tree-swaying-by-wind-fresh-and-deep.webm", "text": "13"},
        {"content": "https://ak.picdn.net/shutterstock/videos/1057977454/preview/stock-footage-white-curtain-blowing-by-wind-in-room-outside-is-coconut-tree-swaying-by-wind-fresh-and-deep.webm", "text": "14"},
        {"content": "https://ak.picdn.net/shutterstock/videos/1057977454/preview/stock-footage-white-curtain-blowing-by-wind-in-room-outside-is-coconut-tree-swaying-by-wind-fresh-and-deep.webm", "text": "15"},
        {"content": "https://ak.picdn.net/shutterstock/videos/1057977454/preview/stock-footage-white-curtain-blowing-by-wind-in-room-outside-is-coconut-tree-swaying-by-wind-fresh-and-deep.webm", "text": "16"},
        {"content": "https://ak.picdn.net/shutterstock/videos/1057977454/preview/stock-footage-white-curtain-blowing-by-wind-in-room-outside-is-coconut-tree-swaying-by-wind-fresh-and-deep.webm", "text": "17"},
        {"content": "https://ak.picdn.net/shutterstock/videos/1057977454/preview/stock-footage-white-curtain-blowing-by-wind-in-room-outside-is-coconut-tree-swaying-by-wind-fresh-and-deep.webm", "text": "18"},
        {"content": "https://ak.picdn.net/shutterstock/videos/1057977454/preview/stock-footage-white-curtain-blowing-by-wind-in-room-outside-is-coconut-tree-swaying-by-wind-fresh-and-deep.webm", "text": "19"},
    ];

    let numberOfPages = Math.ceil(items.length / 6);
    let NOPArr = [];
    for(let i = 1; i <= numberOfPages; i++) {
        NOPArr.push(i)
    }


    return (
        <Carousel
            swipe={true}
            autoPlay={false}
            navButtonsAlwaysVisible={true}
            className="page-body"
        >

            {
                NOPArr.map((item, index) => <div className='carousel__wrapper' key={index}>
                    {
                        items.slice((index * 6), (index * 6 + 6)).map((item, index) =>
                            <CarouselItem text={item.text} id={index} key={index} content={item.content}/>)
                    }
                    </div>
                )
            }
        </Carousel>
    );
};

const CarouselItem = (props) => {
    const navigate = useNavigate();
    return (
        <Item className="carousel__item" onClick={() => {
            navigate(`/profcom/${(props.id)}`)
        }}>
                <video
                    autoPlay={true}
                    loop={true}
                    id="video"
                    src={props.content}
                    style={{width: 515, height: 320}}
                ></video>
        </Item>
    );
};

export default Profcom;