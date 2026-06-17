import config from '@/conf/config';
import { Client, Account, ID } from 'appwrite';

export const client = new Client();
client.setEndpoint(config.appwriteEndpoint).setProject(config.appwriteProjectId);

export const account = new Account(client);
export { ID } from 'appwrite';

type createUserAccount = {
    email: string,
    name: string,
    password: string,
}

type loginUserAccount = {
    email: string,
    password: string,
}

class AppWriteService {

    async createAccount({ email, password, name }: createUserAccount) {
        try {
            const user = await account.create({ userId: ID.unique(), email: email, password: password });
            if (user) {
                return this.login;
            }
            return user;
        } catch (error) {
            throw error
        }
    }

    async login({ email, password }: loginUserAccount) {
        try {
            return await account.createEmailPasswordSession({
                email: email,
                password: password
            });
        } catch (error) {
            throw error
        }
    }

    async isLoggedIn(): Promise<Boolean> {
        try {
            const data = await this.getUser();
            return Boolean(data);
        } catch (error) {
            throw error
        }
        return false;
    }

    async getUser() {
        try {
            return await account.get();
        } catch (error) {
            return null;
        }
    }

    async logout() {
        try {
            await account.deleteSession({
                sessionId: 'current'
            });
        } catch (error) {
            throw error
        }
    }

}

const appwriteService = new AppWriteService();
export default appwriteService;
