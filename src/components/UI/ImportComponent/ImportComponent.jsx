import React from 'react';
import Resizer from 'react-image-file-resizer';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Button from '@mui/material/Button';

const ImportComponent = ({ setPhoto, photo, resize }) => {
	async function resizeFile(event) {
		let fileInput = false;
		if (event.target.files[0]) {
			fileInput = true;
		}
		if (fileInput) {
			try {
				Resizer.imageFileResizer(
					event.target.files[0],
					500,
					500,
					'JPEG',
					75,
					0,
					uri => {
						setPhoto(uri);
					},
					'base64'
				);
			} catch (err) {
				console.log(err);
			}
		}
	}

	return (
		<div>
			<input
				required
				id="raised-button-file"
				onChange={resizeFile}
				type="file"
				style={{ display: 'none' }}
				accept=".jpg, .jpeg, .png"
			/>
			<label htmlFor="raised-button-file">
				<Button variant={photo !== null ? 'contained' : 'outlined'} component="span">
					<CloudUploadIcon
						Filled
						fontSize="large"
						variant={photo !== null ? 'primary' : 'inherit'}
						sx={{ width: 100 }}
					/>
				</Button>
				{photo !== null ? <span style={{ marginLeft: 15 }}>Фото добавлено!</span> : <span />}
			</label>
		</div>
	);
};

export default ImportComponent;
