
//import React from 'react' //with next js no need to specify the react import

//01.02
import { Feed } from "@components/Feed";

//01
const Home = () => {
  return (
    <section className="w-full flex-center flex-col">

        <h1 className="head_text text-center">
            Discover & Share
            <br/>
            <span className="orange_gradient text-center">
                AI-Powered Prompts
            </span>
        </h1>

        <p className="desc text-center">
            Promptopia is an open-source AI prompting tool for modern world to
            discover, create and share creative prompts
        </p>

        {/* when the feed component, not created yet so will leave a comment */}
        {/* feed */}
        {/* //01.02 */}
        <Feed />

    </section>
  )
}

export default Home;


