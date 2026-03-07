import MobileUser from "@model/entity/MobileUser";
import { IUserControllerHandler } from "./IUserControllerHandler";

export class UserControllerHandler implements IUserControllerHandler{
    handleGetUserById(id: string): Promise<MobileUser> {
        
        throw new Error("Method not implemented.");
    }
    handleGetAllUser(search: string, page: number, perPage: number): Promise<MobileUser[]> {
        throw new Error("Method not implemented.");
    }
    handleCreateUser(email: string, name: string): Promise<MobileUser> {
        throw new Error("Method not implemented.");
    }
    handleDeleteUser(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
} 