import React from "react"; 
import {FcLike,FcLikePlaceholder} from 'react-icons/fc';
import { toast } from 'react-toastify';
const Card = (props)=>{
    const course = props.course;
    const likedCourses=props.likedCourses;
    const setLikedCourses = props.setLikedCourses;


    function onClickHandler(){
        // logic
        // if already liked 
        if(likedCourses.includes(course.id)){
            setLikedCourses((prev)=> prev.filter((cid)=> (cid !== course.id) ))
            toast.warning("Liked Removed");
        }
        else{
            // if not already liked 
            if(likedCourses.length===0){
                setLikedCourses([props.course.id]);
            }
            else{
                setLikedCourses((prev) =>[...prev,props.course.id]);
            }
            toast.success("Liked Successfully");
        }
    }

    
    return (
        <div className='bg-bgDark bg-opacity-80 w-[300px] rounded-md overflow-hidden'>
            <div className='relative '>
                <img src={course.image.url}></img>
        
                <div className='rounded-full w-[40px] h-[40px] bg-white absolute right-2 bottom-[-12px] grid place-items-center'>
                    <button onClick={onClickHandler}>{
                        likedCourses.includes(course.id)?( <FcLike fontSize="1.75rem" />):( <FcLikePlaceholder fontSize="1.75rem" />)
                        }
                    </button>
                </div>
            </div>
             
            <div className='p-4'>
                <p className='text-white text-lg font-semibold leading-6'>{course.title}</p>
                <p className='mt-2 text-white'>
                   {
                    course.description.length>100 ?  
                    (course.description.substr(0,100)+"..."):
                    (course.description)
                   }
                </p>
            </div> 

        </div>
    );
}
export default Card;