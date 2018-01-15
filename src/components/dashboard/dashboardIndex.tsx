import * as React from 'react';
import {Sidebar} from './sidebar';
import {Contacts} from './contacts';

export class Dashboard extends React.Component<DashboardProps,DashboardState>{
    render(){
        return <div className="wrapper"> 
            <Sidebar/>
            <Contacts />
        </div>
    }
}
