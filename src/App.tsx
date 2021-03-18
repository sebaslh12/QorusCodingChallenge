import React, { useEffect, useState } from 'react';
import { FileData } from './constants';
import { getFiles } from './utils';
import { QueryInput } from './QueryInput';
import { FileModal } from './FileModal';
import './App.css';

function App() {
	const [files, setFiles] = useState<FileData[]>([]);
	const [showModal, setShowModal] = useState<boolean>(false);
	const toggleModal = () => setShowModal(!showModal);

	useEffect(() => {
		(async () => {
			const result = await getFiles();
			setFiles(result);
		})()
	}, []);

	const handleClick = async () => {
		const result = await getFiles();
		setFiles(result);
	};


	return (
		<div className="App">
			<h1>Files</h1>
			<button onClick={toggleModal}>Add file</button>
			<QueryInput files={files} setFiles={setFiles} />
			<button onClick={handleClick}>Reset Data</button>
			<div className="files">
				{files.map((file: FileData) =>
					<div key={file.blobName}>
						<a href={`https://qorus-test.azurewebsites.net/QorusFile/${file.blobName}`} target="_blank" rel="noreferrer">{file.fileName}</a>
						<span>{file.size}</span>
						<span>{file.category}</span>
						<span>{file.lastReviewed}</span>
					</div>
				)}
			</div>
			{showModal && <FileModal isOpen={showModal} onClose={toggleModal} setFiles={setFiles} />}
		</div>
	);
}

export default App;
