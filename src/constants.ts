export const ENDPOINTURL = "https://qorus-test.azurewebsites.net/QorusFile";

export interface FileData {
	file: File,
	Size: number,
	FileName: string,
	Category: string,
	LastReviewed: Date
}
