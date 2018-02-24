import * as React from 'react';
import SocialPerson from 'material-ui/svg-icons/social/person';
import NotificationSms from 'material-ui/svg-icons/notification/sms';

import {
     Tabs, Tab
} from 'material-ui';
import  Contacts  from '../Contacts/Contacts';
import Conversations from '../Conversations/conversations';

export class ContactsConversations extends React.Component {

    render() {
        return (
                <Tabs >
                    <Tab 
                        label="Conversations"
                        icon={<NotificationSms />}
                    >
                       <Conversations/>
                    </Tab>
                    <Tab 
                        label="Contacts" 
                        icon={<SocialPerson/>}
                    >
                    <Contacts/>
                    </Tab>
                </Tabs>
        );
    }
}