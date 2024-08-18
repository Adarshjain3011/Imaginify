
"use server"

import { connectToDatabase } from "../database/dbConfig";

import { handleError } from "../utils";

import User from "../database/models/user.model";
import { revalidatePath } from "next/cache";


// create the new User 
export async function createUser (user:any){

    try{


        console.log("hellow jii create user ke andar  ")

        await connectToDatabase();

        const newUser = await User.create(user);

        return JSON.parse(JSON.stringify(newUser));

    }catch(erorr:any){

        handleError(erorr);
        
    }
}

// get the user 

export async function getUser(userId:string){

    try{

        console.log("get user ke andar");
        

        await connectToDatabase();

        const findUser = await User.findOne({

            clerkId:userId,

        })

        if(!findUser) throw new Error("User not found ")

        
        return JSON.parse(JSON.stringify(findUser));


    }catch(erorr:any){

        handleError(erorr);

    }
}



// update the user 


export async function updateUser(clerkId:string,user:UpdateUserParams){

    try{

        await connectToDatabase();

        const updateduser = await User.findByIdAndUpdate({clerkId},user,{

            new:true,

        })

        if(!updateduser) throw new Error("updated user failed");

        return JSON.parse(JSON.stringify(updateduser));


    }catch(erorr:any){

        handleError(erorr);
    }
}


export async function deleteUser (clerkId:string){

    try{

        await connectToDatabase();

        const findUser = await User.findOne()


        if(! findUser) throw new Error("found user failed");

        const deletedUser = await User.findByIdAndDelete(findUser._id);

        revalidatePath("/");

        return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) :null;

    }catch(erorr:any){

        handleError(erorr);

    }
}


