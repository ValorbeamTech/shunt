import { Permission } from "../models/User"
import { modelsList } from "./modelsList"

export function generatePermissions(roleId: Number) {
    try {
        switch (roleId) {
            case 1:
                return generateAdminPermisions()

            default: return generateAdminPermisions()
        }
    } catch (err) {
        console.log(err)
    }

}

function generateAdminPermisions(): Array<Permission> {
    let permissions = []
    modelsList.map((model, index) => {
        permissions.push({
            id: index,
            name: model,
            list: ["create", "read", "update", "remove"]
        })
    })
    return permissions
}