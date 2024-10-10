import { HttpResponse, Pagination } from "@/types"
import { endpoints } from "@/config"
import { axios } from "@/lib"

interface SendMessageDto {
	message: string
	to: string
}

const GetAllMessagesQuery = async () => {
	return axios
		.get<HttpResponse<Pagination<any>>>(endpoints().messages.get_all)
		.then((res) => res.data)
}

const GetMessageQuery = async (id: string) => {
	return axios.get<HttpResponse<any>>(endpoints(id).messages.get_one).then((res) => res.data)
}

const SendMessageMutation = async (payload: SendMessageDto) => {
	return axios.post<HttpResponse<any>>(endpoints().messages.send, payload).then((res) => res.data)
}

const ReadMessageMutation = async (id: string) => {
	return axios.patch<HttpResponse<any>>(endpoints(id).messages.read).then((res) => res.data)
}

const ArchiveMessageMutation = async (id: string) => {
	return axios.patch<HttpResponse<any>>(endpoints(id).messages.archive).then((res) => res.data)
}

const DeleteMessageMutation = async (id: string) => {
	return axios.delete<HttpResponse<any>>(endpoints(id).messages.delete).then((res) => res.data)
}

export {
	ArchiveMessageMutation,
	DeleteMessageMutation,
	GetAllMessagesQuery,
	GetMessageQuery,
	ReadMessageMutation,
	SendMessageMutation,
}
