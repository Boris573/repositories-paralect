import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'

import './App.css';

import Header from '../header/header';
import User from '../user/user';

import searchIcon from '../../img/search-icon.png'


const App = () => {
    const [userId, setUserId] = useState('');

    const mainScreen = userId !== ''
        ? <User userId={userId} />
        : <div>
            <div className="start-screen-wrapper">
                <img className="start-screen-icon" src={searchIcon} alt="searchIcon" />
                <div className="start-screen-text">Start with searching a GitHub user</div>
            </div>
        </div>
    return <Router>
        <div className="app-wrapper">
            <Header onUserIdChanged={id => setUserId(id)} />
            {mainScreen}
        </div>
    </Router>
}

export default App;