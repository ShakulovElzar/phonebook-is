import React, {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import MyTable from '../components/UI/MyTablet/MyTable';
import {AdminContext, RoleContext} from '../context';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TextField from '@mui/material/TextField/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';

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

const Npa = () => {
	const { isAdmin } = useContext(AdminContext);
	const { hasRole } = useContext(RoleContext);
	const [ npaTitle, setNpaTitle ] = useState('');
	const [ wasSent, setWasSent ] = useState(false);
	const [ targetedNpa, setTargetedNpa ] = useState();
	const [ deletedNpa, setDeletedNpa ] = useState();

	const [ tableData, setTableData ] = useState([]);
	const getData = async () => {
		const response = await axios.get('http://10.200.24.103:8089/npa/');
		setTableData(response.data);
	};

	useEffect(
		() => {
			getData();
		},
		[]
	);

	const addNpa = event => {
		event.preventDefault();
		axios.post(
			'http://10.200.24.103:8089/npa/create/',
			{
				title: npaTitle,
			},
			{
				headers: {
					Authorization: `Bearer ${localStorage.getItem('atoken')}`,
				},
			}
		);
		setWasSent(true);
		setTimeout(
			() => {
				setWasSent(false);
			},
			3000
		);
		setTimeout(() => getData(), 1000);
	};
	const deleteNpa = event => {
		event.preventDefault();
		axios.delete(`http://10.200.24.103:8089/npa/delete/${deletedNpa}/`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('atoken')}`,
			},
		});
		setTimeout(() => getData(), 1000);
	};
	const updateNpa = event => {
		event.preventDefault();
		axios.patch(
			`http://10.200.24.103:8089/npa/update/${targetedNpa}/`,
			{
				title: npaTitle,
				id: targetedNpa,
			},
			{
				headers: {
					Authorization: `Bearer ${localStorage.getItem('atoken')}`,
				},
			}
		);
		setTimeout(() => getData(), 1000);
	};
	const checkId = id => {
		if (id === 1) {
			return 'selected';
		} else {
			return false;
		}
	};

	const [ value, setValue ] = React.useState();

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	return (
		<div className="page-body">
			{(isAdmin || hasRole === 'NPA') &&
				<React.Fragment>
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
								<h2>Заполнение нового НПА</h2>
								<form onSubmit={addNpa}>
									<TextField
										fullWidth
										label="Название НПА"
										variant="outlined"
										value={npaTitle}
										onChange={i => setNpaTitle(i.target.value)}
									/>
									<Button type="submit" variant="contained" size="large" style={{ marginTop: 5 }}>Добавить</Button>
								</form>
								<br />
								{wasSent && <h1>Форма была отправлена!</h1>}
							</div>
						</TabPanel>
						<TabPanel value={value} index={1}>
							<div className="admin-form__wrapper">
								<h2>Удалить НПА</h2>
								<form onSubmit={deleteNpa}>
									<FormControl>
										<InputLabel>Удалить НПА</InputLabel>
										<Select
											sx={{ width: 350 }}
											onChange={t => setDeletedNpa(t.target.value)}
											label="Выбрать департамент"
										>
											{tableData.map((item, index) => (
												<MenuItem key={index} defaultValue={checkId(item.id)} value={item.id}>{item.title}</MenuItem>
											))}
										</Select>
									</FormControl>
									<br />
									<Button type="submit" variant="contained" size="large" style={{ marginTop: 5 }}>Удалить</Button>
								</form>
							</div>
						</TabPanel>
						<TabPanel value={value} index={2}>
							<div className="admin-form__wrapper">
								<h2>Изменить НПА</h2>
								<form onSubmit={updateNpa}>
									<TextField
										fullWidth
										label="Новое название НПА"
										variant="outlined"
										value={npaTitle}
										onChange={i => setNpaTitle(i.target.value)}
									/>
									<h3>Выберите НПА</h3>
									<FormControl>
										<InputLabel>Выбрать НПА</InputLabel>
										<Select sx={{ width: 350 }} onChange={t => setTargetedNpa(t.target.value)} label="Выбрать НПА">
											{tableData.map((item, index) => (
												<MenuItem key={index} defaultValue={checkId(item.id)} value={item.id}>{item.title}</MenuItem>
											))}
										</Select>
									</FormControl>
									<br />
									<Button type="submit" variant="contained" size="large" style={{ marginTop: 5 }}>Изменить</Button>
								</form>
							</div>
						</TabPanel>
					</Box>
				</React.Fragment>}
			<h1>НПА</h1>
			<MyTable page="npa" tableData={tableData} />
		</div>
	);
};

export default Npa;
