import * as React from 'react';
import { connect, DispatchProp } from 'react-redux';
import { RouteComponentProps } from 'react-router';
// import { CircularProgress } from 'material-ui';
import { RequestUserInfo } from '../../store/userActions';
import Sidebar from '../Dashboard/Sidebar/sidebar';
import Panel from './Panel/panel';
import { socketListeners } from '../../socketsClient';
import './style.css';
// import { setLanguage } from '../../store/LangAction';
import { CircularProgress } from 'material-ui';

interface DashboardProps extends DispatchProp<{}>, RouteComponentProps<{}> {
    getUser: () => Promise<boolean>;
    user: AppStore.User;
    logged: boolean;
    language: string;
    loadLanguages: (language: string) => void;
}

export class Dashboard extends React.Component<DashboardProps, DashboardState> {
    constructor(props: DashboardProps) {
        super(props);
        socketListeners();
    }
    componentDidMount() {
        this.props.getUser()
            .then(() => console.log(this.props.user));
    }
    render() {
        return (
            this.props.language ?
                <div>
                    <div className={'Dashboard'}>
                        <div className="Sidebar">
                            <Sidebar />
                        </div>
                        <div className="Panel">
                            <Panel />
                        </div>
                    </div>
                </div> :
                <CircularProgress size={60} thickness={7} />

        );
    }
}

export default connect<{}, {}, DashboardProps, AppStore.Store>(
    (store) => ({
        user: store.user,
        logged: store.app.logged,
        language: store.app.locale
    }),
    {
        getUser: RequestUserInfo,
        // loadLanguages: setLanguage
    }
)(Dashboard);