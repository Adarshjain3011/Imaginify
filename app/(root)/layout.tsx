
import Sidebar from '@/components/shared/Sidebar'
import React from 'react';

import MobileNav from '@/components/shared/MobileNav';

const Layout = ({ children }: { children: React.ReactNode }) => {

    return (

        <main className='root'>

            <Sidebar/>
            <MobileNav/>
            
            <div className='root-container'>

                <div className='wrapper'>

                    {children}

                </div>
            </div>
        </main>

    )
}

export default Layout

