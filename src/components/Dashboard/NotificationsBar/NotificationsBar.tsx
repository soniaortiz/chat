import * as React from 'react';
import { Tabs, Tab } from 'material-ui';
import NotificationSms from 'material-ui/svg-icons/notification/sms';
import SocialPerson from 'material-ui/svg-icons/social/person';
import { connect } from 'react-redux';

interface NotificationsBarProps {
    // userMessages: any;
    userContactRequest: any;
}

export class NotificationsBar extends React.Component<NotificationsBarProps, {}> {

    displayRequests = () => {
        console.log(this.props.userContactRequest);
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
                    label={'Contact requests'}
                    icon={
                        <SocialPerson />
                    }
                    onActive={this.displayRequests}
                >

                </Tab>

            </Tabs>
        );
    }
}

export default connect<NotificationsBarProps, {}, {}, AppStore.store>(
    (store) => ({
        // userMessages: store
        userContactRequest: store.user.friendRequests
    }),
    {

    }
)(NotificationsBar);