export const ENDPOINTURL = "https://qorus-test.azurewebsites.net/QorusFile";

export interface FileData {
	file: File | null,
	size: number,
	fileName: string,
	category: string,
	lastReviewed: string,
	blobName: string
}
