import MobileUser from "@model/entity/MobileUser";

export interface IUserControllerHandler {

    /**
     * Retrieve user data by its ID. 
     * @param id 
     */
    handleGetUserById(id: string): Promise<MobileUser>;

    /**
     * Get all user data, paginated with given search query, page number, and per page limit.
     * 
     * @param search 
     * @param page 
     * @param perPage 
     */
    handleGetAllUser(search: string, page: number, perPage: number): Promise<MobileUser[]>;
        
    /**
     * Create new user data with given email and name.
     * @param email 
     * @param name 
     */
    handleCreateUser(email: string, name: string): Promise<MobileUser>;

    /**
     * Delete user by its ID.
     * @param id 
     */
    handleDeleteUser(id: string): Promise<void>;
}