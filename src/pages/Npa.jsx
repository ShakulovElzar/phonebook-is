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
import MyLoader from '../components/UI/MyLoader/MyLoader';

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

const Npa = () => {
	const { isAdmin } = useContext(AdminContext);
	const { hasRole } = useContext(RoleContext);
	const [npaTitle, setNpaTitle] = useState('');
	const [wasSent, setWasSent] = useState(false);
	const [targetedNpa, setTargetedNpa] = useState();
	const [deletedNpa, setDeletedNpa] = useState();
	const [isLoading, setIsLoading] = useState(false);

	const [tableData, setTableData] = useState([]);
	const getData = async () => {
		setIsLoading(true);
		await axios
			.get('http://10.200.24.103:8089/npa/')
			.then((response) => {
				setTableData(response.data);
			})
			.then(() => setIsLoading(false));
	};

	useEffect(() => {
		getData();
	}, []);

	const addNpa = (event) => {
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
		setTimeout(() => {
			setWasSent(false);
		}, 3000);
		setTimeout(() => getData(), 1000);
	};
	const deleteNpa = (event) => {
		event.preventDefault();
		axios.delete(`http://10.200.24.103:8089/npa/delete/${deletedNpa}/`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('atoken')}`,
			},
		});
		setTimeout(() => getData(), 1000);
	};
	const updateNpa = (event) => {
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
	const checkId = (id) => {
		if (id === 1) {
			return 'selected';
		} else {
			return false;
		}
	};

	const [value, setValue] = React.useState();

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	return (
		<div className='page-body'>
			{(isAdmin || hasRole === 'NPA') && (
				<React.Fragment>
					<Box sx={{ width: '100%' }}>
						<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
							<Tabs
								value={value}
								onChange={handleChange}
								aria-label='basic tabs example'
							>
								<Tab label='????????????????' />
								<Tab label='??????????????' />
								<Tab label='????????????????' />
							</Tabs>
						</Box>
						<TabPanel value={value} index={0}>
							<div className='admin-form__wrapper'>
								<h2>???????????????????? ???????????? ??????</h2>
								<form onSubmit={addNpa}>
									<TextField
										fullWidth
										label='???????????????? ??????'
										variant='standard'
										value={npaTitle}
										onChange={(i) =>
											setNpaTitle(i.target.value)
										}
									/>
									<Button
										type='submit'
										variant='contained'
										size='large'
										style={{ marginTop: 15 }}
									>
										????????????????
									</Button>
								</form>
								<br />
								{wasSent && <h1>?????????? ???????? ????????????????????!</h1>}
							</div>
						</TabPanel>
						<TabPanel value={value} index={1}>
							<div className='admin-form__wrapper'>
								<h2>?????????????? ??????</h2>
								<form onSubmit={deleteNpa}>
									<FormControl>
										<InputLabel>?????????????? ??????</InputLabel>
										<Select
											sx={{ width: 350 }}
											onChange={(t) =>
												setDeletedNpa(t.target.value)
											}
											label='?????????????? ??????????????????????'
											variant='standard'
										>
											{tableData.map((item, index) => (
												<MenuItem
													key={index}
													defaultValue={checkId(
														item.id
													)}
													value={item.id}
												>
													{item.title}
												</MenuItem>
											))}
										</Select>
									</FormControl>
									<br />
									<Button
										type='submit'
										variant='contained'
										size='large'
										style={{ marginTop: 15 }}
									>
										??????????????
									</Button>
								</form>
							</div>
						</TabPanel>
						<TabPanel value={value} index={2}>
							<div className='admin-form__wrapper'>
								<h2>???????????????? ??????</h2>
								<form onSubmit={updateNpa}>
									<TextField
										fullWidth
										label='?????????? ???????????????? ??????'
										variant='standard'
										value={npaTitle}
										onChange={(i) =>
											setNpaTitle(i.target.value)
										}
									/>
									<h3>???????????????? ??????</h3>
									<FormControl>
										<InputLabel>?????????????? ??????</InputLabel>
										<Select
											sx={{ width: 350 }}
											onChange={(t) =>
												setTargetedNpa(t.target.value)
											}
											label='?????????????? ??????'
											variant='standard'
										>
											{tableData.map((item, index) => (
												<MenuItem
													key={index}
													defaultValue={checkId(
														item.id
													)}
													value={item.id}
												>
													{item.title}
												</MenuItem>
											))}
										</Select>
									</FormControl>
									<br />
									<Button
										type='submit'
										variant='contained'
										size='large'
										style={{ marginTop: 15 }}
									>
										????????????????
									</Button>
								</form>
							</div>
						</TabPanel>
					</Box>
				</React.Fragment>
			)}
			<h1>??????</h1>
			{isLoading ? (
				<MyLoader />
			) : (
				<MyTable page='npa' tableData={tableData} />
			)}
		</div>
	);
};

export default Npa;
