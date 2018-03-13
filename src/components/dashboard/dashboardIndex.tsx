import * as React from 'react';
import { connect, DispatchProp } from 'react-redux';
import { RouteComponentProps } from 'react-router';
// import { CircularProgress } from 'material-ui';
import { RequestUserInfo } from '../../store/userActions';
import Sidebar from '../Dashboard/Sidebar/sidebar';
import Panel from './Panel/panel';
import { socketListeners } from '../../socketsClient';
import './style.css';
import { setLanguage } from '../../store/LangAction';

interface DashboardProps extends DispatchProp<{}>, RouteComponentProps<{}> {
    getUser: () => Promise<boolean>;
    user: AppStore.User;
    logged: boolean;
    loadLanguages: (language: string) => void;
}

export class Dashboard extends React.Component<DashboardProps, DashboardState> {
    constructor(props: DashboardProps) {
        super(props);
        socketListeners();
    }
    componentWillMount() {
        this.props.loadLanguages('en');
    }
    componentDidMount() {
        this.props.getUser()
            .then(() => console.log(this.props.user));
    }
    render() {
        return (
            <div>
                <div className={'Dashboard'}>
                    <div className="Sidebar">
                        <Sidebar />
                    </div>
                    <div className="Panel">
                        <Panel />
                    </div>
                </div>
            </div>
        );
    }
}

export default connect<{}, {}, DashboardProps, AppStore.Store>(
    (store) => ({
        user: store.user,
        logged: store.app.logged
    }),
    {
        getUser: RequestUserInfo,
        loadLanguages: setLanguage
    }
)(Dashboard);