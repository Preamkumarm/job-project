import { useContext, useEffect, useState } from "react";
import { NameContext } from "../context/ArrContext";
import { assets, JobCategories, JobLocations } from "../assets/assets";
import JobBoaard from "./JobBoaard";

const ListJob = () => {
  const { isSearch, search, setSearch, jobs, setIsSearch } =
    useContext(NameContext);

  const [showFilter, setShowFilter] = useState(false);
  const [currPage, setCurrPage] = useState(1);

  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState([]);

  const [filteredJobs, setFilteredJobs] = useState(jobs);

  const handleCategory = (category) => {
    setSelectedCategory((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleLocation = (location) => {
    setSelectedLocation((prev) =>
      prev.includes(location)
        ? prev.filter((c) => c !== location)
        : [...prev, location]
    );
  };

  useEffect(() => {
    const matchesCategory = job => selectedCategory.length === 0 || selectedCategory.includes(job.category)

    const matchesLocation = job => selectedLocation.length === 0 || selectedLocation.includes(job.location)

    const matchesTitle = job => search.title === "" || job.title.toLowerCase().includes(search.title.toLowerCase())

    const matchesSearchLocation = job => search.location === "" || job.location.toLowerCase().includes(search.location.toLowerCase())

    const newFilterdJobs = jobs.slice().reverse().filter(
        job => matchesCategory(job) && matchesLocation(job) && matchesTitle(job) && matchesSearchLocation(job)
    )

    setFilteredJobs(newFilterdJobs);
    // setCurrPage(1)
  }, [jobs, selectedCategory, selectedLocation, search]);
  return (
    <div className="container 2xl:px-20 mx-auto flex flex-col lg:flex-row max-lg:space-y-8 py-8">
      <div className="w-full lg:w-1/4 bg-white px-4">
        {isSearch && (search.title !== "" || search.location !== "") && (
          <div>
            <h3 className="font-medium text-lg mb-4">Current search</h3>
            <div className="mb-4 text-gray-600">
              {search.title && (
                <span className="inline-flex items-center gap-2.5 bg-blue-50 border border-blue-200 px-4 py-1.5 rounded">
                  {search.title}
                  <img
                    onClick={(e) =>
                      setSearch((prev) => ({ ...prev, title: "" }))
                    }
                    src={assets.cross_icon}
                    alt=""
                    className="cursor-pointer"
                  />
                </span>
              )}
              {search.location && (
                <span className="ml-2 inline-flex items-center gap-2.5 bg-red-50 border border-blue-200 px-4 py-1.5 rounded">
                  {search.location}
                  <img
                    onClick={(e) =>
                      setSearch((prev) => ({ ...prev, location: "" }))
                    }
                    src={assets.cross_icon}
                    alt=""
                    className="cursor-pointer"
                  />
                </span>
              )}
            </div>
          </div>
        )}

        <button
          onClick={(e) => setShowFilter((prev) => !prev)}
          className="px-6 py-1.5 rounded border border-gary-400 lg:hidden"
        >
          {showFilter ? "Close" : "Filter"}
        </button>

        <div className={showFilter ? "" : "max-lg:hidden"}>
          <h3 className="font-medium text-lg py-4">Search By Categories</h3>
          <ul className="space-y-4 text-gray-600">
            {JobCategories.map((category, index) => {
              return (
                <li key={index} className="flex gap-3 items-center">
                  <input
                    type="checkbox"
                    onChange={() => handleCategory(category)}
                    checked={selectedCategory.includes(category)}
                    className="scale-125"
                  />
                  {category}
                </li>
              );
            })}
          </ul>
        </div>

        <div className={showFilter ? "" : "max-lg:hidden"}>
          <h3 className="font-medium text-lg py-4 pt-14">Search By Location</h3>
          <ul className="space-y-4 text-gray-600">
            {JobLocations.map((location, index) => {
              return (
                <li key={index} className="flex gap-3 items-center">
                  <input
                    type="checkbox"
                    onChange={() => handleLocation(location)}
                    checked={selectedLocation.includes(location)}
                    className="scale-125"
                  />
                  {location}
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <section className="w-full lg:w-3/4 text-gray-800 max-lg:px-4">
        <h3 className="font-medium text-3xl py-2" id="job-list">
          Latest Jobs
        </h3>
        <p className="mb-8">Get your Desired job from Top companies</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredJobs
            .slice((currPage - 1) * 6, currPage * 6)
            .map((job, index) => {
              return <JobBoaard key={index} job={job} />;
            })}
        </div>
        {
          //pagination
          filteredJobs.length > 0 && (
            <div className="flex items-center justify-center space-x-2 mt-10">
              <a href="#job-list">
                <img
                  src={assets.left_arrow_icon}
                  alt=""
                  onClick={() => setCurrPage(Math.max(currPage - 1, 1))}
                />
              </a>

             {Array.from({ length: Math.ceil(filteredJobs.length / 6) }).map((_, index) => (
  <a href="#job-list" key={index}>
    <button
      onClick={() => setCurrPage(index + 1)}
      className={`w-10 h-10 flex items-center justify-center border border-gray-300 rounded ${
        currPage === index + 1 ? "bg-blue-100 text-blue-500" : "text-gray-500"
      }`}
    >
      {index + 1}
    </button>
  </a>
))}

              <a href="#job-list">
                <img
                  src={assets.right_arrow_icon}
                  alt=""
                  onClick={() =>
                    setCurrPage(
                      Math.min(currPage + 1, Math.ceil(filteredJobs.length / 6))
                    )
                  }
                />
              </a>
            </div>
          )
        }
      </section>
    </div>
  );
};

export default ListJob;
