import * as React from 'react';
import { Paper, Toolbar, IconMenu, ToolbarGroup, FlatButton } from 'material-ui';
import NotificationSms from 'material-ui/svg-icons/notification/sms';
import SocialPeople from 'material-ui/svg-icons/social/people';
import { connect } from 'react-redux';
import ContactRequestList from '../ContactRequestList/ContactRequestList';
import { LogOutRequest } from '../../../store/logOut';
import { RouteComponentProps } from 'react-router';
import * as H from 'history';
// import { FormattedMessage, FormattedTime } from 'react-intl';

// const styleToolBar = {
//     color: 'red',
//     width: '65%'
// };

interface NotificationsBarProps extends RouteComponentProps<{}> {
    // getNumberOfRequests: () => number;
}

interface NotificationsBarState {
    displayRequestsList: boolean;
}
export class NotificationsBar extends React.Component<NotificationsBarProps
    & MapDispatchToPropsNB & MapStateToPropsNB, NotificationsBarState> {

    constructor(props: NotificationsBarProps & MapDispatchToPropsNB & MapStateToPropsNB) {
        super(props);
        this.state = { displayRequestsList: false };
    }
    logOut = () => {
        console.log('Login out');
        this.props.logOut(this.props.history);
    }
    displayRequests = () => {
        console.log(this.props.userContactRequests);
        this.setState({ displayRequestsList: !this.state.displayRequestsList });
    }
    render() {
        return (
            <Paper>
                <Toolbar>
                    {/* <FormattedMessage
                        id="welcomeMessage"
                        defaultMessage="Welcome"
                    />
                    <FormattedTime value={Date.now()} day={'today'} /> */}
                    {/* <ToolbarGroup style={styleToolBar} >
                        Welcome
                    </ToolbarGroup> */}
                    <ToolbarGroup >
                        {/* {this.props.userContactRequests.length} */}
                        <IconMenu
                            iconButtonElement={
                                <NotificationSms
                                    hoverColor="red"
                                />
                            }
                        >
                        </IconMenu >
                    </ToolbarGroup>
                    <ToolbarGroup >
                        {this.props.userContactRequests ?
                            this.props.userContactRequests.length : 0}
                        <IconMenu
                            iconButtonElement={
                                <SocialPeople
                                    hoverColor={'blue'}
                                />
                            }
                        >
                            {/* {this.props.userContactRequests.length} */}
                            <ContactRequestList />
                        </IconMenu>
                    </ToolbarGroup>

                    <ToolbarGroup >
                        <FlatButton label={'Logout'} onClick={this.logOut} />
                    </ToolbarGroup>

                </Toolbar>

            </Paper >
        );
    }
}

interface MapDispatchToPropsNB {
    // tslint:disable-next-line:no-any
    logOut: (history: H.History) => void;
}

interface MapStateToPropsNB {
    userContactRequests: string[];
}

export default connect<MapStateToPropsNB, MapDispatchToPropsNB, NotificationsBarProps, AppStore.Store>(
    (store) => ({
        // userMessages: store
        userContactRequests: store.user.friendRequests
    }),
    {
        logOut: LogOutRequest
    }
)(NotificationsBar);