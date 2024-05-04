// import React from 'react'

"use client";

//01.03
import Link from "next/link";
import Image from "next/image";
import {useState, useEffect} from "react";
import {signIn, signOut, useSession, getProviders} from "next-auth/react";


export const Nav = () => {

  // dummy user authentication
  // const isUserLoggedIn = true;

  //02.05
  const {data: session} = useSession();

  //for mobile menu //01.05
  const [toggleDropdown, setToggleDropdown] = useState(false);

  //signIn //01.04
  const [providers, setProviders] = useState(null);
  //set providers, run only at start []
  useEffect(()=> {
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    }
    setUpProviders(); //not called anywhere, so call it here, allow us to sign in using google and next auth
  }, []);


  return (

    //01.03
    <nav className="flex-between w-full mb-16 pt-3">

      <Link href="/" className="flex gap-2 flex-center">
        <Image 
          src="/images/logo.svg" 
          alt="Promptopia Logo" 
          width={37} 
          height={37}
          className="object-contain"
        /> 
        <p className="logo_text">Promtopia</p>
      </Link>

      {/* //02.05 */}
      {/* {alert(session?.user)}  //will say undefined, so it is false */}
      {/* {alert(providers)} //says null */}

    {/* Desktop navigation, visible/flex on smaller devices, hidden by default */}
    <div className="sm:flex hidden">
      {/* {isUserLoggedIn ? ( //-02.05*/}
      {session?.user ? (
          <div class="flex gap-3 md:gap-5">

            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>

            <button type="button" onClick={signOut} className="outline_btn">
              Sign Out
            </button>

            <Link href="/profile">
            {/* // 02.06  */}
              <Image src={session?.user.image}  width={37} height={37} className="rounded-full" alt="profile" />
            </Link>
          
          </div> 
        ):(
          <>
          {/* //01.04 */}
          {/* if we do have providers 
          object.values in which we pass the providers in which we map over it
          we get each provider as a result of the map
          and we return a button for each provider
          purpose: show all the different providers and show the buttons for the sign up
          in our case will use only one provider, google-auth*/}
          {providers && 
            Object.values(providers).map((provider) => (
              <button type="button" key={provider.name} onClick={() => signIn(provider.id)} className="black_btn">
                Sign In

              </button>
            ))
          }
          </>
      )}

    </div>

    {/* Mobile navigation */}
    {/* //01.05 */}
    <div className="sm:hidden flex relative">
          {/* {isUserLoggedIn ? ( //-02.05*/}
          {session?.user ? (
            <div className="flex">
               <Image 
                  src={session?.user.image}
                  alt="profile" 
                  width={37} 
                  height={37}
                  className="rounded-full"
                  //01.05
                  onClick={()=>setToggleDropdown((prev)=>!prev)}
                />

                {/* dynamic block, if dropdown is true, onClick reset the navigation */}
                {/* //01.05 */}
                {toggleDropdown && (
                  <div className="dropdown">
                    <Link href="/profile" className="dropdown_link" onClick={()=> setToggleDropdown(false)}>
                      My Profile
                    </Link>

                    <Link href="/create-prompt" className="dropdown_link" onClick={()=> setToggleDropdown(false)}>
                      Create Prompt
                    </Link>

                    <button 
                    type="button" 
                    onClick={()=>{
                      setToggleDropdown(false); 
                      signOut(); }}
                    className="mt-5 w-full black_btn"
                      >
                      Sign Out
                    </button>
                  </div>
                )}


            </div>
          ):(
            //01.04
            <>
              {providers && 
                Object.values(providers).map((provider) => (
                  <button type="button" key={provider.name} onClick={() => signIn(provider.id)} className="black_btn">
                    Sign In

                  </button>
                ))
              }
            </>
          )}
    </div>

    </nav>
  )
}



/*
mb-16, margin bottom 16
pt-3, padding top 3

Error: Image with src "/assets/images/logo.svg" is missing required "width" property.
can be fixed with adding an alt, width, height

sm:flex > small devices flex


*/