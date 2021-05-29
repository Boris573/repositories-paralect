import React from 'react'

import noReposIcon from '../../img/no-repos.png'

import './shown-repos.css'

const ShownRepos = ({ repos }) => {
    if (repos.length === 0)
        return <div className="no-repos-wrapper">
            <img className="no-repos-icon" src={noReposIcon} alt="no-repos" />
            <div className="no-repos-text">Repository list is empty</div>
        </div>
        
    return repos.map((repo) => {
        return (
            <div key={repo.name} className="repo-wrapper">
                <a target="_blank" rel="noreferrer" href={repo.html_url} className="repo-name">{repo.name}</a>
                <div className="repo-descr">{repo.description}</div>
            </div>
        )
    })
}

export default ShownRepos