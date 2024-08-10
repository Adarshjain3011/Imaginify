
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

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { getUser } from '@/lib/actions/user.actions';

import { redirect } from 'next/navigation';

import { Input } from "@/components/ui/input";

import { aspectRatioOptions, defaultValues, transformationTypes } from '@/constants';

import { auth } from '@clerk/nextjs/server';
import { CustomField } from './CustomField';

import { useState } from 'react';
import { AspectRatioKey } from '@/lib/utils';


export const formSchema = z.object({

    title: z.string(),
    aspectRatio: z.string().optional(),
    color: z.string().optional(),
    prompt: z.string().optional(),
    publicId: z.string()

})


const TransformationForm = ({ action, data = null, userId, type, creditBalance, config = null }: TransformationFormProps) => {


    const transformationType = transformationTypes[type];

    const [newTransformation, setNewTransformation] = useState<Transformations | null>(null)

    const [image, setImage] = useState(data);

    const [isSubmitting, setIsSubmitting] = useState(false);

    const [isTransforming, setIsTransforming] = useState(false);

    const [transfromationConfig, setTransformationConfig] = useState(config);


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
            title: "",
            aspectRatio: "",
            color: "",
            prompt: "",
            publicId: "",
        },
    })

    // 2. Define a submit handler.

    function onSubmit(values: z.infer<typeof formSchema>) {

        // Do something with the form values.
        // ✅ This will be type-safe and validated.

        console.log(values)
    }

    const onSelectFieldHandler = (value: string, onChangeField: (value: string) => void) => {


    }

    const onInputChangeHandler = (fieldName: string, value: string, type: string, onChangeField: (value: string) => void) => {


    }

    const onTransformHandler = () => {


    }

    return (

        <div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                    <CustomField

                        control={form.control}
                        name="title"
                        formLabel="Image Title"
                        className='w-full'
                        render={({ field }) => <Input {...field} className='input-field' />}
                    />

                    {
                        type === "fill" && (

                            <CustomField

                                control={form.control}
                                name="title"
                                formLabel="Image Title"
                                className='w-full'
                                render={({ field }) => (

                                    <Select onValueChange={(value) =>
                                        onSelectFieldHandler(value, field.onChange)}

                                    >
                                        <SelectTrigger className="select-field">

                                            <SelectValue placeholder="Select size " />

                                        </SelectTrigger>

                                        <SelectContent>

                                            {

                                                Object.keys(aspectRatioOptions).map((Key) => (

                                                    <SelectItem key={Key} value={Key} className='select-item'>

                                                        {

                                                            aspectRatioOptions[Key as AspectRatioKey].label
                                                        }

                                                    </SelectItem>
                                                ))
                                            }

                                        </SelectContent>

                                    </Select>

                                )}

                            />
                        )

                    }

                    {(type === 'remove' || type === 'recolor') && (
                        <div className="prompt-field">
                            <CustomField
                                control={form.control}
                                name="prompt"
                                formLabel={
                                    type === 'remove' ? 'Object to remove' : 'Object to recolor'
                                }
                                className="w-full"
                                render={({ field }) => (
                                    <Input
                                        value={field.value}
                                        className="input-field"
                                        onChange={(e) => onInputChangeHandler(
                                            'prompt',
                                            e.target.value,
                                            type,
                                            field.onChange
                                        )}
                                    />
                                )}
                            />

                            {type === 'recolor' && (
                                <CustomField
                                    control={form.control}
                                    name="color"
                                    formLabel="Replacement Color"
                                    className="w-full"
                                    render={({ field }) => (
                                        <Input
                                            value={field.value}
                                            className="input-field"
                                            onChange={(e) => onInputChangeHandler(
                                                'color',
                                                e.target.value,
                                                'recolor',
                                                field.onChange
                                            )}
                                        />
                                    )}
                                />
                            )}

                        </div>
                    )}
                    <div className="flex flex-col gap-4">
                        <Button
                            type="button"
                            className="submit-button capitalize"
                            disabled={isTransforming || newTransformation === null}
                            onClick={onTransformHandler}
                        >
                            {isTransforming ? 'Transforming...' : 'Apply Transformation'}
                        </Button>
                        <Button
                            type="submit"
                            className="submit-button capitalize"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Submitting...' : 'Save Image'}
                        </Button>
                    </div>


                </form>

            </Form>

        </div>
    )
}

export default TransformationForm;


