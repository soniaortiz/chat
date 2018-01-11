import * as React from 'react';
import {Sidebar} from './sidebar';
export class Dashboard extends React.Component<DashboardProps,DashboardState>{
    render(){
        return <div className="wrapper"> 
            <Sidebar/>
        </div>
    }
}