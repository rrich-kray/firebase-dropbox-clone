import React from 'react';
import { database } from '../../../firebase';
import { useAuth } from '../../../context/AuthContext';
import './Modal.css';

const Modal = ({
	isModalVisible,
	setModalVisibility,
	type,
	name,
	setName,
	file,
	setFile,
	currentFolder,
}) => {
	const { currentUser } = useAuth();
	console.log(currentUser);

	const closeModal = () => {
		setModalVisibility(false);
		setName('');
	};

	const handleSubmit = () => {
		// create folder in firestore
		if (type === 'folder') {
			database.folders.add({
				name: name,
				parentId: currentFolder.id,
				userId: currentUser.uid,
				// path,
				createdAt: database.getCurrenttimeStamp(),
			});
		}

		if (type === 'file') {
			database.files.add({
				file: file,
			});
		}

		setName('');
		closeModal();
	};

	return (
		<div className="dash-modal flex-col justify-center align-center">
			{type === 'folder' ? (
				<input
					placeholder={`Enter ${type} name here`}
					onChange={(e) => setName(e.target.value)}
				/>
			) : (
				<input
					style={{ border: 'none' }}
					type="file"
					onChange={(e) => setFile(e.target.value)}
				/>
			)}
			<div className="modal-btn-container flex-row justify-start align-center">
				<button onClick={() => handleSubmit()}>Submit</button>
				<button onClick={() => closeModal()}>Close</button>
			</div>
		</div>
	);
};

export default Modal;
