import * as React from 'react';
import {Sidebar} from './sidebar';
import {Contacts} from './contacts';
// import{createStore, applyMiddleware} from 'redux';

// import {CircularProgress} from 'material-ui';

// const store = createStore(rootReducer)

export class Dashboard extends React.Component<DashboardProps,DashboardState>{
    render(){
        // return <CircularProgress />
        return <div className="wrapper"> 
            <Sidebar/>
            <Contacts />
        </div>
    }
}
