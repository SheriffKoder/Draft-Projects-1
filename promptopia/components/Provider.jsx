// import React from 'react'

//as we are using the browser's capabilities
"use client";


//02.01
import { SessionProvider } from "next-auth/react";

//02.01
//want to be able to get the children and current session through props
//this is going to be a higher order component, means we will wrap other components with it
//which means in the return statement, we will use the session provider
//and within it we have to render the children
export const Provider = ({ children, session }) => {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  )
}

export default Provider;