import React, { useState, useEffect } from 'react'

import './user.css'

import noUserIcon from '../../img/no-user-icon.png'
import errorIcon from '../../img/error-icon.png'

import PersonalInfo from '../personal-info/personal-info'
import ShownRepos from '../shown-repos/shown-repos'
import Pagination from '../pagination/pagination'

const User = ({ userId }) => {
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState({})
    const [found, setFound] = useState(false)
    const [error, setError] = useState(false)
    const [repositories, setRepos] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalRepos, setTotalRepos] = useState(0)

    const indexOfLastRepo = currentPage * 4 < totalRepos ? 4 * currentPage : totalRepos
    const indexOfFirstRepo = (currentPage-1)*4
    const currentRepos = repositories.slice(indexOfFirstRepo, indexOfLastRepo)

    const writeUser = (user) => {
        setUser({
            login: user.login,
            name: user.name,
            avatar: user.avatar_url,
            followers: user.followers,
            following: user.following,
            url: user.html_url,
            reposUrl: user.repos_url
        })
        setFound(true)
        setError(false)
    }

    const paginate = pageNumber => setCurrentPage(pageNumber)
    const nextPage = (pagesNumber) => currentPage < pagesNumber ? setCurrentPage(curPage => curPage + 1) : {}
    const prevPage = () => currentPage > 1 ? setCurrentPage(curPage => curPage - 1) : {}

    useEffect(() => {
        setLoading(true)
        fetch(`https://api.github.com/users/${userId}`)
            .then(res => {
                if (res.status === 404) {
                    setLoading(false)
                    setFound(false)
                    setError(false)
                    throw new Error("Error: User not found")
                } else if (!res.ok) {
                    setLoading(false)
                    setFound(false)
                    setError(true)
                    throw new Error("Error: Could not fetch")
                }
                setLoading(false)
                return res.json()
            })
            .then(data => {
                writeUser(data)
                    setLoading(true)
                    fetch(`https://api.github.com/users/${userId}/repos`)
                        .then(res => {
                            if (!res.ok) {
                                setLoading(false)
                                setFound(false)
                                setError(true)
                            }
                            setLoading(false)
                            return res.json()
                        })
                        .then(data => setRepos(data))
                })
            .catch(() => {
                !error ? setFound(false) : setError(true)
                setLoading(false)
            })
    }, [userId])

    useEffect(() => {
        setTotalRepos(repositories.length)
    }, [repositories])

    if (loading)
        return (
            <div className="spinner loadingio-spinner-spinner-feltka1g4h">
                <div className="ldio-atppvq17aw">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        )

    else if (error)
        return <div className="error-wrapper">
            <img className="error-icon" src={errorIcon} alt="no-user" />
            <div className="error-text">Error...</div>
        </div>
    else if (!found)
        return <div className="user-not-found-wrapper">
            <img className="no-user-icon" src={noUserIcon} alt="no-user" />
            <div className="no-user-text">User not found</div>
        </div>

    return <div className="user-wrapper">
        <PersonalInfo user={user} />
        <div className="repos-wrapper">
            <div className="total-repos">
                Repositories ({totalRepos})
            </div>
            <div className="repos">
                <ShownRepos
                    repos={currentRepos} />
            </div>
            <Pagination
                currentPage={currentPage}
                firstIndex={indexOfFirstRepo}
                lastIndex={indexOfLastRepo}
                totalRepos={totalRepos}
                paginate={paginate}
                nextPage={nextPage}
                prevPage={prevPage}
            />
        </div>
    </div>
}

export default User;