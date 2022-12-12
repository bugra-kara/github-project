import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

const rootUrl = 'https://api.github.com/';

const AppContext = React.createContext()

const AppProvider = ({children}) => {
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState("john-smilga")
    const [githubUser, setgithubUser] = useState(null)
    const [userFollowers, setUserFollowers] = useState(null)
    const [userRepos, setUserRepos] = useState([])
    const [request, setRequest] = useState({limit: null, remaining: null})
    const [failed, setFailed] = useState(false)
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await Promise.allSettled(
                [
                    fetchUser(`${rootUrl}users/${search}`),
                    fetchFollower(`${rootUrl}users/${search}/followers`),
                    fetchRepos(`${rootUrl}users/${search}/repos`),
                    fetchRequest(`${rootUrl}rate_limit`)
                ]
            )
        } catch (error) {
            console.log(error);
        }
        
    }

    const fetchUser = async (url) => {
        setLoading(true)
        try {
            const user = await axios(url)
            if(user.status === 200) {
                setgithubUser(user.data)
            }
            setLoading(false)
        } catch (error) {
            console.log(error);
            setFailed(true)
            setLoading(false)
        }
    }
    const fetchFollower = async (url) => {
        setLoading(true)
        try {
            const follower = await axios(url)
            if(follower.status === 200) {
                setUserFollowers(follower.data)
            }
            setLoading(false)
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }
    const fetchRepos = async (url) => {
        setLoading(true)
        try {
            const repos = await axios(url)
            if(repos.status === 200) {
                setUserRepos(repos.data)
            }
            setLoading(false)
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }
    const fetchRequest = async (url) => {
        setLoading(true)
        try {
            const request = await axios(url)
            if(request.status === 200) {
                setRequest({limit: request.data.rate.limit, remaining: request.data.rate.remaining})
            }
            setLoading(false)
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }
    useEffect(()=> {
        const fetchDatas = async () => {
            try {
                await Promise.allSettled(
                    [
                        fetchUser(`${rootUrl}users/${search}`),
                        fetchFollower(`${rootUrl}users/${search}/followers`),
                        fetchRepos(`${rootUrl}users/${search}/repos`),
                        fetchRequest(`${rootUrl}rate_limit`)
                    ]
                )
            } catch (error) {
                console.log(error);
            }
        }
        fetchDatas()
    },[])

    return <AppContext.Provider value={{loading, search, handleSubmit, setSearch, ...githubUser, userFollowers, userRepos, request, failed}}>{children}</AppContext.Provider>
}

// make sure use
export const useGlobalContext = () => {
    return useContext(AppContext)
  }
  
  export { AppContext, AppProvider }