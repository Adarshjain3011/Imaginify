
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';

import logoText from "@/public/assets/images/logo-text.svg";


import { SignedIn } from '@clerk/nextjs';


const Sidebar = () => {

    return (

        <aside className='sidebar'>

            <div className='flex size-full flex-col gap-4'>

                <Link href='/' className='sidebar-logo'>

                    <Image src={logoText} alt='logo' width={180} height={28}></Image>

                </Link>

                <nav className='sidebar-nav'>

                    <SignedIn />

                    <ul className='sidebar-nav_elements'>

                        {

                            na
                        }


                    </ul>
                </nav>


            </div>

        </aside>
    )
}

export default Sidebar;

