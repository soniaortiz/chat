import * as React from 'react';
import SocialPerson from 'material-ui/svg-icons/social/person';
import NotificationSms from 'material-ui/svg-icons/notification/sms';

import {
    Tabs, Tab
} from 'material-ui';
import Contacts from '../Contacts/Contacts';
import Conversations from '../Conversations/conversations';
import { connect } from 'react-redux';

export class ContactsConversations extends React.Component<ContactsConversationsMS2P> {

    render() {
        return (
            <Tabs >
                <Tab
                    label={this.props.messages.conversations}
                    icon={<NotificationSms />}
                >
                    <Conversations />
                </Tab>
                <Tab
                    label={this.props.messages.contacts}
                    icon={<SocialPerson />}
                >
                    <Contacts />
                </Tab>
            </Tabs>
        );
    }
}

interface ContactsConversationsMS2P {
    lan: string;
    messages: any;
}

export default connect<ContactsConversationsMS2P, {}, {}, AppStore.Store>(
    (store) => (
        {
            lan: store.intlReducer.locale,
            messages: store.intlReducer.messages
        }
    )
)(ContactsConversations);