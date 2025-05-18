import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth, useUser } from "@clerk/clerk-react";

const NameContext = createContext();

const StoreContext = (props)=>{

   const backendUrl = process.env.REACT_APP_BACKEND_URL;

   const {user} = useUser()
   const {getToken} = useAuth()

    const [search,setSearch] = useState({
        title:"",
        location:"",
    });

    const [isSearch,setIsSearch] = useState(false);
    const[jobs,setJobs] = useState([]);
    const [showLogin,setShowLogin]= useState(false);

    const [companyToken,setCompanyToken] = useState(null)
    const [companyData,setCompanyData] = useState(null)

    const [userData,setUserData] = useState(null)
    const [userApplications,setUserAppilcations] = useState([])


    // Function to fetch jobs
    const fetchJobs = async()=>{
        try {
            
            const { data } = await axios.get(backendUrl+'/api/jobs')

            if (data.success) {
                setJobs(data.jobs)
                // console.log(data.jobs);
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
        
    }

    // Function to Fetch company data
    const fetchCompanyData = async () =>{
        try {
            
            const {data} = await axios.get(backendUrl+'/api/company/company',{headers:{token:companyToken}})

            if (data.success) {
                setCompanyData(data.company)
                console.log(data); 
            } else{
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    // Function to fetch user data
    const fetchUserData = async () => {
        try {
            
            const token = await getToken();

            const {data} = await axios.get(backendUrl+'/api/users/user',
                {headers:{Authorization:`Bearer ${token}`}})

                if (data.success) {
                    setUserData(data.user)
                    console.log(data.user);
                } else {
                    toast.error(data.message)
                }
        } catch (error) {
            toast.error(error.message)
        }
    }

    // Function to fetch user's applied applications data
    const fetchUserApplications = async () => {
        try {
            
            const token = await getToken()

            const {data} = await axios.get(backendUrl+'/api/users/applications',
                {headers: {Authorization: `Bearer ${token}`}}
            )
            if (data.success) {
                setUserAppilcations(data.applications)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message);
        }
    }

    useEffect(()=>{
        fetchJobs()

        const storedCompanyToken = localStorage.getItem('companyToken')

        if (storedCompanyToken) {
            setCompanyToken(storedCompanyToken)
        }

    },[jobs]);

    useEffect(()=>{
        if (companyToken) {
            fetchCompanyData()
        }
    },[companyToken])

    useEffect(()=>{
        if (user) {
            fetchUserData()
            fetchUserApplications()
        }
    },[user])

    const value ={
        setSearch,search,
        setIsSearch,isSearch,
        setJobs,jobs,
        showLogin,setShowLogin,
        companyToken,setCompanyToken,
        companyData,setCompanyData,
        backendUrl,
        userData,setUserData,
        userApplications,setUserAppilcations,
        fetchUserData,
        fetchUserApplications
    }
    return (<div>
        <NameContext.Provider value={value}>
            {props.children}
        </NameContext.Provider>
    </div>)
}

export default StoreContext;
export {NameContext};