import dayjs from "dayjs";
import React, { useState } from "react";
import Modal from "react-modal";
import { FileData } from "./constants";
import { postFile, getFiles } from "./utils";

export const FileModal = ({ isOpen, onClose, setFiles }: { isOpen: boolean, onClose: any, setFiles: React.Dispatch<React.SetStateAction<FileData[]>> }) => {
	const [values, setValues] = useState<FileData>({
		file: null,
		size: 0,
		fileName: "",
		category: "",
		lastReviewed: dayjs().format("YYYY-MM-DD"),
		blobName: ""
	});
	const [errorMessage, setErrorMessage] = useState<string>("");

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setValues({ ...values, [name]: value });
	};

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { files } = event.target;
		if (files) setValues({ ...values, file: files[0] });
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData();
		formData.append("file", values.file as Blob, values.file?.name || "uploaded");
		formData.append("fileName", values.file?.name || "New File");
		formData.append("size", values.file?.size.toString() || "0");
		formData.append("category", values.category);
		formData.append("lastReviewed", values.lastReviewed);

		const postResult = await postFile(formData);
		if (postResult?.status === 200) {
			const newFiles = await getFiles();
			setFiles(newFiles);
			onClose();
		} else {
			setErrorMessage("Either the file already exists or something went wrong");
		}
	}

	return (
		<Modal isOpen={isOpen} onRequestClose={onClose} ariaHideApp={false}>
			<form onSubmit={handleSubmit}>
				<input type="file" name="file" onChange={handleFileChange} />
				<label htmlFor="">
					Category
					<input type="text" name="category" placeholder="File Category" value={values.category} onChange={handleChange} maxLength={100} pattern="^[A-Z0-9-_]+$" required />
				</label>
				<label htmlFor="">
					Last Reviewed
					<input type="date" name="lastReviewed" value={values.lastReviewed.toString()} onChange={handleChange} max={dayjs().format("YYYY-MM-DD")} required />
				</label>
				{errorMessage && <p className="error">{errorMessage}</p>}
				<button type="submit">Submit File</button>
			</form>
		</Modal>
	);
}
