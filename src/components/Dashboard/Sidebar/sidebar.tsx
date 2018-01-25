import * as React from 'react';
import * as axios from 'axios';
const request = axios.default;

export class Sidebar extends React.Component<SidebarProps, SidebarState>{

    constructor(props: SidebarProps){
        super(props)
    }

    getUser = ()=>{
        request.post('/profile')
        .then()
    }

    render(){
        return (
            <div className="sidebar"> 
                <ul>
                    <li>fdlks</li>
                    <li>klasdj</li>
                    <li>lkjfadslkj</li>
                    <li>lkajflkasdj</li>
                </ul>
            </div>
        )
    }
}