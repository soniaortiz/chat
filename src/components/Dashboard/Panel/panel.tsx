import * as React from 'react';
import { Paper } from 'material-ui';
import './style.css';
import NotificationsBar from '../NotificationsBar/NotificationsBar';
// import { Router } from 'express';
import { Route } from 'react-router';
// import { RouteComponentProps } from 'react-router';
interface PanelProps {

}
export class Panel extends React.Component<PanelProps> {
    constructor(props: PanelProps) {
        super(props);
    }
    
    render() {
        return (
            <Paper>
                <Route component={NotificationsBar}/>
                {/* <NotificationsBar /> */}

            </Paper>
        );
    }
}