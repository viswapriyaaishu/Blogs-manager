import {Client,Account,ID} from 'appwrite'
import config from '../config/config'

export class authservice
{
    client=new Client()
    account

    constructor()
    {
        this.client=new Client().setEndpoint(config.appwriteurl).setProject(config.appwriteprojectid)
        this.account=new Account(this.client)
    }
    async createlogin({email,password,name})
    {
        try{
            const res= await this.account.create(ID.unique(),email,password,name)
            if(res)
            {
                return this.login({email,password})
            }
            else{
                return res
            }
        }
        catch(error)
        {
            throw error;
        }
    }

    async login({email,password})
    {
        try{
            return await this.account.createEmailPasswordSession(email,password)
        }
        catch(error)
        {
            console.log("Error: ",error)
        }
    }

    async getLogin()
    {
        try{
            return await this.account.get()
        }
        catch(error)
        {
            console.log("Error: ",error)
        }
        return null;
    }
    async logout()
    {
        try{
            return this.account.deleteSessions()
        }
        catch(error)
        {
            console.log("Error: ",error)
        }
    }
}

const authobj=new authservice()
export default authobj