
"use client"

import React from 'react';

import Link from 'next/link';

import Image from 'next/image';

import { usePathname } from 'next/navigation';

import logoText from "@/public/assets/images/logo-text.svg";

import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

import { navLinks } from "@/constant/index";

import { Button } from '../ui/button';


const Sidebar = () => {

    const pathName = usePathname();

    console.log("path name is : ", pathName);

    return (

        <aside className='sidebar'>

            <div className='flex size-full flex-col gap-4'>

                <Link href="/" className='sidebar-logo'>

                    <Image src={logoText} alt='logo' height={28} width={180}></Image>

                </Link>

                <nav className='sidebar-nav'>

                    <SignedIn>

                        <ul className='sidebar-nav_elements'>

                            {

                                navLinks?.slice(0, 6)?.map((link) => {

                                    const isActive = link.route === pathName

                                    return (

                                        <li key={link.route} className={`sidebar-nav_element group
                                     ${isActive ? "bg-purple-400 text-white" : ""}`}>


                                            <Link className='sidebar-link' href={link.route}>

                                                <Image
                                                    src={link.icon}
                                                    alt='logo'
                                                    width={24}
                                                    height={24}
                                                    className={`${isActive && 'brightness-200'}`}
                                                />

                                                {link.label}

                                            </Link>

                                        </li>
                                    )
                                })

                            }


                        </ul>

                        <ul className='sidebar-nav_elements'>

                            <li className='flex-center flex-col cursor-pointer gap-2 p-4'>

                                {

                                    navLinks?.slice(6)?.map((link) => {

                                        const isActive = link.route === pathName

                                        return (

                                            <li key={link.route} className={`sidebar-nav_element group
                                                ${isActive ? "bg-purple-gradient text-white" : ""}`}>


                                                <Link className='sidebar-link' href={link.route}>

                                                    <Image
                                                        src={link.icon}
                                                        alt='logo'
                                                        width={24}
                                                        height={24}
                                                        className={`${isActive && 'brightness-200'}`}
                                                    />

                                                    {link.label}

                                                </Link>

                                            </li>
                                        )
                                    })

                                }

                                <UserButton afterSignOutUrl='/' showName></UserButton>

                            </li>

                        </ul>


                    </SignedIn>

                    <SignedOut>

                        <Button asChild className='button bg-purple-gradient bg-cover'>

                            <Link href="/sign-in">Login</Link>

                        </Button>

                    </SignedOut>

                </nav>


            </div>

        </aside>
    )
}

export default Sidebar;

