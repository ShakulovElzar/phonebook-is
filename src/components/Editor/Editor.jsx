import React, {useEffect, useState} from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './TextEditor.css';
import axios from 'axios';
import Button from '@mui/material/Button';
import EditorToolbar, {formats, modules} from './EditorToolbar';

function Editor({ getData, page, id, setToggleEditorClass, textId }) {
	const [userText, setUserText] = useState('');
	const [hasText, setHasText] = useState(false);
	const [emailID, setEmailID] = useState();

	const onDescription = (e) => {
		setUserText(e);
	};
	useEffect(() => {
		axios.get(`http://10.200.24.103:8089/${page}/${id}/`).then((resp) => {
			if (page === 'npa') {
				if (resp.data.categores.length !== 0) {
					setUserText(resp.data.categores[0].text);
					setHasText(true);
				}
			}
			if (page === 'profcom') {
				setUserText(resp.data.text);
				setHasText(true);
			}
		});
	}, []);

	const [isError, setError] = useState(null);
	const addDetails = async (event) => {
		try {
			event.preventDefault();
			event.persist();
			if (page === 'npa') {
				if (!hasText) {
					axios
						.post(
							`http://10.200.24.103:8089/${page}info/news/create/`,
							{
								text: userText,
								category: id,
							},
							{
								headers: {
									Authorization: `Bearer ${localStorage.getItem(
										'atoken'
									)}`,
								},
							}
						)
						.then((res) => {
							if (res.data.success === 200) {
								setTimeout(() => getData(), 1000);
							}
						});
				}
				if (hasText) {
					axios
						.patch(
							`http://10.200.24.103:8089/${page}info/news/update/${textId}/`,
							{
								text: userText,
								category: id,
							},
							{
								headers: {
									Authorization: `Bearer ${localStorage.getItem(
										'atoken'
									)}`,
								},
							}
						)
						.then((res) => {
							if (res.data.success === true) {
								setTimeout(() => getData(), 1000);
							}
						});
				}
			}
			if (page === 'profcom') {
				axios
					.get(
						`http://10.200.24.103:8089/account/?search=${localStorage.getItem(
							'user'
						)}`
					)
					.then((res) => {
						setEmailID(res.data[0].id);
					});
				axios.patch(
					`http://10.200.24.103:8089/${page}/update/${id}/`,
					{
						text: userText,
						author: emailID,
					},
					{
						headers: {
							Authorization: `Bearer ${localStorage.getItem(
								'atoken'
							)}`,
						},
					}
				);
			}
			setToggleEditorClass(false);
			setTimeout(() => {
				window.location.reload();
			}, 1000);
		} catch (error) {
			throw error;
		}
	};

	return (
		<>
			<div className='editor-app'>
				<div>
					<div className='row'>
						<form onSubmit={addDetails} className='update__forms'>
							<div className='form-row'>
								<br />
								<div
									className='form-group editor'
									style={{ maxWidth: 1050 }}
								>
									<h3 className='font-weight-bold'>
										Текст:{' '}
									</h3>
									<EditorToolbar toolbarId={'t1'} />
									<ReactQuill
										theme='snow'
										value={userText}
										onChange={(e) => onDescription(e)}
										placeholder={'Введите текст акта...'}
										modules={modules('t1')}
										formats={formats}
									/>
								</div>
								<br />
								{isError !== null && (
									<div className='errors'> {isError} </div>
								)}
								<Button
									type='submit'
									variant='contained'
									style={{ margin: '5px 0' }}
								>
									{' '}
									Изменить{' '}
								</Button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);
}

export default Editor;
