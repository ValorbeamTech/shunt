import userModel from "../models/user"

export const getUserPermissions =  async (userId: string): Promise<string[]> => {
    try {
        const user = await userModel.findById(userId)
        if(!user){
            return []
        }
        
        return user.permissions

    } catch (error) {
        return []
    } 
    
}



