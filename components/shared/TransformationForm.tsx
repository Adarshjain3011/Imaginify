
"use client";

import React from 'react';

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import { getUser } from '@/lib/actions/user.actions';

import { redirect } from 'next/navigation';

import { Input } from "@/components/ui/input";

import { defaultValues } from '@/constants';

import { auth } from '@clerk/nextjs/server';


const formSchema = z.object({

    username: z.string().min(2).max(50),

})


const TransformationForm = async ({ data, action }: TransformationFormProps) => {

    const initialValues = data && action === 'Update' ? {

        title: data?.title,
        aspectRatio: data?.aspectRatio,
        color: data?.color,
        prompt: data?.prompt,
        publicId: data?.publicId

    } : defaultValues


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
        },
    })

    // 2. Define a submit handler.

    function onSubmit(values: z.infer<typeof formSchema>) {

        // Do something with the form values.
        // ✅ This will be type-safe and validated.

        console.log(values)
    }

    return (

        <div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">


                </form>
            </Form>
        </div>
    )
}

export default TransformationForm;


