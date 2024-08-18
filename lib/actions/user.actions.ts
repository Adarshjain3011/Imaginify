"use server";

import { connectToDatabase } from "../database/dbConfig";
import { handleError } from "../utils";
import User from "../database/models/user.model";
import { revalidatePath } from "next/cache";

// Create the new User
export async function createUser(user: any) {
    try {
        console.log("Inside createUser");

        await connectToDatabase();

        const newUser = await User.create(user);

        return JSON.parse(JSON.stringify(newUser));
    } catch (error: any) {
        handleError(error);
    }
}

// Get the user
export async function getUser(userId: string) {
    try {
        console.log("Inside getUser");

        await connectToDatabase();

        const findUser = await User.findOne({
            clerkId: userId,
        });

        if (!findUser) throw new Error("User not found");

        return JSON.parse(JSON.stringify(findUser));
    } catch (error: any) {
        handleError(error);
    }
}

// Update the user
export async function updateUser(clerkId: string, user: any) {
    try {
        await connectToDatabase();

        const updatedUser = await User.findOneAndUpdate(
            { clerkId },
            user,
            { new: true }
        );

        if (!updatedUser) throw new Error("User update failed");

        return JSON.parse(JSON.stringify(updatedUser));
    } catch (error: any) {
        handleError(error);
    }
}

// Delete the user
export async function deleteUser(clerkId: string) {
    try {
        await connectToDatabase();

        const findUser = await User.findOne({ clerkId });

        if (!findUser) throw new Error("User not found");

        const deletedUser = await User.findOneAndDelete({ clerkId });

        revalidatePath("/");

        return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
    } catch (error: any) {
        handleError(error);
    }
}
