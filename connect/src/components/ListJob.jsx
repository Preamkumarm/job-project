import { useContext, useEffect, useState } from "react"
import { NameContext } from "../context/ArrContext"
import { assets, JobCategories, JobLocations } from "../assets/assets";
import JobBoaard from "./JobBoaard";

const ListJob = () => {
    const {isSearch,search,setSearch,jobs,setIsSearch} = useContext(NameContext);

    const [showFilter,setShowFilter] = useState(true);
    const [currPage,setCurrPage] = useState(1);

    const [searchTitle,setSearchTitle] = useState([]);
    const [searchLocation,setSearchLocation] = useState([]);
    const [searchCategory,setSearchCategory] = useState(jobs);

    const handletitle =(title)=>{
        setSearchTitle(prev=>prev.includes(title)?prev.filter(currTitle=>currTitle!==title):[...prev,title]);
    }

    const handleLocation =(location)=>{
        setSearchLocation(prev=>prev.includes(location)?prev.filter(currLocation=>currLocation!==location):[...prev,location]);
    }

    const selectPage = (current)=>{
        if(current>=1 && current <= Math.ceil(jobs.length/6) && current !== currPage)
        {
            setCurrPage(current);
        }
    }

    useEffect(()=>{
        const handleFilter = () => {
            const handleTitle = (jobs) => 
                search.title === "" || jobs.title.toLowerCase().includes(search.title.toLowerCase());
            const handleLocation = (jobs) => 
                search.location === "" || jobs.location.toLowerCase().includes(search.location.toLowerCase());
        
            const newFilteredData = jobs.slice().reverse().filter((jobs) => handleTitle(jobs) && handleLocation(jobs));
            setSearchCategory(newFilteredData);
            setIsSearch(true);
        };

        
            const handleTitle =    jobs=> search.title==="" || jobs.title.toLowerCase().includes(search.title.toLowerCase());
            const handleLocation = jobs=> search.location==="" || jobs.location.toLowerCase().includes(search.location.toLowerCase());
            if(handleTitle && handleLocation)
                {
                    setShowFilter(true);
                }
    
            const newFilteredData = jobs.slice().reverse().filter(jobs=> handleTitle(jobs) && handleLocation(jobs));
            setSearchCategory(newFilteredData);
            setIsSearch(true);
       
        
    },[jobs,search,isSearch]);
  return (
    <div className="container 2xl:px-20 mx-auto flex flex-col lg:flex-row max-lg:space-y-8 py-8">
      

        <div className="w-full lg:w-1/4 bg-white px-4">
            {
              isSearch  && (search.title !== "" || search.location !== "") && (
                <div>
                    <h3 className="font-medium text-lg mb-4">Current search</h3>
                    <div className="mb-4 text-gray-600">
                        {
                            search.title && (
                                <span className="inline-flex items-center gap-2.5 bg-blue-50 border border-blue-200 px-4 py-1.5 rounded">{search.title}
                                <img onClick={ e =>setSearch(prev=>({...prev,title:""}))} src={assets.cross_icon} alt="" className="cursor-pointer"/>
                                </span>
                            )
                        }
                         {
                            search.location && (
                                <span className="ml-2 inline-flex items-center gap-2.5 bg-red-50 border border-blue-200 px-4 py-1.5 rounded">{search.location}
                                <img onClick={e =>setSearch(prev=>({...prev,location:""}))} src={assets.cross_icon} alt="" className="cursor-pointer"/></span>
                            )
                        }
                        </div>
                    </div>
              )
            }
            {
                <button onClick={e=>setShowFilter(prev=> !prev)} className="px-6 py-1.5 rounded border border-gary-400 lg:hidden">
                    {showFilter ? "Close":"Filter"}
                </button>
            }

            <div className={showFilter? "":"max-lg:hidden"}>
                <h3 className="font-medium text-lg py-4">Search By Categories</h3>
                <ul className="space-y-4 text-gray-600">
                    {
                        JobCategories.map((title,index)=>{
                            return <li key={index} className="flex gap-3 items-center">
                                <input type="checkbox" onChange={()=>handletitle(title)} checked={searchTitle.includes(title)} className="scale-125"/>
                                {title}
                            </li>
                        })
                    }
                </ul>
            </div>

            <div className={showFilter ? "":"max-lg:hidden"}>
                <h3 className="font-medium text-lg py-4 pt-14">Search By Location</h3>
                <ul className="space-y-4 text-gray-600">
                    {
                        JobLocations.map((location,index)=>{
                            return <li key={index} className="flex gap-3 items-center">
                                <input type="checkbox" onChange={()=>handleLocation(location)} checked={searchLocation.includes(location)} className="scale-125"/>
                                {location}
                            </li>
                        })
                    }
                </ul>
            </div>
        </div>

        <section className="w-full lg:w-3/4 text-gray-800 max-lg:px-4">
        <h3 className="font-medium text-3xl py-2" id="job-list">Latest Jobs</h3>
        <p className="mb-8">Get your Desired job from Top companies</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {
                searchCategory.slice(currPage*6-6,currPage*6).map((job,index)=>{
                    return <JobBoaard key={index} job={job}/>
                })
            }
        </div>
        {
            jobs.length > 0 && (
            <div className="flex items-center justify-center space-x-2 mt-10">
               <a href="#job-list">
                <img src={assets.left_arrow_icon} alt="" onClick={()=>selectPage(currPage-1)}/>
               </a>
                
                    {
                        [...Array(Math.ceil(jobs.length / 6))].map((_,index)=>{
                            return <a href="#job-list" key={index}>
                                <button onClick={()=>selectPage(index+1)} className={`w-10 h-10 flex items-center justify-center border border-gray-300 rounded ${currPage === index+1 ? "bg-blue-100 text-blue-500":"text-gray-400"}`}>{index+1}</button>
                            </a>
                        })
                    }
                
                <a href="#job-list">
                <img src={assets.right_arrow_icon} alt="" onClick={()=>selectPage(currPage+1)}/>
               </a>
            </div>)
        }
        </section>
    </div>
  )
}

export default ListJob;