import { AmenityProps, HttpResponse, Pagination } from "@/types"
import { PaginationDto } from "./property"
import { endpoints } from "@/config"
import { axios } from "@/lib"

const GetAllAmenitiesQuery = async ({ limit, page }: PaginationDto) => {
	return await axios
		.get<HttpResponse<Pagination<AmenityProps>>>(endpoints().amenities.get_all, {
			params: { limit, page },
		})
		.then((res) => res.data)
}

export { GetAllAmenitiesQuery }
