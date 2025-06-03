import React from 'react'
import { Link } from 'react-router-dom'
import * as FaIcons from "react-icons/fa";

const Cards = ({name,url,link}) => {
  return (
    <Link to={link}>
    <div className='h-80'>
        <div className="max-w-sm p-4 h-80">
    <div className="flex flex-col h-full p-8 bg-teal-400 rounded-lg dark:bg-cardbody">
        <div className="flex items-center mb-3">
            <div
                className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 mr-3 text-white bg-indigo-500 rounded-full dark:bg-iconcolor">
                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                    stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                </svg>
            </div>
            <h2 className="text-lg font-medium text-white dark:text-white">{name}</h2>
        </div>
        <div className="flex flex-col justify-between flex-grow ">
            <div className='rounded-lg'><iframe src={url} title="url"></iframe></div>
            
        
            <button className='dark:text-white'><FaIcons.FaArrowRight className="w-8 h-8 rounded-full bg-iconcolor"></FaIcons.FaArrowRight></button>
                
                
        </div>
    </div>
        </div>
    </div>
    </Link>
  )
}

export default Cards