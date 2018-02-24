import * as React from 'react';
import Me from '../UserInfo/userInfo';
import './style.css';

import { Paper } from 'material-ui';
import { SearchFriend } from '../SearchFriend/searchFriend';
import { ContactsConversations } from '../ContactsConversations/contacsConversationsViews';

export default class Sidebar extends React.Component<SidebarProps, SidebarState> {

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
