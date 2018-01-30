import * as React from 'react';
import { connect, DispatchProp } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { TableRowColumn } from 'material-ui';
import {RequestContacts} from '../../../store/contactsActions';


interface ContactsProps extends DispatchProp<{}>, RouteComponentProps<{}> {
    contactsList: AppStore.contacts,
    getContacts: () => Promise<boolean>,
    contacts: AppStore.contacts

}

export class Contacts extends React.Component<ContactsProps> {
    componentDidMount() {
        console.log("Contacs executed");
        // console.log(this.props.contactsList);
        this.props.getContacts()
        .then((response)=>console.log(response));
    }
    render() {
        return (
            <TableRowColumn>
                {
                    <ul id="Contacts">
                        {
                            this.props.contactsList ?
                                this.props.contactsList.map((element) => (
                                    <li key={element.contact_id + Math.random() + 100}>
                                        {element.contactName}
                                    </li>
                                )) : <li></li>
                        }
                    </ul>
                }

            </TableRowColumn>
        );
    }
}

export default connect<{}, {}, ContactsProps, AppStore.store>(
    (store) => ({
        contactsList: store.contacts
    }),
    {
        getContacts: RequestContacts
    }
)(Contacts) as React.ComponentClass;