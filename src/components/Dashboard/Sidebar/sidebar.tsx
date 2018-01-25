import * as React from 'react';
// import * as axios from 'axios';
// const request = axios.default;
import Me from '../UserInfo/userInfo';

export class Sidebar extends React.Component<SidebarProps, SidebarState>{

    constructor(props: SidebarProps){
        super(props)
    }

    render(){
        return (
            <div className="sidebar"> 
                <Me />
            </div>
        )
    }
}