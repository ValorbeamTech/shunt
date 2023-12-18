import { ObjectId } from "mongodb"

export function createObjectId(id) {
    try {
        if (id) {
            const newObjectId = new ObjectId(id.toString())
            return newObjectId
        } else {
            return ""
        }
    } catch (err) {
        console.log(err.message)
    }
}