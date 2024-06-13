'use server'

import { revalidatePath } from "next/cache"

export const revalidateUrlPath = (path: string) => {
  revalidatePath(path, "page")
}