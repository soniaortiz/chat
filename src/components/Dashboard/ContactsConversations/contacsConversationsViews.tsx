import * as React from 'react';

import {
     Tabs, Tab
} from 'material-ui';
// import { Contacts } from '../Contacts/contacts';

export class ContactsConversations extends React.Component{

    render() {
        return (
                <Tabs >
                    <Tab label="Conversations">
                       
                    </Tab>
                    <Tab label="Contacts" >
                    </Tab>
                </Tabs>
        );
    }
}