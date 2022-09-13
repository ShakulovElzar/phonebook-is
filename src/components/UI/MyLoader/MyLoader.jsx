import React from 'react';
import c from './MyLoader.module.css';

const MyLoader = () => {
	return (
		<div style={{ display: 'flex', justifyContent: 'center' }}>
			<div className={c.loader}></div>
		</div>
	);
};

export default MyLoader;
