// import React from 'react'

//04.01
"use client";

import { useState, useEffect } from "react";

import PromptCard from "./PromptCard";

//04.01
const PromptCardList = ({ data, handleTagClick}) => {
  return (
    <div className="mt-16 prompt_layout">
      {/* //04.02 */}
      {data.map((post)=> (
        <PromptCard 
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}



//04.01
export const Feed = () => {

  //04.01
  const [searchText, setSearchText] = useState("");
  //04.02--1
  //the posts will be fetched on initial render with useEffect
  //then we can add them to the PromptCardList in the return as data
  //to be mapped in the PromptCardList component
  const [posts, setPosts] = useState([]); //empty array at the start

  const handleSearchChange = (e) => {

  }


  //04.02
  // [] to use it at the start, initially when the page loads
  useEffect(()=> {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();

      setPosts(data);
    }

    fetchPosts();
  },[])


  return (
    <section className="feed">
      {/* form for the search of our feed */}
      <form className="relative w-full flex-center">
        <input 
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"

        />
      </form>

      <PromptCardList 
        // data={[]} //-04.02
        data={posts}
        handleTagClick={() => {}}
      />


    </section>
  )
}
