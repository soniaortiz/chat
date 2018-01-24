import * as React from 'react';
// import {Sidebar} from './sidebar';
// import { Contacts } from './contacts';
import { connect, DispatchProp } from 'react-redux'
import { RouteComponentProps } from 'react-router';
import { CircularProgress } from 'material-ui';

interface DashboardProps extends DispatchProp <{}>, RouteComponentProps<{}>{
}

export class Dashboard extends React.Component<DashboardProps, DashboardState> {
    componentWillUnmount(){
    }
    render() {
        return <CircularProgress />
        // return <div className="wrapper">
        //     <Contacts />
        // </div>;
    }
}

export default connect<{}, {}, DashboardProps, AppStore.store>(
    (store) => ({ }),
    {
        
    }
)(Dashboard);