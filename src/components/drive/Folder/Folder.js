import React from 'react';
import './Folder.css';

// We pass it the folder that we are going to render
const Folder = ({ folder }) => {
	return <div>{folder.name}</div>;
};

export default Folder;
