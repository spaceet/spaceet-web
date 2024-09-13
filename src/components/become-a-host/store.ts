import { createPersistMiddleware } from "@/store/middleware"

interface CreateHostStore {}

const initialState: CreateHostStore = {}

const useCreateHostStore = createPersistMiddleware<CreateHostStore>("become-a-host", () => ({
	...initialState,
}))

export { useCreateHostStore }
