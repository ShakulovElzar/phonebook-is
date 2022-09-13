import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import {createTheme, styled} from '@mui/system';
import Paper from '@mui/material/Paper';
import TableHead from '@mui/material/TableHead';

const DepartmentPostPage = () => {
	const params = useParams();
	const [error, setError] = useState(null);
	const [depName, setDepName] = useState('');
	const [tablesData, setTablesData] = useState([]);
	const [headers, setHeaders] = useState([
		'Фото',
		'ФИО',
		'Должность',
		'Внут.АТС',
		'Гор.АТС',
		'E-MAIL',
		'КАБИНЕТ',
	]);

	const getPostData = async () => {
		try {
			const response = await axios.get(
				`http://10.200.24.103:8089/department/${params.id}/`
			);
			setDepName(response.data.title);

			const responseDep = await axios
				.get('http://10.200.24.103:8089/department/', {
					headers: {
						Authorization: `Bearer ${localStorage.getItem(
							'atoken'
						)}`,
					},
				})
				.catch((error) => console.log(error));
			const childData = [];
			for (let i = 0; i < responseDep.data.length; i++) {
				if (responseDep.data[i].parent === response.data.title) {
					childData.push(responseDep.data[i]);
				}
			}
			setTablesData(childData);
		} catch (error) {
			setError(error);
		}
	};

	useEffect(() => {
		getPostData();
	}, []);

	// themes for tables
	const theme = createTheme({
		palette: {
			primary: {
				dark: '#bdbdbd',
			},
		},
	});
	const StyledTableCell = styled(TableCell)(() => ({
		[`&.${tableCellClasses.head}`]: {
			backgroundColor: theme.palette.primary.dark,
		},
		[`&.${tableCellClasses.body}`]: {
			fontSize: 14,
		},
	}));

	return (
		<div className='page-body'>
			<h1 style={{ color: 'black' }}>{depName}</h1>
			<p>Печать(пусто)</p>
			<br />
			{error === null &&
				tablesData.map((item, mainIndex) => (
					<React.Fragment key={mainIndex}>
						{item.users.length !== 0 ? (
							<div key={mainIndex}>
								<h3>{item.title}</h3>
								<TableContainer component={Paper}>
									<Table
										sx={{ minWidth: 650 }}
										stickyHeader
										aria-label='sticky table'
									>
										<TableHead>
											<TableRow>
												{headers.map((el, index) => (
													<StyledTableCell
														key={index}
														align='center'
													>
														<strong>{el}</strong>
													</StyledTableCell>
												))}
											</TableRow>
										</TableHead>
										<TableBody>
											{item.users.map((el, index) => (
												<TableRow key={index}>
													<TableCell align='center'>
														<img
															src={el.photo}
															alt='Фото'
															className='user__photo'
														/>
													</TableCell>
													<TableCell>
														{el.fullname}
													</TableCell>
													<TableCell>
														{el.jobtitle}
													</TableCell>
													<TableCell>
														{el.internal_atc}
													</TableCell>
													<TableCell>
														{el.city_atc}
													</TableCell>
													<TableCell>
														{el.email}
													</TableCell>
													<TableCell>
														{el.cabinet}
													</TableCell>
												</TableRow>
											))}
										</TableBody>
									</Table>
								</TableContainer>
							</div>
						) : (
							<></>
						)}
					</React.Fragment>
				))}
		</div>
	);
};

export default DepartmentPostPage;
