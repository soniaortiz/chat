import * as React from 'react';
import { Tabs, Tab } from 'material-ui';
import NotificationSms from 'material-ui/svg-icons/notification/sms';
import SocialPerson from 'material-ui/svg-icons/social/person';
import { connect } from 'react-redux';

interface NotificationsBarProps extends MapDispatchToProps, MapStateToProps, OwnProps {
    // getNumberOfRequests: () => number;
}

export class NotificationsBar extends React.Component<NotificationsBarProps, {}> {

    displayRequests = () => {
        console.log(this.props.userContactRequests);
    }
    render() {
        return (
            <Tabs>
                <Tab
                    icon={
                        <NotificationSms
                            hoverColor="red"
                        />
                    }
                    label={'Messages'}
                />
                <Tab />

                <Tab
                    label={'Contact requests ' + this.props.userContactRequests.length}
                    icon={
                        <SocialPerson
                        />
                    }
                    onActive={this.displayRequests}
                >
                </Tab>

            </Tabs>
        );
    }
}

interface MapDispatchToProps {
    // getNumberOfRequests: () => number;
}

interface MapStateToProps {
    userContactRequests: any;

}

interface OwnProps {

}

export default connect< MapStateToProps, MapDispatchToProps , OwnProps, AppStore.store>(
    (store) => ({
        // userMessages: store
        userContactRequests: store.user.friendRequests
    }),
    {
    
    }
)(NotificationsBar);