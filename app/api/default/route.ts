import { error } from "console";
import { NextResponse } from "next/server";

export async function GET (){

    try{

        return NextResponse.json({

            message:"helo jii ",
            data:null,
            error:null
        })
    }catch(error:any){

        console.error('Error:', error.message);
        throw error;


    }
}

