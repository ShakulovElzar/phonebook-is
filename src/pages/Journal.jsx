import React, {useContext, useEffect, useState} from 'react';
import MTable from '../components/UI/MaterialTable/MTable';
import axios from 'axios';
import {AdminContext, RoleContext} from '../context';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TextField from '@mui/material/TextField/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {DesktopDatePicker} from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs from 'dayjs';

function TabPanel(props) {
	const { children, value, index } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
		>
			{value === index &&
				<Box sx={{ paddingTop: 1 }}>
					{children}
				</Box>}
		</div>
	);
}

const Journal = () => {
	const { isAdmin } = useContext(AdminContext);
	const { hasRole } = useContext(RoleContext);
	const [ users, setUsers ] = useState([]);
	const [ reasonText, setReasonText ] = useState('');
	const [ newReasonText, setNewReasonText ] = useState('');
	const [ jobtitles, setJobtitles ] = useState([]);
	const [ fullnameId, setFullnameId ] = useState('');
	const [ updateFullnameId, setUpdateFullnameId ] = useState();
	const [ newWhomAskedId, setNewWhomAskedId ] = useState();
	const [ whomAskedId, setWhomAskedId ] = useState();

	const [ jobtitle, setJobtitle ] = useState();
	const [ deleteRef, setDeleteRef ] = useState(1);
	const [ postID, setPostID ] = useState();
	const [ stuff, setStuff ] = useState([]);
	let today = dayjs();
	const [ dateValue, setDateValue ] = useState(today);

	const [ headers ] = useState([ 'ФИО', 'Должность', 'Отпросился у', 'По причине', 'Дата' ]);
	const getData = async () => {
		axios
			.get('http://10.200.24.103:8089/journal/', {
				headers: { Authorization: `Bearer ${localStorage.getItem('atoken')}` },
			})
			.then(t => setStuff(t.data));
		axios
			.get('http://10.200.24.103:8089/account/', {
				headers: { Authorization: `Bearer ${localStorage.getItem('atoken')}` },
			})
			.then(t => {
				setUsers(t.data);
			});
		axios
			.get('http://10.200.24.103:8089/jobtitle/', {
				headers: { Authorization: `Bearer ${localStorage.getItem('atoken')}` },
			})
			.then(t => setJobtitles(t.data));
	};
	const getJobtitle = id => {
		let userID = id;
		for (let i = 0; i < users.length; i++) {
			if (users[i].id === userID) {
				for (let j = 0; j < jobtitles.length; j++) {
					if (jobtitles[j].jobtitle === users[i].jobtitle) {
						setJobtitle(jobtitles[j].id);
					}
				}
			}
		}
	};
	const getIdWithFullname = name => {
		let userText = name;
		for (let i = 0; i < users.length; i++) {
			if (users[i].fullname === userText) {
				setUpdateFullnameId(users[i].id);
			}
		}
	};
	const getIdWithWhomAsked = name => {
		let userText = name;
		for (let i = 0; i < users.length; i++) {
			if (users[i].fullname === userText) {
				setNewWhomAskedId(users[i].id);
			}
		}
	};
	useEffect(
		() => {
			getData();
		},
		[]
	);
	const addUser = event => {
		event.preventDefault();
		axios.post(
			'http://10.200.24.103:8089/journal/create/',
			{
				reason: reasonText,
				fullname: fullnameId,
				jobtitle,
				whom_asked: whomAskedId,
				date: dateValue,
			},
			{ headers: { Authorization: `Bearer ${localStorage.getItem('atoken')}` } }
		);
		setReasonText('');
		setFullnameId(0);
		setWhomAskedId(0);
		setTimeout(
			() => {
				getData();
			},
			2000
		);
	};
	const deleteUser = event => {
		event.preventDefault();
		axios.delete(`http://10.200.24.103:8089/journal/${deleteRef}/delete`, {
			headers: { Authorization: `Bearer ${localStorage.getItem('atoken')}` },
		});
		setTimeout(
			() => {
				getData();
			},
			1000
		);
	};
	const updateUser = event => {
		event.preventDefault();
		axios.patch(
			`http://10.200.24.103:8089/journal/${postID}/update/`,
			{
				reason: newReasonText,
				fullname: updateFullnameId,
				jobtitle: jobtitle,
				whom_asked: newWhomAskedId,
				date: dateValue,
			},
			{ headers: { Authorization: `Bearer ${localStorage.getItem('atoken')}` } }
		);
		setTimeout(
			() => {
				getData();
			},
			2000
		);
	};
	const handlePostIdChange = id => {
		setPostID(id);
		axios
			.get(`http://10.200.24.103:8089/journal/${id}/`, {
				headers: { Authorization: `Bearer ${localStorage.getItem('atoken')}` },
			})
			.then(resp => {
				getIdWithFullname(resp.data.fullname);
				getJobtitle(resp.data.jobtitle);
				getIdWithWhomAsked(resp.data.whom_asked);
				setDateValue(resp.data.date);
				setNewReasonText(resp.data.reason);
			});
	};

	const [ value, setValue ] = React.useState();
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<div className="page-body">

			{isAdmin || hasRole === 'MANAGER'
				? <React.Fragment>
						<Box sx={{ width: '100%' }}>
							<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
								<Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
									<Tab label="Добавить" />
									<Tab label="Удалить" />
									<Tab label="Обновить" />
								</Tabs>
							</Box>
							<TabPanel value={value} index={0}>
								<div className="admin-form__wrapper">
									<h2>Добавить</h2>
									<form onSubmit={addUser}>
										<TextField
											fullWidth
											required
											label="Причина"
											variant="outlined"
											value={reasonText}
											onChange={i => setReasonText(i.target.value)}
										/>
										<div style={{ display: 'flex', flexDirection: 'row', gridGap: 175 }}>
											<div>
												<h3>Выберите человека</h3>
												<FormControl>
													<InputLabel>Выбрать человека</InputLabel>
													<Select
														sx={{ width: 350 }}
														onChange={t => {
															setFullnameId(t.target.value);
															getJobtitle(t.target.value);
														}}
														label="Выбрать человека"
													>
														{users.map((item, index) => (
															<MenuItem key={index} value={item.id}>{item.fullname}</MenuItem>
														))}
													</Select>
												</FormControl>
											</div>
										</div>
										<div style={{ display: 'flex', flexDirection: 'row', gridGap: 100 }}>
											<div>
												<h3>Выберите человека, у которого он отпросился</h3>
												<FormControl>
													<InputLabel>Выбрать человека</InputLabel>
													<Select
														sx={{ width: 350 }}
														onChange={t => setWhomAskedId(t.target.value)}
														label="Выбрать человека"
													>
														{users.map((item, index) => (
															<MenuItem key={index} value={item.id}>{item.fullname}</MenuItem>
														))}
													</Select>
												</FormControl>
											</div>
											<div>
												<h3>Выберите дату</h3>
												<LocalizationProvider dateAdapter={AdapterDateFns}>
													<DesktopDatePicker
														label="Выбрать дату"
														inputFormat="dd/MM/yyyy"
														value={dateValue}
														onChange={t => {
															setDateValue(t);
														}}
														minDate={today}
														maxDate={today.add(2, 'day')}
														renderInput={params => <TextField {...params} />}
													/>
												</LocalizationProvider>
											</div>
										</div>
										<Button type="submit" variant="contained" size="large" style={{ marginTop: 15 }}>Добавить</Button>
									</form>
								</div>
							</TabPanel>
							<TabPanel value={value} index={1}>
								<div className="admin-form__wrapper">
									<h2>Удалить</h2>
									<form onSubmit={deleteUser}>
										<h3>Выберите пост</h3>
										<FormControl>
											<InputLabel>Выбрать пост</InputLabel>
											<Select sx={{ width: 350 }} onChange={t => setDeleteRef(t.target.value)} label="Выбрать пост">
												{stuff.map((item, index) => (
													<MenuItem key={index} value={item.id}>{item.fullname}: {item.reason}</MenuItem>
												))}
											</Select>
										</FormControl>
										<Button type="submit" variant="contained" size="large" style={{ marginLeft: 15, marginTop: 5 }}>
											Удалить
										</Button>
									</form>
								</div>
							</TabPanel>
							<TabPanel value={value} index={2}>
								<div className="admin-form__wrapper">
									<form onSubmit={updateUser}>
										<div>
											<h3>Выберите пост</h3>
											<FormControl>
												<InputLabel>Выбрать пост</InputLabel>
												<Select
													sx={{ width: 350 }}
													onChange={t => handlePostIdChange(t.target.value)}
													label="Выбрать пост"
												>
													{stuff.map((item, index) => (
														<MenuItem key={index} value={item.id}>{item.fullname}: {item.reason}</MenuItem>
													))}
												</Select>
											</FormControl>
										</div>
										<h2>Изменить пост</h2>
										<TextField
											sx={{ width: 350 }}
											label="Новая причина"
											variant="outlined"
											value={newReasonText}
											onChange={i => setNewReasonText(i.target.value)}
										/>
										<div style={{ display: 'flex', flexDirection: 'row', gridGap: '20%' }}>
											<div>
												<h3>Выберите человека</h3>
												<FormControl>
													<InputLabel>Выбрать человека</InputLabel>
													<Select
														sx={{ width: 350 }}
														value={updateFullnameId}
														onChange={t => {
															setUpdateFullnameId(t.target.value);
															getJobtitle(t.target.value);
														}}
														label="Выбрать человека"
													>
														{users.map((item, index) => (
															<MenuItem key={index} value={item.id}>{item.fullname}</MenuItem>
														))}
													</Select>
												</FormControl>
											</div>
										</div>
										<div style={{ display: 'flex', flexDirection: 'row', gridGap: '13%' }}>
											<div>
												<h3>Выберите человека, у которого он отпросился</h3>
												<FormControl>
													<InputLabel>Выбрать человека</InputLabel>
													<Select
														value={newWhomAskedId}
														sx={{ width: 350 }}
														onChange={t => setNewWhomAskedId(t.target.value)}
														label="Выбрать человека"
													>
														{users.map((item, index) => <MenuItem key={index} value={item.id}>{item.email}</MenuItem>)}
													</Select>
												</FormControl>
											</div>
											<div>
												<h3>Выберите дату</h3>
												<LocalizationProvider dateAdapter={AdapterDateFns}>
													<DesktopDatePicker
														label="Выбрать дату"
														inputFormat="dd/MM/yyyy"
														value={dateValue}
														onChange={t => {
															setDateValue(t);
														}}
														minDate={today}
														maxDate={today.add(2, 'day')}
														renderInput={params => <TextField {...params} />}
													/>
												</LocalizationProvider>
											</div>
										</div>
										<Button type="submit" variant="contained" size="large" style={{ marginTop: 15 }}>Изменить</Button>
									</form>
								</div>
							</TabPanel>
						</Box>
					</React.Fragment>
				: <div className="admin-form__wrapper">
						<h2>Добавить</h2>
						<form onSubmit={addUser}>
							<TextField
								fullWidth
								required
								label="Причина"
								variant="outlined"
								value={reasonText}
								onChange={i => setReasonText(i.target.value)}
							/>
							<div style={{ display: 'flex', flexDirection: 'row', gridGap: 175 }}>
								<div>
									<h3>Выберите человека</h3>
									<FormControl>
										<InputLabel>Выбрать человека</InputLabel>
										<Select
											sx={{ width: 350 }}
											onChange={t => {
												setFullnameId(t.target.value);
												getJobtitle(t.target.value);
											}}
											label="Выбрать человека"
										>
											{users.map((item, index) => <MenuItem key={index} value={item.id}>{item.fullname}</MenuItem>)}
										</Select>
									</FormControl>
								</div>
							</div>
							<div style={{ display: 'flex', flexDirection: 'row', gridGap: 100 }}>
								<div>
									<h3>Выберите человека, у которого он отпросился</h3>
									<FormControl>
										<InputLabel>Выбрать человека</InputLabel>
										<Select sx={{ width: 350 }} onChange={t => setWhomAskedId(t.target.value)} label="Выбрать человека">
											{users.map((item, index) => <MenuItem key={index} value={item.id}>{item.fullname}</MenuItem>)}
										</Select>
									</FormControl>
								</div>
								<div>
									<h3>Выберите дату</h3>
									<LocalizationProvider dateAdapter={AdapterDateFns}>
										<DesktopDatePicker
											label="Выбрать дату"
											inputFormat="dd/MM/yyyy"
											value={dateValue}
											onChange={t => {
												setDateValue(t);
											}}
											minDate={today}
											maxDate={today.add(2, 'day')}
											renderInput={params => <TextField {...params} />}
										/>
									</LocalizationProvider>
								</div>
							</div>
							<Button type="submit" variant="contained" size="large" style={{ marginTop: 15 }}>Добавить</Button>
						</form>
					</div>}

			<h2 style={{ color: '#000' }}>Журнал: </h2>
			<MTable journal={true} image={false} headers={headers} bodies={stuff} />
		</div>
	);
};

export default Journal;
