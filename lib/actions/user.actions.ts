
import { connectToDatabase } from "../database/dbConfig";

import { handleError } from "../utils";

import User from "../database/models/user.model";


// create the new User 
export async function createUser (user:CreateUserParams){

    try{

        await connectToDatabase();

        const newUser = await User.create(user);

        return JSON.parse(JSON.stringify(newUser));

    }catch(erorr:any){

        handleError(erorr);
        
    }
}

// get the user 

export async function getUser (userId:string){

    try{

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


