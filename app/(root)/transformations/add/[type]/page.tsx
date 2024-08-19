
import React from 'react';

import Header from '@/components/shared/Header';

import { transformationTypes } from '@/constants';

import TransformationForm from '@/components/shared/TransformationForm';

import { redirect } from 'next/navigation';

import { auth } from '@clerk/nextjs/server';
import { getUser } from '@/lib/actions/user.actions';

const AddTransformationTypePage = async ({ params: { type } }: SearchParamProps) => {

    let transformation = transformationTypes[type];

    // const { userId } = auth();

    // console.log("user id is : ", userId);

    // if (!userId) redirect("/sign-in");


    // const user = await getUser(userId);

    let user = {

        _id: "60c7419066706a001588227c",
        creditBalance: 12345
    }


    return (

        <>

            <Header title={transformation.title}
                subtitle={transformation.subTitle}
            />

            <section className='mt-10'>

                <TransformationForm

                    action='Add'
                    userId={user._id}
                    type={transformation.type as TransformationTypeKey}
                    creditBalance={user.creditBalance}

                />


            </section>
        </>

    )
}

export default AddTransformationTypePage;



