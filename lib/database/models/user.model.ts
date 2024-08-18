
import mongoose, { Document, Schema, model, models, mongo } from "mongoose";
import { any } from "zod";

// clerkId , name ,email,userName,photo ,creditBalance ,PlanId 

// export interface IUser extends Document {

//     clerkId: string;
//     username:string
//     email: string;
//     firstName: string;
//     lastName: string;
//     userName: string;
//     photo: string;
//     creditBalance: number;
//     planId:Number;

// }


const userSchema = new Schema({

    clerkId :{

        type: String,
        // required:true,
        unique:true,

    },
    email:{

        type:String,
        required:true,
        unique:true,

    },
    userName:{

        type:String,
        // unique:true

    },
    photo:{

        type:String,

    },
    firstName:{

        type:String,
    },
    lastName:{

        type:String,
   
    },
    creditBalance:{

        type:Number,
        // required:true,
        default:10

    },

    planId:{

        type:Number,
        default:1,


    }
})

const User = models?.User || mongoose.model("User",userSchema);

export default User;


