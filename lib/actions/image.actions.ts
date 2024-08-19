"use server"

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../database/dbConfig";
import { handleError } from "../utils";
import User from "../database/models/user.model";
import Image from "../database/models/image.model";
import { redirect } from "next/navigation";
import { model } from "mongoose";

import { v2 as cloudinary } from "cloudinary";



const populateUser = (query: any) => query.populate({

    path: 'author',
    model: "User",
    select: '_id firstName lastName'

})


// Add image 

export async function addImage({ image, userId, path }: AddImageParams) {

    try {

        await connectToDatabase();

        // find author 

        const author = await User.findById(userId);

        if (!author) {

            throw new Error(`Could not find's author `);

        }

        const newImage = await Image.create({

            ...image,
            author: author._id,
        })

        revalidatePath(path); // which willl allows to actually show the new image that was created and not just keep what was cached rather we want to revalidate the path  to show this new added image 

        return JSON.parse(JSON.stringify(newImage));

    } catch (error: any) {

        handleError(error);

    }
}



// update image   


export async function updateImage({ image, userId, path }: AddImageParams) {

    try {

        await connectToDatabase();

        // find author 


        const imageToUpdate = await Image.findById(image._id);

        if (!imageToUpdate || imageToUpdate.author.toHexString()! == userId) {

            throw new Error("unthorized or image not found");


        }


        const updateImage = await Image.findByIdAndUpdate(
            imageToUpdate._id,
            image,
            { new: true }

        )

        revalidatePath(path); // which willl allows to actually show the new image that was created and not just keep what was cached rather we want to revalidate the path  to show this new added image 

        return JSON.parse(JSON.stringify(image));

    } catch (error: any) {

        handleError(error);

    }
}


// delete image

export async function deleteImage(imageId: string) {

    try {

        await connectToDatabase();

        await Image.findByIdAndDelete(imageId);


    } catch (error: any) {

        handleError(error);

    } finally {

        redirect("/");


    }

}



//  get images 

export async function getImageById(imageId: string) {

    try {

        await connectToDatabase();

        const image = await populateUser(Image.findById(imageId));

        if (!image) throw new Error("image not found ");

        return JSON.parse(JSON.stringify(image));


    } catch (error: any) {

        handleError(error);

    }
}



export async function getAllImages({

    limit = 9,
    page = 1,
    searchQuery = ''
}: {

    limit?: number,
    page: number,
    searchQuery?: string;

}) {

    try {

        await connectToDatabase();

        cloudinary.config({

            cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
            api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
            api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
            secure: true

        })

        let expression = 'folder=imaginify';

        if (searchQuery) {

            expression += `AND ${searchQuery}`

        }


        const { resources } = await cloudinary.search.expression(expression).execute(); // this will return all the resources we need 


        const resourceIds = resources.map((resource: any) => resource.public_id)


        let query = {};

        if (searchQuery) {


            query = {

                publicId: {

                    $in: resourceIds

                }
            }
        }


        // now here we have to apply paginationn 

        const skipAmount = (Number(page) - 1) * limit;


        const images = await populateUser(Image.find(query)).
            sort({ createdAt: -1 }).
            skip(skipAmount).
            limit(limit);


        const totalImages = await Image.find(query).countDocuments(); // count of total number of images 

        const savedImages = await Image.find().countDocuments();

        return {

            data: JSON.parse(JSON.stringify(images)),
            totalPage: Math.ceil(totalImages / limit),
            savedImages,
        }


    } catch (error: any) {

        handleError(error);

    }
}

