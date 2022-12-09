import { GetStaticProps } from 'next';
import React, { useState } from 'react'
import Header from '../../components/home/Header';
import { sanityClient, urlFor } from '../../sanity';
import { Post,Comment } from '../../typings';
import PortableText from "react-portable-text"
import {useForm,SubmitHandler} from "react-hook-form"
interface IformInput{
    _id:string;
    name:string;
    email:string;
    comment:string;
}
interface Props{
    post:Post
    comments:[Comment]
}
function PostP({post,comments}:Props) {
    const [comms,setComments]=useState<[Comment]>(comments)
    const {register,handleSubmit,formState:{errors}}=useForm<IformInput>();
    const onSubmit:SubmitHandler<IformInput>=async(data)=>{
        await fetch("/api/createComment",{
            method:"post",
            body:JSON.stringify(data),
        }).then(()=>{
            
        })
        .catch((err)=>{
            console.log(err);
        })
    }
  return (
    <div>
        <Header/>
        {
            post.mainImage?
            <img className="w-full h-64 object-cover" src={urlFor(post.mainImage.asset)!}/>
            :
            <img className="w-full h-64 object-cover" src={""}/>
        }
        <div className='max-w-3xl mx-auto p-5'>
            <div className='overflow-hideen text-2xl lg:text-3xl font-medium lg:font-semibold max-w-4xl'>{post.title} </div>
            <div className='flex items-center space-x-4 pt-4'>
                <img className="rounded-full w-10" src={urlFor(post.author.image)!} alt={post.title+"-authorImage"}/>
                <div className='font-light text-sm text-slate-500'>Blog post by <span className='text-slate-300'>{post.author.name}</span><span> Published at {post._createdAt.slice(0,10).replace(/-/g,"/").split("/").reverse().join("/")+", "+post._createdAt.slice(11,19)}</span>
                </div>
            </div>
            <div className='py-5'>
            <PortableText
                content={post.description}
                projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
                dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
                serializers={{
                    h1:(props: any)=>(
                        <h1 className='text-2xl font-bold my-5' {...props}/>
                    ),
                    h2:(props: any)=>(
                        <h2 className='text-xl font-bold my-5' {...props}/>
                    ),
                    li:({children}: any)=>(
                        <li className='ml-4 list-disc'>{children}</li>
                    ),
                    link:({href,children}:any)=>(
                        <a href={href} className="text-blue-500 hover:underline">
                            {children}
                        </a>
                    )
                }}
            />
            </div>
        </div>
        <hr className="max-w-lg my-2 mx-auto border border-yellow-500"/>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col p-5 my-5 max-w-2xl mx-auto mb-2'>
            <h2 className='font-bold text-3xl mb-4'>Leave a comment below!</h2>
            <hr className='py-3 mt-2'/>
            <input
                {...register('_id')}
                type="hidden"
                name="_id"
                value={post._id}
            />
            <label className='block mb-5'>
                <span className='text-gray-700'>Name</span>
                <input 
                    {...register("name",{required:true})}
                    className='shadow border rounded py-2 px-3 form-input mt-1 block w-full ring-yellow-500 outline-none focus:ring'
                    placeholder='Name' 
                    type="text"/>
            </label>
            <label className='block mb-5'>
                <span className='text-gray-700'>Email</span>
                <input 
                    {...register("email",{required:true})}
                    className='shadow border rounded py-2 px-3 form-input mt-1 block w-full ring-yellow-500 outline-none focus:ring'
                    placeholder='Email' 
                    type="email"/>
            </label>
            <label className='block mb-5'>
                <span className='text-gray-700'>Comment</span>
                <textarea 
                    {...register("comment",{required:true})}
                    className='shadow border rounded py-2 px-3 form-textarea mt-1  w-full ring-yellow-500 outline-none focus:ring'
                    placeholder='Comment' rows={8}/>
            </label>
            <div className='flex flex-col p-5'>
                {errors.name && (
                    <span className='text-red-500'>This Name Field is required</span>
                )}
                {errors.email && (
                    <span className='text-red-500'>This Email Field is required</span>
                )}
                {errors.comment && (
                    <span className='text-red-500'>This Comment Field is required</span>
                )}
            </div>
            <input type="submit" className='shadow bg-yellow-500 hover:bg-yellow-400 focus:shadow-outline text-white font-bold focus:outline-none py-2 rounded cursor-pointer'/>
        </form>
        <div className='max-w-2xl mx-auto p-5 space-y-2'>
            <div className='font-bold text-3xl mb-4'>Comments</div>
            {
                comms?.map((c,i)=>(
                    <div key={i} className='p-3 overflow-hidden border rounded border-yellow-500'>
                        <div className='text-xl font-medium flex items-center'>{c.name} 
                        <span className='text-xs font-normal pl-1'>({c.email})</span></div>
                        <div className='text-l ml-1 overflow-auto'>{c.comment}</div>
                    </div>
                )) 
            }
            {
                comms.length==0 && (<div>No Comments</div>)
            }
        </div>
    </div>
  )
}
export default PostP;

export const getStaticPaths=async()=>{
    const query=`*[_type == "post"]{
        _id,
        slug{
          current
        },
      }`;
    const posts=await sanityClient.fetch(query);
    const paths=posts.map((p:Post)=>({
        params:{
            slug:p.slug.current
        }
    }))
    return {
        paths,
        fallback:'blocking'
    }
}

export const getStaticProps: GetStaticProps=async({params})=>{
    const query=`*[_type == "post" && slug.current == $slug][0]{
        _id,
        _createdAt,
        title,
        author-> {
        name,
        image
      },
        description,
        mainImage,
        slug,
      }`
      const post=await sanityClient.fetch(query,{
        slug:params?.slug,
      })
      const Cquery=`*[_type == "comment" && post._ref==$slug && approved==true]{
        post,
        name,
        email,
        comment
      }`
      const comments=await sanityClient.fetch(Cquery,{
        slug:post._id
      })
      console.log(comments);
      if(Object.keys(post).length==0){
        return{
            notFound:true
        }
      }

      return{
        props:{
            post,
            comments
        },
        revalidate:60,
      }
}