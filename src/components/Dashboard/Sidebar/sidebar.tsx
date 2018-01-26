import * as React from 'react';
import Me from '../UserInfo/userInfo';
import {Contacts} from '../Contacts/contacts';
import {
    Table, TableRowColumn, 
    TableHeader, TableBody, 
    TableRow, FlatButton } from 'material-ui';
import { SearchFriend } from '../SearchFriend/searchFriend';

export class Sidebar extends React.Component<SidebarProps, SidebarState>{

    constructor(props: SidebarProps){
        super(props)
    }

    render(){
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
                        <SearchFriend/>
                    </TableRow>
                    <TableRow>
                        <TableRowColumn>
                            <FlatButton>Contacts</FlatButton>
                            <FlatButton> Conversations </FlatButton>
                        </TableRowColumn>
                    </TableRow>

                    <TableRow>
                        <TableRowColumn>
                            <Contacts />
                        </TableRowColumn>
                    </TableRow>

                </TableBody>

            </Table>

        );
    }
}