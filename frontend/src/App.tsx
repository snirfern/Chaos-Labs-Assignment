import React from 'react';
import Dashboard from "./views/dashboard/Dashboard";
import './App.css'
import Header from "./views/header/header";

const App: React.FC = () => {
    return (
        <div className='App'>
            <Header/>
            <Dashboard/>
        </div>
    );
};

export default App;
