// import React from 'react'

"use client";

//03.01
import { useState } from "react"; //make sure to use use-client
import { useSession } from "next-auth/react"; //to know which user is currently logged in
import { useRouter } from "next/navigation";

//03.01
import Form from "@components/Form";

//03.01
const CreatePrompt = () => {
  
  const router = useRouter(); //for redirection to "/"
  const { data: session } = useSession(); //to use the session?.user

  //03.01
  const [submitting, setSubmitting] = useState(false);  //are we currently submitting to form
  const [post, setPost] = useState({ prompt: "", tag: ""});
  
  //03.02
  const createPrompt = async (e) => {
    //prevent the default behavior of making a reload
    e.preventDefault();
    setSubmitting(true);  //because want to use that as a loader later on

    //creating our first prompt
    try {
      //will call the api that we will create
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        //pass these data from the frontend to this api using a post request
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user.id,
          tag: post.tag
        })
      })

      if (response.ok) {
        router.push("/");



      }

    } catch (error) {
      console.log(error);
    } finally { //this will happen either way
      setSubmitting(false);
    }




  }
  
  //alt+double clicking the words to copy them
  
  return (
    
    // reusable component
    // pass the properties will use in this component
    // copy the props to the form parameter props
    //03.01
    <Form 
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />

  )
}

export default CreatePrompt;