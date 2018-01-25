import * as React from 'react';
import { connect, DispatchProp } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { CircularProgress } from 'material-ui';
import { RequestUserInfo } from '../../store/userActions';
import { Sidebar } from '../Dashboard/Sidebar/sidebar';

interface DashboardProps extends DispatchProp<{}>, RouteComponentProps<{}> {
    getUser: () => Promise<boolean>,
    user: AppStore.user
}

export class Dashboard extends React.Component<DashboardProps, DashboardState> {
    componentDidMount() {
        this.props.getUser()
            .then(() => console.log(this.props.user)); // ""
    }
    render() {
        if (this.props.user.name)
            return (
                <div className="wrapper">
                    <Sidebar />
                </div>
            );
        return <CircularProgress />;
    }
}

export default connect<{}, {}, DashboardProps, AppStore.store>(
    (store) => ({
        user: store.user
    }),
    {
        getUser: RequestUserInfo
    }
)(Dashboard);