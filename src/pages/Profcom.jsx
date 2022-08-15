import React from 'react';
import Carousel from 'react-material-ui-carousel'
import { Paper } from '@mui/material'
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  width: 515,
  height: 320,
}));

const darkTheme = createTheme({ palette: { mode: 'dark' } });
// const lightTheme = createTheme({ palette: { mode: 'light' } });


const Profcom = () => {
    const items = [
        {"videoURL": "", "text": "1"},
        {"videoURL": "", "text": "2"},
        {"videoURL": "", "text": "3"},
        {"videoURL": "", "text": "4"},
        {"videoURL": "", "text": "5"},
        {"videoURL": "", "text": "6"},
        {"videoURL": "", "text": "7"},
        {"videoURL": "", "text": "8"},
        {"videoURL": "", "text": "9"},
        {"videoURL": "", "text": "10"},
        {"videoURL": "", "text": "11"},
        {"videoURL": "", "text": "12"},
        {"videoURL": "", "text": "13"},
        {"videoURL": "", "text": "14"},
        {"videoURL": "", "text": "15"},
        {"videoURL": "", "text": "16"},
        {"videoURL": "", "text": "17"},
        {"videoURL": "", "text": "18"},
        {"videoURL": "", "text": "19"},
    ]

    let numberOfPages = Math.ceil(items.length / 6)
    let NOPArr = []
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
                        items.slice((index * 6), (index * 6 + 6)).map((item, index) => <CarouselItem text={item.text} key={index} imgURL={item.imgURL}/>)
                    }
                    </div>
                )
            }
        </Carousel>
    );
};

const CarouselItem = (props) => {
    return (
        <ThemeProvider theme={darkTheme}>
            <Item >
                <h2 className='carousel__text'>{props.text}</h2>
            </Item>
        </ThemeProvider>
        
    );
};

export default Profcom;