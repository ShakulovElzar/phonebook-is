import React, {useContext, useEffect, useState} from 'react';
import Carousel from 'react-material-ui-carousel'
import {useNavigate} from "react-router-dom";
import {AdminContext} from "../context";
import axios from "axios";

const testLinks = [
    "https://ak.picdn.net/shutterstock/videos/1057977454/preview/stock-footage-white-curtain-blowing-by-wind-in-room-outside-is-coconut-tree-swaying-by-wind-fresh-and-deep.webm",
    "https://ak.picdn.net/shutterstock/videos/1090804479/preview/stock-footage-security-camera-surveillance-footage-face-scanning-of-crowd-of-people-walking-on-busy-station-big.webm",
    "https://ak.picdn.net/shutterstock/videos/1059056354/preview/stock-footage-hud-technological-futuristic-intro-scifi-data-user-interface-digital-infographic-elements-d.webm"
];


const Profcom = () => {
    const {isAdmin} = useContext(AdminContext);
    const [postsData, setPostsData] = useState([]);
    const items = [
        {
            "content": "https://ak.picdn.net/shutterstock/videos/1057977454/preview/stock-footage-white-curtain-blowing-by-wind-in-room-outside-is-coconut-tree-swaying-by-wind-fresh-and-deep.webm",
            "text": "1"
        },
        {
            "content": "https://ak.picdn.net/shutterstock/videos/1057977454/preview/stock-footage-white-curtain-blowing-by-wind-in-room-outside-is-coconut-tree-swaying-by-wind-fresh-and-deep.webm",
            "text": "2"
        },
        {
            "content": "https://ak.picdn.net/shutterstock/videos/1057977454/preview/stock-footage-white-curtain-blowing-by-wind-in-room-outside-is-coconut-tree-swaying-by-wind-fresh-and-deep.webm",
            "text": "3"
        },
        {
            "content": "https://ak.picdn.net/shutterstock/videos/1057977454/preview/stock-footage-white-curtain-blowing-by-wind-in-room-outside-is-coconut-tree-swaying-by-wind-fresh-and-deep.webm",
            "text": "4"
        },
        {
            "content": "https://ak.picdn.net/shutterstock/videos/1057977454/preview/stock-footage-white-curtain-blowing-by-wind-in-room-outside-is-coconut-tree-swaying-by-wind-fresh-and-deep.webm",
            "text": "5"
        },
        {
            "content": "https://ak.picdn.net/shutterstock/videos/1057977454/preview/stock-footage-white-curtain-blowing-by-wind-in-room-outside-is-coconut-tree-swaying-by-wind-fresh-and-deep.webm",
            "text": "6"
        },
        {
            "content": "https://ak.picdn.net/shutterstock/videos/1057977454/preview/stock-footage-white-curtain-blowing-by-wind-in-room-outside-is-coconut-tree-swaying-by-wind-fresh-and-deep.webm",
            "text": "7"
        },
        {
            "content": "https://ak.picdn.net/shutterstock/videos/1057977454/preview/stock-footage-white-curtain-blowing-by-wind-in-room-outside-is-coconut-tree-swaying-by-wind-fresh-and-deep.webm",
            "text": "8"
        },
        {
            "content": "https://ak.picdn.net/shutterstock/videos/1057977454/preview/stock-footage-white-curtain-blowing-by-wind-in-room-outside-is-coconut-tree-swaying-by-wind-fresh-and-deep.webm",
            "text": "9"
        },
        {
            "content": "https://ak.picdn.net/shutterstock/videos/1057977454/preview/stock-footage-white-curtain-blowing-by-wind-in-room-outside-is-coconut-tree-swaying-by-wind-fresh-and-deep.webm",
            "text": "10"
        },
        {
            "content": "https://ak.picdn.net/shutterstock/videos/1057977454/preview/stock-footage-white-curtain-blowing-by-wind-in-room-outside-is-coconut-tree-swaying-by-wind-fresh-and-deep.webm",
            "text": "11"
        },
        {
            "content": "https://ak.picdn.net/shutterstock/videos/1057977454/preview/stock-footage-white-curtain-blowing-by-wind-in-room-outside-is-coconut-tree-swaying-by-wind-fresh-and-deep.webm",
            "text": "12"
        },
        {
            "content": "https://ak.picdn.net/shutterstock/videos/1057977454/preview/stock-footage-white-curtain-blowing-by-wind-in-room-outside-is-coconut-tree-swaying-by-wind-fresh-and-deep.webm",
            "text": "13"
        },
        {
            "content": "https://ak.picdn.net/shutterstock/videos/1057977454/preview/stock-footage-white-curtain-blowing-by-wind-in-room-outside-is-coconut-tree-swaying-by-wind-fresh-and-deep.webm",
            "text": "14"
        },
        {
            "content": "https://ak.picdn.net/shutterstock/videos/1057977454/preview/stock-footage-white-curtain-blowing-by-wind-in-room-outside-is-coconut-tree-swaying-by-wind-fresh-and-deep.webm",
            "text": "15"
        },
        {
            "content": "https://ak.picdn.net/shutterstock/videos/1057977454/preview/stock-footage-white-curtain-blowing-by-wind-in-room-outside-is-coconut-tree-swaying-by-wind-fresh-and-deep.webm",
            "text": "16"
        },
        {
            "content": "https://ak.picdn.net/shutterstock/videos/1057977454/preview/stock-footage-white-curtain-blowing-by-wind-in-room-outside-is-coconut-tree-swaying-by-wind-fresh-and-deep.webm",
            "text": "17"
        },
        {
            "content": "https://ak.picdn.net/shutterstock/videos/1057977454/preview/stock-footage-white-curtain-blowing-by-wind-in-room-outside-is-coconut-tree-swaying-by-wind-fresh-and-deep.webm",
            "text": "18"
        },
        {
            "content": "https://ak.picdn.net/shutterstock/videos/1057977454/preview/stock-footage-white-curtain-blowing-by-wind-in-room-outside-is-coconut-tree-swaying-by-wind-fresh-and-deep.webm",
            "text": "19"
        },
    ];

    useEffect(() => {
        axios.get('http://10.200.24.103:8089/profcom/')
            .then(resp => {
                setPostsData(resp.data);
            })
    }, []);

    let numberOfPages = Math.ceil(postsData.length / 6);
    let NOPArr = [];
    for (let i = 1; i <= numberOfPages; i++) {
        NOPArr.push(i)
    }
    let addingIndex = [];
    if (postsData.length < 6) {
        for (let i = 0; i < 6 - postsData.length; i++) {
            addingIndex.push(i);
        }
    }

    return (
        <div className="page-body">

            {
                isAdmin &&
                <>
                    <h1>hello</h1>
                </>
            }

            <Carousel
                swipe={true}
                autoPlay={false}
                navButtonsAlwaysVisible={true}

            >

                {
                    NOPArr.map((item, index) => <div className='carousel__wrapper' key={index}>
                            {
                                postsData.slice((index * 6), (index * 6 + 6)).map((item, index) =>
                                    <CarouselItem key={index} id={index} image={item.image}/>
                                )
                            }
                            {
                                addingIndex.length !== 0 ?
                                    <>
                                        {
                                            addingIndex.map((item, index) =>
                                                <CarouselItem disabled={true}
                                                              image='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOIAAAB/CAMAAADFNu54AAAAA1BMVEWpqamhHEfZAAAAM0lEQVR4nO3BAQ0AAADCoPdPbQ43oAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIBrA3CdAAE3EswrAAAAAElFTkSuQmCC'/>
                                            )

                                        }
                                    </>
                                    :
                                    <></>
                            }
                        </div>
                    )
                }
            </Carousel>
        </div>
    );
};

const CarouselItem = (props) => {
    const navigate = useNavigate();
    const {isAdmin} = useContext(AdminContext);

    return (
        <div className="carousel__item"
             onClick={() => {
                 if(!props.disabled){
                    navigate(`/profcom/${(props.id)}`)
                 }
             }}
        >
            <img
                src={props.image}
                className="carousel__content"
            />
        </div>
    );
};

function randomIntFromInterval(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}


export default Profcom;