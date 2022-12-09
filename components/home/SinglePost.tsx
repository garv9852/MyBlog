import React from 'react'
import Link from 'next/link'
import {Post} from "../../typings"; 
import {urlFor} from "../../sanity"
interface Props{
    post:Post
  }
function SinglePost({post}:Props) {
  return (
      <Link key={post._id} href={`/post/${post.slug.current}`}>
        <div className='border rounded-lg group coursor-pointer overflow-hidden'>
          {
            post.mainImage!=undefined?
            <img className="h-60 w-full object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out" src={urlFor(post.mainImage.asset)} alt={post.title+"-image"}/>
            :
            <img className="h-60 w-full object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out" alt={post.title+"-image"}/>
          }
          <div className='flex justify-between p-5'>
            <div>
              <div className='text-lg font-semibold'>{post.title.slice(0,20)}...</div>
              <div className='text-xs'>This is a first</div>
            </div>
            <div>
              <img className="w-12 h-12 rounded-full" src={urlFor(post.author.image)}/>
            </div>
          </div>
        </div>
      </Link>
  )
}
export default SinglePost