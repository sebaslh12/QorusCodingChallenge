import React, { Fragment, useEffect, useState } from 'react';
import { FileData } from './constants';
import { _filterWhereIncludes } from './utils';


export const QueryInput = ({ files, setFiles }: { files: FileData[], setFiles: React.Dispatch<React.SetStateAction<FileData[]>> }) => {

	const [values, setValues] = useState({
		fileName: "",
		category: ""
	});

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setValues({ ...values, [name]: value });
		if (value) {
			const filteredFiles = _filterWhereIncludes(files, value, name);
			setFiles(filteredFiles);
		}
	};

	return (
		<Fragment>
			<input type="text" name="category" value={values.category} placeholder="Search by category" onChange={handleChange} />
			<input type="text" name="fileName" value={values.fileName} placeholder="Search by name" onChange={handleChange} />
		</Fragment>
	);
}
