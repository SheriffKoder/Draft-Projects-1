// import React from 'react'

//03.01
import Link from "next/link";


//03.01
const Form = ({type, post, setPost, submitting, handleSubmit}) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
    
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Post</span>
      </h1>

      <p className="desc text-left max-w-md">
        {type} and share amazing prompts with the world, and let your imagination
        run wild with any AI-powered platform.
      </p>

      <form 
        onSubmit={handleSubmit} 
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >

        <label>
          <span className="font-satoshi font-semibold text-base tex-gray-700">
            Your AI Prompt
          </span>

          {/* callback function where we get the event 
          update the post by setPost, with an object
          where we are going to spread the entire post value*/}
          <textarea 
            value={post.prompt}
            onChange={(e)=> {setPost({ ...post, prompt: e.target.value})}}
            placeholder="Write your prompt here..."
            required
            className="form_textarea"
          />
        </label>



        <label>
          <span className="font-satoshi font-semibold text-base tex-gray-700">
            Tag {" "}
            <span className="font-normal">(#product, #webdevelopment, #idea)</span>
          </span>

          {/* callback function where we get the event 
          update the post by setPost, with an object
          where we are going to spread the entire post value*/}
          <input 
            value={post.tag}
            onChange={(e)=> {setPost({ ...post, tag: e.target.value})}}
            placeholder="#tag"
            required
            className="form_input"
          />
        </label>

        
        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-gray-500 text-sm">
            Cancel
          </Link>

          {/* if we are currently submitting it has to be disabled 
          check if submitting, place the type(create or edit...*/}
          <button type="submit" disabled={submitting} className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white">
            {submitting ? `${type}...` : type}
          </button>
        </div>




      </form>


    
    </section>



  )
}

export default Form;