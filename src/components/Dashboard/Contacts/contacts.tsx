import * as React from 'react';
import { connect } from 'react-redux';
import { MenuItem } from 'material-ui';

interface ContactsProps {

}

export class Contacts extends React.Component<ContactsProps & ContactsMapStateToProps & ContactsMapDispatchToProps> {
    render() {
        console.log(this.props.contactsList);
        return (
            <React.Fragment>
                {this.props.contactsList.map((contact, index) => (
                    <MenuItem key={index}>
                        {contact.name}
                    </MenuItem>)
                )}
            </React.Fragment>
        );
    }
}

interface ContactsMapStateToProps {
    contactsList: Array<Contact>;
}
interface ContactsMapDispatchToProps {
    // getContacts: () => void
}

export default connect<ContactsMapStateToProps, ContactsMapDispatchToProps, ContactsProps, AppStore.Store>(
    (store) => ({
        contactsList: store.user.contactList
    }),
    {
        // getContacts: RequestContacts
    }
)(Contacts);