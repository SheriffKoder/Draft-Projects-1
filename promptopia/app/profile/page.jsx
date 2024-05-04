// import React from 'react'

"use client";

//05.01
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";   //to know if we are logged in
import { useRouter } from "next/navigation";  //to navigate back to home

//05.01
//a reuse component
//we are creating it separately because we want to pass in props like name
//and it can be my profile or somebody else's profile
import Profile from "@components/Profile";


//05.01
//pass the prompts as an array into data
const MyProfile = () => {

    //05.08
    const router = useRouter();

    //04.02, 05.03
    // [] to use it at the start, initially when the page loads
    const { data: session } = useSession();
    const [posts, setPosts] = useState([]);
    useEffect(()=> {
        const fetchPosts = async () => {
        //we only want to fetch the posts from that specific user
        const response = await fetch(`/api/users/${session?.user.id}/posts`);
        const data = await response.json();

        setPosts(data);
        }

        if (session?.user.id) fetchPosts();
    },[]);


    //05.02 //05.08
    const handleEdit = (post) => {
        router.push(`/update-prompt?id=${post._id}`);
    }

    //05.02 //05.11
    const handleDelete = async (post) => {
        //check if the user really wants to delete
        //confirm() is available in the browser api
        const hasConfirmed = confirm("Are you sure you want to delete this prompt?");

        if (hasConfirmed) {
            try {
                await fetch(`/api/prompt/${post._id.toString()}`, {
                    method: "DELETE"
                });

                //get all the posts but without the deleted post
                const filteredPosts = posts.filter((p) => p._id !== post._id);

                //set state
                setPosts(filteredPosts);

            } catch (error) {
                console.log(error);
            }
        }
    }


    return (
        <Profile
            name="My"
            desc="Welcome to your personalized profile page"
            data={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    )
}

export default MyProfile;