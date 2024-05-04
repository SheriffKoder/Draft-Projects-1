// import React from 'react'


//import styles //01
import '@styles/globals.css';   //import the css to the entire application

//01.02
import { Nav } from '@components/Nav';
import { Provider } from '@components/Provider';

//define metadata //01
export const metadata = {
    title: "Promptopia",
    description: "Discover & Share AI Prompts"
}

//define layout component //01
const RootLayout = ({ children }) => {
    return (
        <html lang="en">
            <body>
                {/* //02.01 Provider*/}
                <Provider>
                    <div className="main">
                        <div className="gradient">
                            {/* changes background */}
                        </div>
                    </div>

                    <main className="app">
                        <Nav />
                        {/* this will hold the page.jsx */}
                        {children}
                    </main>
                </Provider>
            </body>
        </html>
    )
}


//export layout component //01
export default RootLayout;
