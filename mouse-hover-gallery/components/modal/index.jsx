import React, {useEffect, useRef} from 'react'
import styles from "./style.module.css"
import Image from 'next/image'

import { motion } from 'framer-motion'
import gsap from "gsap";

const index = ({modal, projects}) => {

    //these are set from the project component on mouseenter
    //to multiply the index by -100% as demonstrated in the css file
    const {active, index} = modal;


    //2//////////////////////////////////////////////////
    const scaleAnimation = {
        initial: {scale: 0, x: "-50%", y: "-50%"},
        open: {scale: 1, x:"-50%", y:"-50%", transition: {duration: 0.4, ease: [0.76, 0, 0.24, 1]}},
        closed: {scale: 0, x:"-50%", y:"-50%", transition: {duration: 0.4, ease: [0.32, 0, 0.67, 0]}}

    }
    ////////////////////////////////////////////////////



    
    //3//////////////////////////////////////////////////
    //move the image box around the page
    const modalContainer = useRef(null);
    const cursor = useRef(null);        //4
    const cursorLabel = useRef(null);   //4

    useEffect(()=> {
        //select the motion.div modal element to place the current position
        const moveContainerX = gsap.quickTo(modalContainer.current, "left", {duration: 0.8, ease:"power3" })
        const moveContainerY = gsap.quickTo(modalContainer.current, "top", {duration: 0.8, ease:"power3" })
            
        //4 same as above for the cursor
        const moveCursorX = gsap.quickTo(cursor.current, "left", {duration: 0.5, ease:"power3" })
        const moveCursorY = gsap.quickTo(cursor.current, "top", {duration: 0.5, ease:"power3" })


        //4 same as above for the cursor label
        const moveCursorLabelX = gsap.quickTo(cursorLabel.current, "left", {duration: 0.45, ease:"power3" })
        const moveCursorLabelY = gsap.quickTo(cursorLabel.current, "top", {duration: 0.45, ease:"power3" })

        window.addEventListener("mousemove", (e) => {
            const { clientX, clientY } = e;
            moveContainerX(clientX);
            moveContainerY(clientY);

            //4 same as above for the cursor
            moveCursorX(clientX);
            moveCursorY(clientY);

            //4 same as above for the cursor label
            moveCursorLabelX(clientX);
            moveCursorLabelY(clientY);
        })
    
    }, []);





  return (
    <>
        {/* //2////////////////////////////////////////////////// */}
        <motion.div className={styles.modalContainer}
        variants={scaleAnimation}
        initial={"initial"}
        animate={active ? "open": "closed"}
        ref={modalContainer}
        >
        {/* //////////////////////////////////////////////////// */}

            <div className={styles.modalSlider}
            style={{top: index * -100 + "%"}}>
                {
                    projects.map((project, index)=> {

                        const { src, color } = project;

                        return  (
                        
                            <div className={styles.modal}
                            style={{backgroundColor: color, }}
                            key={`modal_${index}`}>
                                <Image 
                                src={`/images/${src}`}
                                width={300}
                                height={0}
                                alt="image"
                                />
                            </div>

                        )
                    })
                }
            </div>
        </motion.div>

        {/* //4////////////////////////////////////////////////// */}
        <motion.div ref={cursor} 
        className={styles.cursor} 
        variants={scaleAnimation} 
        initial={"initial"} 
        animate={active ? "open": "closed"}/>

        <motion.div ref={cursorLabel} 
        className={styles.cursorLabel} 
        variants={scaleAnimation} 
        initial={"initial"} 
        animate={active ? "open": "closed"}>View</motion.div>

    </>
  )
}

export default index