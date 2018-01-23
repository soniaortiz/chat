import * as React from 'react';
// import {Sidebar} from './sidebar';
import { Contacts } from './contacts';
import * as axios from 'axios';
// import { connect } from 'react-redux'
const request = axios.default;

export class Dashboard extends React.Component<DashboardProps, DashboardState> {
    componentWillMount() {
        request.post('/profile', { _id: this.props })
            .then((response) => {
                console.log('response: ', response);
            })
            .catch((e: Error) => console.log(e));
    }
    render() {
        // return <CircularProgress />
        return <div className="wrapper">
            <Contacts />
        </div>;
    }
}
