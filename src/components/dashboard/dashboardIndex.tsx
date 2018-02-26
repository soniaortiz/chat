import * as React from 'react';
import { connect, DispatchProp } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { CircularProgress } from 'material-ui';
import { RequestUserInfo } from '../../store/userActions';
import Sidebar from '../Dashboard/Sidebar/sidebar';
import { Panel } from './Panel/panel';
import './style.css';

interface DashboardProps extends DispatchProp<{}>, RouteComponentProps<{}> {
    getUser: () => Promise<boolean>;
    user: AppStore.user;
    logged: boolean;
}

export class Dashboard extends React.Component<DashboardProps, DashboardState> {
    componentDidMount() {
        console.log(this.props.logged);
        this.props.getUser()
            .then(() => console.log(this.props.user));
    }
    render() {
        console.log(this.props.logged);

        if (this.props.user.name) {
            return (
                <div >
                    {
                        this.props.logged ?
                            <div className={'Dashboard'}>
                                <div className="Sidebar">
                                    <Sidebar />
                                </div>
                                <div className="Panel">
                                    <Panel />
                                </div>
                            </div>
                            : false}

                </div>
            );
        }
        return <CircularProgress />;
    }
}

export default connect<{}, {}, DashboardProps, AppStore.store>(
    (store) => ({
        user: store.user,
        logged: store.app.logged
    }),
    {
        getUser: RequestUserInfo,
    }
)(Dashboard);