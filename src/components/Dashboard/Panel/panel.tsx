import * as React from 'react';
// import { Paper } from 'material-ui';
import './style.css';
import { NotificationsBar } from '../NotificationsBar/NotificationsBar';
export class Panel extends React.Component {
    render() {
        return (
                <NotificationsBar/>
        );
    }
}