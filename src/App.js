import React from "react";
import Navbar from "./components/Navbar";
import Filter from "./components/Filter";
import Cards from "./components/Cards";
import Spinner from "./components/Spinner";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { apiUrl,filterData } from "./data";


const App = () => {

  const [courses,setCourses] = useState(null);
  const [loading,setLoading] = useState(true);
  const [category,setCategory] = useState(filterData[0].title);


  const [error, setError] = useState(null);

  const fetchData = async() =>{
    setLoading(true);
    try{
      const result = await fetch(apiUrl);
      if (!result.ok) {
        throw new Error('Network response was not ok');
      }
      const output = await result.json();
      setCourses(output.data);
    }
    catch(error){
      setError(error.message);
      toast.error("Unable to fetch data form API");
    }
    setLoading(false);
  }
  useEffect(()=>{
    fetchData();
  },[]);
  return (
    <div className="min-h-screen flex-col flex bg-bgDark2">
      <div>
        <Navbar/>
      </div>

      <Filter 
      filterData = {filterData}
      category = {category}
      setCategory = {setCategory}
      />

      <div className="w-11/12 max-w-[1200px] min-h-[50vh] mx-auto flex flex-wrap justify-center items-center">
        {error ? (
          <div className="text-red-700 bg-red-100 p-2.5 border border-red-700 rounded-md my-2.5">
            {error}
          </div>
        ):(
          loading ? (<Spinner/>) : ( <Cards courses={courses} category={category}/>)
        )}
        {/* {
          loading ? (<Spinner/>) : ( <Cards courses={courses} category={category}/>)
        } */}
        {/* {
          (courses.length===0 || Object.values(courses).length===0)? (<div>No Courses Found</div>) :(loading ? (<Spinner/>) : ( <Cards courses={courses} category={category}/>))
        } */}
      </div>
    </div>
  );
};

export default App;
