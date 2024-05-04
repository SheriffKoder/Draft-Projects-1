// import React from 'react'

"use client";

//03.01
import { useEffect, useState } from "react"; //make sure to use use-client //05.09
// import { useSession } from "next-auth/react"; //to know which user is currently logged in
import { useRouter, useSearchParams } from "next/navigation"; //05.09

//03.01
import Form from "@components/Form";

//03.01
const EditPrompt = () => {
  
  const router = useRouter(); //for redirection to "/"
//   const { data: session } = useSession(); //to use the session?.user
    const searchParams = useSearchParams(); //05.09
    const promptId = searchParams.get("id");

  //03.01
  const [submitting, setSubmitting] = useState(false);  //are we currently submitting to form
  const [post, setPost] = useState({ prompt: "", tag: ""});

  //05.09
  //triggered whenever the promptId changes
  //which is received from the url query
  useEffect(() => {
    const getPromptDetails = async () => {
        const response = await fetch(`/api/prompt/${promptId}`);    //the api we created before
        const data = await response.json();

        setPost({
            prompt: data.prompt,
            tag: data.tag,
        })
    }

    if(promptId) getPromptDetails();

  }, [promptId]);
  
  //03.02, //05.10
  const updatePrompt = async (e) => {
    //prevent the default behavior of making a reload
    e.preventDefault();
    setSubmitting(true);  //because want to use that as a loader later on

    //05.10
    if(!promptId) return alert("Prompt ID not found");

    //creating our first prompt
    try {
      //will call the api that we will create
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        //pass these data from the frontend to this api using a post request
        body: JSON.stringify({
          prompt: post.prompt,
        //   userId: session?.user.id,  //not needed as awe already know who created it
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
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />

  )
}

export default EditPrompt;