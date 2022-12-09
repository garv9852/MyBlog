import type { NextPage } from 'next'
import Header from '../components/home/Header'
import {sanityClient} from "../sanity"
import {Post} from "../typings";
import SinglePost from "../components/home/SinglePost"
interface Props{
  posts:[Post]
}
const Home: NextPage = ({posts} : Props) => {
  return (
    <div className='max-w-7xl mx-auto'>
      <Header/>
      <div className='flex justify-between items-center bg-yellow-400 py-5 px-8 border-2 border-black'>
        <div className='space-y-5 '>
          <div className='text-3xl md:max-w-xl font-medium sm:text-6xl sm:font-normal'><span className='underline'>Medium</span> is a place to write, read, and connect</div>
          <div>It's easy and free to post your thinking on any topic and connect with million of readers</div>
        </div>
        <div className='hidden md:inline-flex'>
            <img className="object-contain max-w-md" src='https://accountabilitylab.org/wp-content/uploads/2020/03/Medium-logo.png'/>
        </div>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-2 md:p-6'>
        {
          posts.map((post)=>(
            <SinglePost key={post._id}post={post}/>
          ))
        }
      </div>
    </div>
  )
}


export const getServerSideProps= async ()=>{
  const query=`*[_type == "post"]{
    _id,
    title,
    slug,
    author-> {
      name,
      image
    },
    description,
    mainImage
  }`;
  const posts=await sanityClient.fetch(query);
  return {
    props:{
      posts
    }
  }
}

export default Home
