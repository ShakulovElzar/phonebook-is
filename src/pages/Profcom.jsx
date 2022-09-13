import React, {useContext, useEffect, useState} from 'react';
import Carousel from 'react-material-ui-carousel';
import {useNavigate} from 'react-router-dom';
import {AdminContext, RoleContext} from '../context';
import axios from 'axios';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TextField from '@mui/material/TextField/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import MyLoader from '../components/UI/MyLoader/MyLoader';
import createTheme from '@mui/material/styles/createTheme';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import ImportComponent from '../components/UI/ImportComponent/ImportComponent';
import useMediaQuery from '@mui/material/useMediaQuery';

function TabPanel(props) {
	const { children, value, index } = props;

	return (
		<div
			role='tabpanel'
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
		>
			{value === index && <Box sx={{ paddingTop: 1 }}>{children}</Box>}
		</div>
	);
}

const Profcom = () => {
	const { isAdmin } = useContext(AdminContext);
	const { hasRole } = useContext(RoleContext);
	const [postsData, setPostsData] = useState([]);
	const [newPostName, setNewPostName] = useState('');
	const [updatedPost, setUpdatedPost] = useState();
	const [photo, setPhoto] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [emailID, setEmailID] = useState();
	const isMobile = useMediaQuery('(max-width: 760px)');

	axios
		.get(
			`http://10.200.24.103:8089/account/?search=${localStorage.getItem(
				'user'
			)}`
		)
		.then((res) => {
			setEmailID(res.data[0].id);
		});

	const getData = () => {
		axios
			.get('http://10.200.24.103:8089/profcom/')
			.then((resp) => {
				setPostsData(resp.data);
			})
			.then(() => setIsLoading(false));
	};
	useEffect(() => {
		getData();
	}, []);

	// count pages
	let numberOfPages = Math.ceil(postsData.length / 6);
	let NOPArr = [];
	for (let i = 1; i <= numberOfPages; i++) {
		NOPArr.push(i);
	}
	let addingIndex = [];
	if (postsData.length % 6 !== 0) {
		for (let i = 0; i < 6 - (postsData.length % 6); i++) {
			addingIndex.push(i);
		}
	}

	const addPost = (event) => {
		event.preventDefault();
		axios.post(
			'http://10.200.24.103:8089/profcom/create/',
			{
				image: photo,
				text: '',
				author: emailID,
			},
			{
				headers: {
					Authorization: `Bearer ${localStorage.getItem('atoken')}`,
				},
			}
		);
		setTimeout(() => {
			setPhoto(null);
			getData();
		}, 1000);
	};
	const deletePost = (id) => {
		setIsLoading(true);
		axios.delete(`http://10.200.24.103:8089/profcom/delete/${id}/`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('atoken')}`,
			},
		});
		setTimeout(() => {
			getData();
		}, 150);
		setIsLoading(false);
	};
	const updatePost = (event) => {
		event.preventDefault();
		axios.patch(
			`http://10.200.24.103:8089/profcom/update/${updatedPost}/`,
			{
				image: photo,
				author: emailID,
			},
			{
				headers: {
					Authorization: `Bearer ${localStorage.getItem('atoken')}`,
				},
			}
		);
		setTimeout(() => {
			getData();
		}, 500);
	};

	const [value, setValue] = React.useState();
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<div className='page-body'>
			{(isAdmin || hasRole === 'PROFCOM') && (
				<>
					<Box sx={{ width: '100%' }}>
						<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
							<Tabs value={value} onChange={handleChange}>
								<Tab label='Добавить' />
								<Tab label='Удалить' />
								<Tab label='Обновить' />
							</Tabs>
						</Box>
						<TabPanel value={value} index={0}>
							<div className='admin-form__wrapper'>
								<h2>Добавьте обложку нового поста</h2>
								<form onSubmit={addPost}>
									<div>
										<h2>Фото</h2>
										<ImportComponent
											photo={photo}
											setPhoto={setPhoto}
										/>
									</div>
									<Button
										type='submit'
										variant='contained'
										size='large'
										style={{ marginTop: 15 }}
									>
										Добавить
									</Button>
								</form>
							</div>
						</TabPanel>
						<TabPanel value={value} index={1}>
							<div className='admin-form__wrapper'>
								<h2>Выберите пост для удаления пост</h2>
							</div>
						</TabPanel>
						<TabPanel value={value} index={2}>
							<div className='admin-form__wrapper'>
								<h2>Изменить пост</h2>
								<form onSubmit={updatePost}>
									<TextField
										fullWidth
										label='Новое название поста'
										variant='standard'
										value={newPostName}
										onChange={(i) =>
											setNewPostName(i.target.value)
										}
									/>
									<h3>Выберите пост</h3>
									<FormControl>
										<InputLabel>Выбрать пост</InputLabel>
										<Select
											sx={{ width: 350 }}
											onChange={(t) =>
												setUpdatedPost(t.target.value)
											}
											variant='standard'
											label='Выбрать пост'
										>
											{postsData.map((item, index) => (
												<MenuItem
													key={index}
													value={item.id}
												>
													...{item.text.slice(0, 10)}
													...
												</MenuItem>
											))}
										</Select>
									</FormControl>
									<div>
										<h2>Фото</h2>
										<ImportComponent
											photo={photo}
											setPhoto={setPhoto}
											getData={getData}
										/>
									</div>
									<Button
										type='submit'
										variant='contained'
										size='large'
										style={{ marginTop: 15 }}
									>
										Изменить
									</Button>
								</form>
							</div>
						</TabPanel>
					</Box>
				</>
			)}
			<br />
			<br />
			{isLoading ? (
				<MyLoader />
			) : (
				<Carousel
					swipe={true}
					autoPlay={false}
					navButtonsAlwaysVisible={true}
				>
					{NOPArr.map((item, index) => (
						<Grid
							container
							spacing={2}
							key={index}
							style={{
								paddingRight: 12.5,
								margin: '0 auto',
								height: '100%',
							}}
						>
							{postsData
								.slice(index * 6, index * 6 + 6)
								.map((item, index) => (
									<Grid item xs={isMobile ? 12 : 6}>
										<CarouselItem
											key={index}
											id={item.id}
											image={item.image}
											value={value}
											deletePost={deletePost}
										/>
									</Grid>
								))}
							{addingIndex.length !== 0 &&
							index === NOPArr.length - 1 ? (
								<>
									{addingIndex.map((item, index) => (
										<Grid item xs={isMobile ? 12 : 6}>
											<CarouselItem
												key={index}
												disabled={true}
												image='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOIAAAB/CAMAAADFNu54AAAAA1BMVEWpqamhHEfZAAAAM0lEQVR4nO3BAQ0AAADCoPdPbQ43oAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIBrA3CdAAE3EswrAAAAAElFTkSuQmCC'
											/>
										</Grid>
									))}
								</>
							) : (
								<React.Fragment key={index}></React.Fragment>
							)}
						</Grid>
					))}
				</Carousel>
			)}
		</div>
	);
};

const CarouselItem = ({ disabled, id, image, value, deletePost }) => {
	const isMobile = useMediaQuery('(max-width: 760px)');
	const navigate = useNavigate();
	const customTheme = createTheme({
		components: {
			MuiButton: {
				styleOverrides: {
					outlined: {
						color: 'red',
						borderColor: 'red',
						backgroundColor: 'white',
						'&:hover': {
							color: 'red',
							borderColor: 'red',
							backgroundColor: 'lightgray',
						},
					},
				},
			},
		},
	});

	return (
		<Paper
			sx={{
				height: isMobile ? '60vh' : '35vh',
				overflow: 'hidden',
				borderRadius: 5,
				display: 'flex',
				alignContent: 'center',
				position: 'relative',
			}}
		>
			<img
				src={image}
				alt="content"
				className='carousel__content'
				onClick={() => {
					if (!disabled) {
						navigate(`/profcom/${id}`);
					}
				}}
			/>
			{value === 1 && (
				<div
					className='delete__button'
					onClick={() => {
						deletePost(id);
					}}
				>
					<Button variant='outlined' theme={customTheme}>
						Удалить
					</Button>
				</div>
			)}
		</Paper>
	);
};

export default Profcom;
