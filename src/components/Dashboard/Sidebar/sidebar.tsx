import * as React from 'react';
import Me from '../UserInfo/userInfo';
// import Contacts from '../Contacts/contacts';
import './style.css';

import {
    // TableRowColumn,
    // TableRow,
    Paper,
} from 'material-ui';
import { SearchFriend } from '../SearchFriend/searchFriend';
// import Conversations from '../Conversations/conversations';
import { ContactsConversations } from '../ContactsConversations/contacsConversationsViews';

export class Sidebar extends React.Component<SidebarProps, SidebarState> {

    constructor(props: SidebarProps) {
        super(props);
    }

    render() {
        return (
            <Paper>
                <Me />
                <SearchFriend />
                <ContactsConversations />
            </Paper>

        );
    }
}