import React, {useState, useEffect} from 'react'
import Pagination from "react-js-pagination";

import './user.css'

import noUserIcon from '../../img/no-user-icon.png'
import errorIcon from '../../img/error-icon.png'
import userIcon from '../../img/user-avatar.png'
import followersIcon from '../../img/followers-icon.png'
import followingIcon from '../../img/following-icon.png'
import noReposIcon from '../../img/no-repos.png'


const User = ({userId}) => {
    const [user, setUser] = useState({})
    const [found, setFound] = useState(false)
    const [error, setError] = useState(false)
    const [repositories, setRepos] = useState([])

    const writeUser = (user) => {
        setUser({
            login: user.login,
            name: user.name,
            avatar: user.avatar_url,
            followers: user.followers,
            following: user.following,
            url: user.html_url,
            totalRepos: user.public_repos,
            reposUrl: user.repos_url
        })
        setFound(true)
    }

    useEffect(() => {
        fetch(`https://api.github.com/users/${userId}`)
        .then(res => {
            if (res.status === 404) {
                setError(false)
                setFound(false)
                throw new Error("User not found")
            }
            if (!res.ok) {
                setFound(false)
                setError(true)
            }
            return res.json()})
        .then(data => {
            writeUser(data)
            if (user.totalRepos !== 0) {
                fetch(`https://api.github.com/users/${userId}/repos`)
                .then(res => {
                    if (!res.ok) {
                        setFound(false)
                        setError(true)
                    }
                    return res.json()
                })
                .then(data => setRepos(data))
            }
        })
        .catch(() => {
            setFound(false)
            setError(true)
        })
    }, [userId])

    const userRepos = user.totalRepos === 0 
    ?
    <div className="no-repos-wrapper">
        <img className="no-repos-icon" src={noReposIcon} alt="no-repos"/>
        <div className="no-repos-text">Repository list is empty</div>
    </div>
    :
    repositories.map((repo, i) => {
        return (
            <div key={repo.name} className="repo-wrapper">
                <a target="_blank" href={repo.html_url} className="repo-name">{repo.name}</a>
                <div className="repo-descr">{repo.description}</div>
            </div>
        )
    })

    if (error) return  <div className="error-wrapper">
        <img className="error-icon" src={errorIcon} alt="no-user"/>
        <div className="error-text">Error...</div>
    </div>
    if (!found) return  <div className="user-not-found-wrapper">
        <img className="no-user-icon" src={noUserIcon} alt="no-user"/>
        <div className="no-user-text">User not found</div>
    </div>
    return <div className="user-wrapper">
        <div className="personal-data">
            <img className="user-photo" src={user.avatar ? user.avatar : userIcon} alt="user-icon" />
            <div className="user-name">{user.name}</div>
            <a target="_blank" className="login" href={user.url}>{user.login}</a>
            <div className="followers-wrapper">
                <div className="followers">
                    <img className="follower-icon" src={followersIcon} alt="followers" />
                    {user.followers} followers
                </div>
                <div className="following">
                    <img className="follower-icon" src={followingIcon} alt="followers" />
                    {user.following} following
                </div>
            </div>
        </div>
        <div className="repos-wrapper">
            <div className="total-repos">
                Repositories ({user.totalRepos})
            </div>
            <div className="repos">
                {userRepos}
            </div>
        </div>
        <Pagination
          activePage={1}
          itemsCountPerPage={10}
          totalItemsCount={450}
          pageRangeDisplayed={5}
        />
    </div>

}

export default User;