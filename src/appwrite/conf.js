import {Client,ID,Databases,Storage,Query} from 'appwrite'
import config from '../config/config'
export class auths{
    client=new Client()
    databases
    bucket

    constructor()
    {
        this.client=new Client().setEndpoint(config.appwriteurl).setProject(config.appwriteprojectid)
        this.databases=new Databases(this.client)
        this.bucket=new Storage(this.client)
    }

    async createPost({
        title, slug,content,featuredImage,status,userId
    })
    {
        try{
            return await this.databases.createDocument(config.appwritedatabaseid,config.appwritecollectionid,slug,{
                title,slug,content,featuredImage,status,userId
            })
        }
        catch(error)
        {
            console.log("Error: ",error)
        }
    }

    async deletePost(slug)
    {
        try{
           await this.databases.deleteDocument(config.appwritedatabaseid,config.appwritecollectionid,slug)
           return true;
        }
        catch(error)
        {
            console.log("Error: ",error)
            return false;
        }
        
    }

    async updatePost(slug,{title,content,featuredImage,status})
    {
        try{
            return await this.databases.updateDocument(config.appwritedatabaseid,config.appwritecollectionid,slug,{title,content,featuredImage,status})
        }
        catch(error)
        {
            console.log("Error: ",error)
        }
    }

    async getpost(slug)
    {
        try{
            return await this.databases.getDocument(config.appwritedatabaseid,config.appwritecollectionid,slug)
        }
        catch(error)
        {
            console.log("Error: ",error)
            return false;
        }
    }

    async getposts(queries=[Query.equal("status","active")])
    {
        try{
            return await this.databases.listDocuments(config.appwritedatabaseid,config.appwritecollectionid,queries)
        }
        catch(error)
        {
            console.log("Error: ",error)
            return false;
        }
    }

    // Files

    async createfile(file)
    {
        try{
            return await this.bucket.createFile(config.appwritebucketid,ID.unique(),file)
        }
        catch(error)
        {
            console.log("Error: ",error)
        }
    }

    async deletefile(fileid)
    {
        try{
            await this.bucket.deleteFile(config.appwritebucketid,fileid)
            return true
        }
        catch(error)
        {
            console.log("Error: ",error)
            return false
        }
    }

    getfilepreview(fileid)
    {
        return this.bucket.getFilePreview(config.appwritebucketid,fileid)
    }
}

const authob=new auths();
export default authob