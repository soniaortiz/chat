import * as React from 'react';
import { Paper, Toolbar, IconMenu, ToolbarGroup, FlatButton } from 'material-ui';
import NotificationSms from 'material-ui/svg-icons/notification/sms';
// import SocialPerson from 'material-ui/svg-icons/social/person';
import SocialPeople from 'material-ui/svg-icons/social/people';
import { connect } from 'react-redux';
import ContactRequestList from '../ContactRequestList/ContactRequestList';

const styleToolBar = {
    color: 'red',
    width: '65%'
};

interface NotificationsBarProps extends MapDispatchToProps, MapStateToProps, OwnProps {
}

interface NotificationsBarState {
    displayRequestsList: boolean;
}
export class NotificationsBar extends React.Component<NotificationsBarProps, NotificationsBarState> {

    constructor(props: NotificationsBarProps) {
        super(props);
        this.state = { displayRequestsList: false };
    }
    displayRequests = () => {
        console.log(this.props.userContactRequests);
        this.setState({ displayRequestsList: !this.state.displayRequestsList });
    }
    render() {
        return (
            <Paper>
                <Toolbar>
                    <ToolbarGroup style={styleToolBar}
                    >
                        Welcome 
                    </ToolbarGroup>
                    <ToolbarGroup >
                        {this.props.userContactRequests.length}
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
                    {this.props.userContactRequests.length}
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
                        <FlatButton label={'Logout'} />
                    </ToolbarGroup>

                </Toolbar>

            </Paper >
        );
    }
}

interface MapDispatchToProps {
    // getNumberOfRequests: () => number;
}

interface MapStateToProps {
    userContactRequests: string[];

}

interface OwnProps {

}

export default connect<MapStateToProps, MapDispatchToProps, OwnProps, AppStore.store>(
    (store) => ({
        // userMessages: store
        userContactRequests: store.user.friendRequests
    }),
    {

    }
)(NotificationsBar);