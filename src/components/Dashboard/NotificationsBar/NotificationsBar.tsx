import * as React from 'react';
import { Tabs, Tab } from 'material-ui';
import NotificationSms from 'material-ui/svg-icons/notification/sms';
import SocialPerson from 'material-ui/svg-icons/social/person';

export class NotificationsBar extends React.Component {
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
                        <SocialPerson/>
                    }
                >

                </Tab>

            </Tabs>
        );
    }
}