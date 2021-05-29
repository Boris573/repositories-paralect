import React from 'react'

import './personal-info.css'

import userIcon from '../../img/user-avatar.png'
import followersIcon from '../../img/followers-icon.png'
import followingIcon from '../../img/following-icon.png'

const PersonalInfo = ({ user }) => {

    const showFollowers = (num) => {
        if (num < 1000) return num
        if (num >= 1000 && num < 1000000) return `${parseFloat((num/1000).toFixed(1))}k`
        if (num > 1000000) return `${parseFloat((num/1000000).toFixed(1))}m`
    }

    return (
        <div className="personal-data">
            <img className="user-photo" src={user.avatar ? user.avatar : userIcon} alt="user-icon" />
            <div className="user-name">{user.name}</div>
            <a target="_blank" rel="noreferrer" className="login" href={user.url}>{user.login}</a>
            <div className="followers-wrapper">
                <div className="followers">
                    <img className="follower-icon" src={followersIcon} alt="followers" />
                    {showFollowers(user.followers)} followers
                </div>
                <div className="following">
                    <img className="follower-icon" src={followingIcon} alt="followers" />
                    {showFollowers(user.following)} following
                </div>
            </div>
        </div>
    )
}

export default PersonalInfo