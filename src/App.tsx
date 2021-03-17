import React, { useEffect, useState } from 'react';
import { FileData } from './constants';
import { getFiles } from './request';
import './App.css';

function App() {
	const [files, setFiles] = useState<FileData[]>([]);

	useEffect(() => {
		(async () => {
			const result = await getFiles();
			setFiles(result);
		})()
	}, [])
	return (
		<div className="App">
			<h1>Files</h1>
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
		</div>
	);
}

export default App;
