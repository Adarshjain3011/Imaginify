
"use server";

import Stripe from "stripe";

import { redirect } from "next/navigation";import { connectToDatabase } from "../database/dbConfig";
import Transaction from "../database/models/transaction.model";
import { updateCredits } from "./user.actions";

import { handleError } from "../utils";

export async function checkoutCredits(transaction:CheckoutTransactionParams){

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);


    const amount = Number(transaction.amount) * 100 ; // amount that we are going to charge 


    const session  = await stripe.checkout.sessions.create({

        line_items :[

            {
                price_data :{
                    currency : 'usd',
                    product_data :{
                        name : transaction.plan
                    },
                    unit_amount : amount
                },
                quantity : 1

            }
        ],
        metadata:{

            plan:transaction.plan,
            credits:transaction.credits,
            buyerId:transaction.buyerId,

        },
        mode:'payment',
        success_url : `${process.env.NEXT_PUBLIC_SERVER_URL}/profile`,
        cancel_url : `${process.env.NEXT_PUBLIC_SERVER_URL}/`

    });

    redirect(session.url!);

}


export async function createTransaction(transaction: CreateTransactionParams){

    try{

        await connectToDatabase();

        // create a new transaction with the buyer id 

        const newTransaction = await Transaction.create({

            ...transaction,buyer: transaction.buyerId,
        })

        // after completeing the transaction we have to update the credits of the user 

        
        await updateCredits(transaction.buyerId,transaction.credits);

        return JSON.parse(JSON.stringify(transaction));






    }catch(error){

        handleError(error);

    }

}


