import React from "react";
import {observer} from 'mobx-react-lite';
import './dashboard.css'
import TVLOverTimeView from "../charts/TVLOverTimeView";
import DailyVolumeByProtocolView from "../charts/DailyVolumeByProtocolView";
import ActiveUsersByChainView from "../charts/ActiveUsersByChainView";


const Dashboard = observer(() => {

    return (
        <div className='dashboard_container'>
            <TVLOverTimeView/>
            <DailyVolumeByProtocolView/>
            <ActiveUsersByChainView/>
        </div>
    )
})
export default Dashboard;