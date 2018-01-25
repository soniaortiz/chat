import * as React from 'react';
import Me from '../UserInfo/userInfo';
import {
    Table, TableRowColumn, 
    TableHeader, TableBody, 
    TableRow, FlatButton } from 'material-ui';
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
                        <div>
                            search box
                        </div>
                    </TableRow>
                    <TableRow>
                        <TableRowColumn>
                            <FlatButton>Contacts</FlatButton>
                        </TableRowColumn>
                        <TableRowColumn>
                            <FlatButton> Conversations </FlatButton>
                        </TableRowColumn>
                    </TableRow>

                    <TableRow>
                        <TableRowColumn>
                            <p>list contacts/chats</p>
                        </TableRowColumn>
                    </TableRow>

                </TableBody>

            </Table>


            // <div className="sidebar"> 
            //     <Me />
            // </div>
        )
    }
}