import React, {useState} from 'react'

import './header.css';

import githubLogo from '../../img/github-icon.png';

const Header = ({onUserIdChanged}) => {
    const [userId, setUserId] = useState('');

    const onSubmit = (e) => {
        e.preventDefault()
        setUserId(e.target.value)
        onUserIdChanged(userId)
    }

    return (
        <div className="header-wrapper">
            <img className="githubLogo" src={githubLogo} alt="githubIcon"/>
            <form className="form-wrapper cf"
            onSubmit={onSubmit}>
                <input 
                    type="text" 
                    placeholder="Enter Github username" 
                    onChange={e => setUserId(e.target.value)}/>
            </form>
        </div>
    )
}

export default Header;