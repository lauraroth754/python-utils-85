import { Request, Response } from 'express';

export class UserService {
    private users: any[] = [];

    constructor() {}

    public addUser(user: any): void {
        this.users.push(user);
    }

    public getUsers(req: Request, res: Response): void {
        res.json(this.users);
    }

    public findUser(id: string): any | undefined {
        return this.users.find(user => user.id === id);
    }

    public updateUser(id: string, updatedUser: any): boolean {
        const index = this.users.findIndex(user => user.id === id);
        if (index === -1) return false;
        this.users[index] = { ...this.users[index], ...updatedUser };
        return true;
    }

    public deleteUser(id: string): boolean {
        const index = this.users.findIndex(user => user.id === id);
        if (index === -1) return false;
        this.users.splice(index, 1);
        return true;
    }
}

const userService = new UserService();
export default userService;