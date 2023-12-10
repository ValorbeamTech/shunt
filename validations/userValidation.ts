import { object, string, date } from "yup"
import { User } from "../models/User"

export const userValidators = object<User>({
    name: string().required().min(3),
    phone: string().required().min(11),
    email: string().required().email(),
    password: string().required().min(6),
    userStatus: string().required().min(3),
    createdAt: date().required()
})
