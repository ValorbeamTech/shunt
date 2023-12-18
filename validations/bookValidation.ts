import { object, string } from "yup"
import { Book } from "../models/Book"

export const bookValidators = object<Book>({
    title: string().required().min(10),
    author: string().required().min(6),
    year: string().required(),
    isbn: string().required().min(7).max(14),
    publisher: string().required(),
    bookStatus: string().required()
})
