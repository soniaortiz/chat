import * as React from 'react';
import { connect, DispatchProp } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { CircularProgress, Paper, Drawer } from 'material-ui';
import { RequestUserInfo } from '../../store/userActions';
// import { TableRow } from 'material-ui/Table';
import { Sidebar } from '../Dashboard/Sidebar/sidebar';
import { Panel } from './Panel/panel';
import './style.css';
interface DashboardProps extends DispatchProp<{}>, RouteComponentProps<{}> {
    getUser: () => Promise<boolean>;
    user: AppStore.user;
}

export class Dashboard extends React.Component<DashboardProps, DashboardState> {
    componentDidMount() {
        this.props.getUser()
            .then(() => console.log(this.props.user));
    }
    render() {
        if (this.props.user.name) {
            return (
                <Paper>
                    <Drawer width={'30%'} open={true} >
                        <Sidebar />
                    </Drawer>
                    <Panel />
                </Paper>
            );
        }
        return <CircularProgress />;
    }
}

export default connect<{}, {}, DashboardProps, AppStore.store>(
    (store) => ({
        user: store.user,
    }),
    {
        getUser: RequestUserInfo,
    }
)(Dashboard);