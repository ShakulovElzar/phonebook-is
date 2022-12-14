import React, {useContext, useEffect, useState} from 'react';
import MyTable from '../components/UI/MyTablet/MyTable';
import c from './pages.module.css';
import axios from 'axios';
import {AdminContext, RoleContext} from '../context';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
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
const Home = () => {
	const { hasRole } = useContext(RoleContext);
	const { isAdmin } = useContext(AdminContext);
	const [parentDepartment, setParentDepartment] = useState();
	const [targetDepartment, setTargetDepartment] = useState();
	const [parentRefDepartment, setParentRefDepartment] = useState();
	const [deletedDepartment, setDeletedDepartment] = useState();
	const [departmentTitle, setDepartmentTitle] = useState('');
	const [wasSent, setWasSent] = useState(false);
	const [error, setError] = useState();
	const [isLoading, setIsLoading] = useState(false);

	// table data fetching
	const [tableData, setTableData] = useState([]);
	const [allDepartments, setAllDepartments] = useState([]);
	const getData = async () => {
		try {
			setIsLoading(true);
			const response = await axios
				.get('http://10.200.24.103:8089/department/', {
					headers: {
						Authorization: `Bearer ${localStorage.getItem(
							'atoken'
						)}`,
					},
				})
				.catch((error) => console.log(error));
			setAllDepartments(response.data);
			const parentData = [];
			for (let i = 0; i < response.data.length; i++) {
				if (response.data[i].parent === null) {
					parentData.push(response.data[i]);
				}
			}
			setTableData(parentData);
		} catch (error) {
			setError(error);
		}
		setIsLoading(false);
	};
	useEffect(() => {
		getData();
	}, []);

	const addDepartment = (event) => {
		event.preventDefault();
		let localParent = parentDepartment;
		if (localParent === '?????? ????????????????') {
			localParent = null;
		}
		axios.post(
			'http://10.200.24.103:8089/department/create/',
			{
				title: departmentTitle,
				parent: localParent,
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
		}, 5000);
		setTimeout(() => getData(), 1000);
	};
	const deleteDepartment = (event) => {
		event.preventDefault();
		axios.delete(
			`http://10.200.24.103:8089/department/delete/${deletedDepartment}/`,
			{
				headers: {
					Authorization: `Bearer ${localStorage.getItem('atoken')}`,
				},
			}
		);
		setTimeout(() => getData(), 1000);
	};
	const updateDepartment = (event) => {
		event.preventDefault();
		let localParent = parentRefDepartment;
		if (localParent === '?????? ????????????????') {
			localParent = null;
		}
		axios.patch(
			`http://10.200.24.103:8089/department/update/${targetDepartment}/`,
			{
				title: departmentTitle,
				id: targetDepartment,
				parentDepartment: localParent,
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
			{(isAdmin || hasRole === 'CADR') && (
				<>
					<Box sx={{ width: '100%' }}>
						<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
							<Tabs value={value} onChange={handleChange}>
								<Tab label='????????????????' />
								<Tab label='??????????????' />
								<Tab label='????????????????' />
							</Tabs>
						</Box>
						<TabPanel value={value} index={0}>
							<div className='admin-form__wrapper'>
								<h2>???????????????????? ???????????? ????????????????????????</h2>
								<form onSubmit={addDepartment}>
									<TextField
										fullWidth
										label='???????????????? ????????????????????????'
										variant='standard'
										value={departmentTitle}
										onChange={(i) =>
											setDepartmentTitle(i.target.value)
										}
									/>
									<h3>???????????????????????? ??????????????????????</h3>
									<FormControl>
										<InputLabel>
											???????????????????????? ??????????????????????
										</InputLabel>
										<Select
											variant='standard'
											sx={{
												width: {
													lg: 350,
													md: 200,
													sm: 100,
												},
											}}
											md={{ width: 350 }}
											onChange={(t) =>
												setParentDepartment(
													t.target.value
												)
											}
											label='???????????????????????? ??????????????????????'
										>
											<MenuItem value={null}>
												?????? ????????????????
											</MenuItem>
											{tableData.map((item, index) => (
												<MenuItem
													key={index}
													value={item.id}
												>
													{item.title}
												</MenuItem>
											))}
										</Select>
									</FormControl>

									<Button
										type='submit'
										variant='contained'
										size='large'
										style={{ marginLeft: 15, marginTop: 5 }}
									>
										????????????????
									</Button>
								</form>
								{wasSent && <h1>?????????? ???????? ????????????????????!</h1>}
							</div>
						</TabPanel>
						<TabPanel value={value} index={1}>
							<div className='admin-form__wrapper'>
								<h2>?????????????? ??????????????????????</h2>
								<form onSubmit={deleteDepartment}>
									<FormControl>
										<InputLabel id='demo-simple-select-label'>
											?????????????? ??????????????????????
										</InputLabel>
										<Select
											variant='standard'
											sx={{ width: 350 }}
											onChange={(t) =>
												setDeletedDepartment(
													t.target.value
												)
											}
											label='?????????????? ??????????????????????'
										>
											{allDepartments.map(
												(item, index) => (
													<MenuItem
														key={index}
														value={item.id}
													>
														{item.title}
													</MenuItem>
												)
											)}
										</Select>
									</FormControl>
									<Button
										type='submit'
										variant='contained'
										size='large'
										style={{ marginLeft: 15, marginTop: 5 }}
									>
										??????????????
									</Button>
								</form>
							</div>
						</TabPanel>
						<TabPanel value={value} index={2}>
							<div className='admin-form__wrapper'>
								<h2>???????????????? ??????????????????????</h2>
								<form onSubmit={updateDepartment}>
									<TextField
										fullWidth
										label='?????????? ???????????????? ????????????????????????'
										variant='standard'
										value={departmentTitle}
										onChange={(i) =>
											setDepartmentTitle(i.target.value)
										}
									/>
									<h3>???????????????? ??????????????????????</h3>
									<FormControl>
										<InputLabel>
											?????????????? ??????????????????????
										</InputLabel>
										<Select
											variant='standard'
											sx={{ width: 350 }}
											onChange={(t) =>
												setTargetDepartment(
													t.target.value
												)
											}
											label='?????????????? ??????????????????????'
										>
											{allDepartments.map(
												(item, index) => (
													<MenuItem
														key={index}
														defaultValue={checkId(
															item.id
														)}
														value={item.id}
													>
														{item.title}
													</MenuItem>
												)
											)}
										</Select>
									</FormControl>
									<h3>?????????? ???????????????????????? ??????????????????????</h3>
									<FormControl>
										<InputLabel>
											?????????? ???????????????????????? ??????????????????????
										</InputLabel>
										<Select
											variant='standard'
											sx={{ width: 350 }}
											onChange={(t) =>
												setParentRefDepartment(
													t.target.value
												)
											}
											label='?????????????? ???????????????????????? ??????????????????????'
										>
											<MenuItem value={null}>
												?????? ????????????????
											</MenuItem>
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
									<Button
										type='submit'
										variant='contained'
										size='large'
										style={{ marginLeft: 15, marginTop: 5 }}
									>
										????????????????
									</Button>
								</form>
							</div>
						</TabPanel>
					</Box>
				</>
			)}

			<p className={c.homeText}>??????????????????</p>

			{!error && (
				<>
					{isLoading ? (
						<MyLoader />
					) : (
						<MyTable page='department' tableData={tableData} />
					)}
				</>
			)}
		</div>
	);
};

export default Home;
