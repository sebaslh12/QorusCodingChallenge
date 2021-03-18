import React, { useEffect, useState } from 'react';
import { FileData } from './constants';
import { getFiles, sortFieldByString } from './utils';
import { QueryInput } from './QueryInput';
import { FileModal } from './FileModal';
import './App.css';

function App() {
	const [files, setFiles] = useState<FileData[]>([]);

	const [sortStatus, setSortStatus] = useState({
		category: 1,
		lastReviewed: 1
	});

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

	const handleSort = (field: string) => {
		const order = sortStatus[field as 'category' | 'lastReviewed'];
		const sortedFiles = sortFieldByString([...files], field, order);
		setFiles([...sortedFiles]);
		setSortStatus({ ...sortStatus, [field]: order * -1 });
	}

	return (
		<div className="App">
			<h1>Files</h1>
			<div>
				<button onClick={toggleModal}>Add file</button>
				<QueryInput files={files} setFiles={setFiles} />
				<button onClick={handleClick}>Reset Data</button>
				<button onClick={() => handleSort("category")}>Sort by category</button>
				<button onClick={() => handleSort("lastReviewed")}>Sort by date</button>
			</div>
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
