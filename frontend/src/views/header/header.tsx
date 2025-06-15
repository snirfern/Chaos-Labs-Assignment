import React from 'react';
import {observer} from 'mobx-react-lite';
import './header.css';
import CustomDatePicker from "../../components/RangePicker/RangePicker";
import {useAppContext} from "../../context";

const Header = observer(() => {
    const {chartStore} = useAppContext();
    return (
        <div className='header_container'>
            <CustomDatePicker
                component_id="header-date-picker"
                disabled={chartStore.isStoreEmpty}
            />
        </div>
    );
});

export default Header;
