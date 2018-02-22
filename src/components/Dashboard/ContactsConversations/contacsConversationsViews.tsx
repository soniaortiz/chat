import * as React from 'react';
import SocialPerson from 'material-ui/svg-icons/social/person';
import NotificationSms from 'material-ui/svg-icons/notification/sms';

import {
     Tabs, Tab
} from 'material-ui';
// import { Contacts } from '../Contacts/contacts';

export class ContactsConversations extends React.Component {

    render() {
        return (
                <Tabs >
                    <Tab 
                        label="Conversations"
                        icon={<NotificationSms />}
                    >
                       
                    </Tab>
                    <Tab 
                        label="Contacts" 
                        icon={<SocialPerson/>}
                    >
                    </Tab>
                </Tabs>
        );
    }
}