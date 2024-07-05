
import React from 'react';

import Header from '@/components/shared/Header';

import { transformationTypes } from '@/constants';

const AddTransformationTypePage = ({ params : { type }}: SearchParamProps) => {

    let transformationData = transformationTypes[type];


    return (

        <Header title ={transformationData.title}
        subtitle={transformationData.subTitle}
        />
    )
}

export default AddTransformationTypePage ;



