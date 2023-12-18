export interface User {
    name: String,
    phone: String,
    email: String,
    password: String,
    userStatus: String,
    createdAt: Date,
    roleId: Number,
    permissions: Array<Permission>
}

export interface Permission {
    id: String,
    name: String,
    list: Array<String>
}