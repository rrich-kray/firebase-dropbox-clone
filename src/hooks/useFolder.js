import { useReducer, useEffect } from 'react';
import { database } from '../firebase';
import { useAuth } from '../context/AuthContext';

const ACTIONS = {
	SELECT_FOLDER: 'select-folder',
	UPDATE_FOLDER: 'update-folder',
	SET_CHILD_FOLDERS: 'set-child-folders',
};

const ROOT_FOLDER = { name: 'Root', id: null, path: [] }; // path indicates "things" that come before.

function reducer(state, { type, payload }) {
	switch (type) {
		case ACTIONS.SELECT_FOLDER:
			return {
				folderId: payload.folderId,
				folder: payload.folder,
				childFiles: [],
				childFolders: [],
			};
		case ACTIONS.UPDATE_FOLDER:
			return {
				...state,
				folder: payload.folder,
			};
		case ACTIONS.SET_CHILD_FOLDERS:
			return {
				...state,
				folder: payload.folder,
			};
		default:
			return state;
	}
}

// State and dispatch functions are created with reducer function above and initial state.
// Dispatch function is called with initial state, an action type, and payload passed as arguments.
// This invokes the reducer function, which updates state with payload based on action that was accepted.
export function useFolder(folderId = null, folder = null) {
	// use default value because firebase doesn't work well with undefined;

	const { currentUser } = useAuth();
	console.log(currentUser);

	const [state, dispatch] = useReducer(reducer, {
		folderId,
		folder,
		childFolders: [],
		childFiles: [],
	});
	// Reminder: state is initial state, dispatch is function to change state, reducer is reducer function, initial state is second argument.
	useEffect(() => {
		dispatch({ type: ACTIONS.SELECT_FOLDER, payload: { folderId, folder } });
	}, [folderId, folder]);
	// invoked whenever folderId or folder is changed

	useEffect(() => {
		if (folderId === null) {
			return dispatch({
				type: ACTIONS.UPDATE_FOLDER,
				payload: { folder: ROOT_FOLDER },
			});
		}
	}, [folderId]);
	// invoked whenever folderId is changed

	useEffect(() => {
		return database.folders
			.where('parentId', '==', folderId)
			.where('userId', '==', currentUser.uid) // currentUser taken from currentUser state from context
			.orderBy('createdAt')
			.onSnapshot((snapshot) => {
				dispatch({
					type: ACTIONS.SET_CHILD_FOLDERS,
					payload: { childFolders: snapshot.docs.map(database.formatDoc()) },
				});
			});
		// With return statement, react will ensure the old listener is "cleaned up" and only run one listener at a time
	}, [folderId, currentUser]);
	// invoked whenever folderId is changed

	// get folderId and update folder state with that.
	// On error, update folder to root foldee instead.
	database.folders
		.doc(folderId) // folderId comes from state
		.get()
		.then((doc) => {
			dispatch({
				type: ACTIONS.UPDATE_FOLDER,
				payload: { folder: database.formatDoc(doc) },
			});
		})
		.catch((err) => {
			dispatch({
				type: ACTIONS.UPDATE_FOLDER,
				payload: { folder: ROOT_FOLDER },
			});
		});

	return state;
}
