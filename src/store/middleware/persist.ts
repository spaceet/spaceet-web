import { StateCreator, create } from "zustand"
import { persist } from "zustand/middleware"

import { reportException } from "./report"

export const createPersistMiddleware = <T>(name: string, storeCreator: StateCreator<T>) =>
	create<T>(reportException<T>(persist(storeCreator, { name: name || "z:root" }) as StateCreator<T>))
