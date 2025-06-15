import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {AppContext, rootContext} from './context';

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
    <React.StrictMode>
        <AppContext.Provider value={rootContext}>
            <App/>
        </AppContext.Provider>
    </React.StrictMode>
);
