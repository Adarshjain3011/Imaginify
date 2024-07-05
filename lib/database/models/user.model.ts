
import mongoose, { Document, Schema, model, models, mongo } from "mongoose";

// clerkId , name ,email,userName,photo ,creditBalance ,PlanId 

export interface IUser extends Document {

    clerkId: string;
    email: string;
    firstName: string;
    lastName: string;
    userName: string;
    photo: string;
    creditBalance: number;
    planId:Number;

}


const userSchema = new Schema({

    clerkId :{

        type:String,
        required:true,
        unique:true,

    },
    email:{

        type:String,
        required:true,
        unique:true,
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

    },
    userName:{

        type:String,
        required:true,
        unique:true

    },
    photo:{

        type:String,

    },
    firstName:{

        type:String,
        required:true
    },
    lastName:{

        type:String,
        required:true
    },
    creditBalance:{

        type:Number,
        required:true,
        default:10

    },

    planId:{

        type:Number,
        default:1,


    }
})

const User = models?.User || mongoose.model("User",userSchema);

export default User;


