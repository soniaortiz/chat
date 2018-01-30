import * as React from 'react';
import Me from '../UserInfo/userInfo';
// import Contacts from '../Contacts/contacts';
import {
    Table, TableRowColumn,
    TableHeader, TableBody,
    TableRow, 
} from 'material-ui';
// import { SearchFriend } from '../SearchFriend/searchFriend';
// import Conversations from '../Conversations/conversations';
import { ContactsConversations } from '../ContactsConversations/contacsConversationsViews';

export class Sidebar extends React.Component<SidebarProps, SidebarState>{

    constructor(props: SidebarProps) {
        super(props)
    }

    render() {
        return (
            <Table>
                <TableHeader>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                    <TableRow>
                        <TableRowColumn>
                            <Me />
                        </TableRowColumn>
                    </TableRow>
                    <TableRow>
                        {/* <SearchFriend/> */}
                    </TableRow>
                    <TableRow>
                        <ContactsConversations/>
                    </TableRow>
                </TableBody>

            </Table>

        );
    }
}