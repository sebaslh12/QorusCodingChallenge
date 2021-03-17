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

export const postFile = async (data : any) => {
	try {
		const resp = await axios.post(ENDPOINTURL, data, {
			headers: {
				"Content-Type": "multipart/form-data; boundary: ---------------------------7da24f2e50046",
			}
		});
		console.log(resp);
		return resp;
	} catch (error) {
		console.warn(error);
	}
}

export const _filterWhereIncludes = (array: any[], identifier: any, field: string) => {
	try {
		return array.filter(item => item[field].includes(identifier));
	} catch (exception) {
		throw new Error(`[func._findWhere] ${exception.message}`);
	}
};