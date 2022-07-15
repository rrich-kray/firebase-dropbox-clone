import React, { useRef, useState } from 'react';
import Nav from '../Nav/Nav';
import Modal from '../Modal/Modal';
import Folder from '../Folder/Folder';
import { useFolder } from '../../../hooks/useFolder';
import { useAuth } from '../../../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderPlus } from '@fortawesome/free-solid-svg-icons';
import { faFileCirclePlus } from '@fortawesome/free-solid-svg-icons';
import './Dashboard.css';

const Dashboard = () => {
	const { currentUser } = useAuth();
	const [isModalVisible, setModalVisibility] = useState({
		bool: false,
		type: '',
	});
	const [folderName, setFolderName] = useState('');
	const [file, setFile] = useState();
	const [name, setName] = useState('');
	const { folder, childFolders } = useFolder('blAscmMTRL4X0WyF1mN3');

	const toggleModalVisibility = (type) => {
		if (isModalVisible.bool === false) {
			setModalVisibility({ bool: true, type: type });
			return;
		}
		setModalVisibility({ bool: false, type: '' });
	};

	return (
		<div className="dash">
			<Nav />
			<div className="dash-content flex-row justify-center align-center">
				<button
					className="add-folder dash-btn"
					onClick={() => toggleModalVisibility('folder')}
				>
					<FontAwesomeIcon icon={faFolderPlus} style={{ height: '70%' }} />
				</button>
				<button
					className="add-file dash-btn"
					onClick={() => toggleModalVisibility('file')}
				>
					<FontAwesomeIcon icon={faFileCirclePlus} style={{ height: '70%' }} />
				</button>
				{childFolders &&
					childFolders.map((folder) => (
						<div key={folder.id}>
							<Folder folder={folder} />
						</div>
					))}
			</div>
			{isModalVisible.bool && (
				<Modal
					name={name}
					setName={setName}
					type={isModalVisible.type}
					isModalVisible={isModalVisible}
					setModalVisibility={setModalVisibility}
					file={file}
					setFile={setFile}
					currentFolder={folder}
				/>
			)}
		</div>
	);
};

export default Dashboard;
