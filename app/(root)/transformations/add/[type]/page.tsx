
import React from 'react';

import Header from '@/components/shared/Header';

import { transformationTypes } from '@/constants';

import TransformationForm from '@/components/shared/TransformationForm';

import { redirect } from 'next/navigation';

import { auth } from '@clerk/nextjs/server';
import { getUser } from '@/lib/actions/user.actions';

const AddTransformationTypePage = async({ params: { type } }: SearchParamProps) => {

    let transformation = transformationTypes[type];

    const { userId } = auth();

    if( !userId) redirect("/sign-in");


    const user = await getUser(userId);


    return (

        <>
        
            <Header title={transformation.title}
                subtitle={transformation.subTitle}
                />

            <TransformationForm 

                action='Add'
                userId={user._id}
                type={transformation.type as TransformationTypeKey}
                creditBalance={user.creditBalance}
            
            />
        </>

    )
}

export default AddTransformationTypePage;



