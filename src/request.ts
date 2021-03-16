import axios from "axios";
import { ENDPOINTURL, FileData } from "./constants";

export const getFiles = async () => {
	try {
		const files = await axios.get(ENDPOINTURL);
		return files.data as FileData[];
	} catch (error) {
		console.warn(error);
		return []
	}
};

export const postFile = async (data: FileData) => {
	try {
		const resp = await axios.post(ENDPOINTURL, data);
		return resp;
	} catch (error) {
		console.warn(error);
	}
}