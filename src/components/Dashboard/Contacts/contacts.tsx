import * as React from 'react';
import { connect } from 'react-redux';
import { MenuItem } from 'material-ui';
// import { RequestContacts } from '../../../store/contactsActions';

interface ContactsProps {

}

export class Contacts extends React.Component<ContactsProps&ContactsMapStateToProps&ContactsMapDispatchToProps> {
    render() {
        // console.log(this.props.contactsList);
        return (
            <React.Fragment>
                {
                    this.props.contactsList.map((contact, index) => (
                        <MenuItem key={index}>
                            {contact}
                        </MenuItem>
                    ))
                }
            </React.Fragment>
            // <div></div>
        );
    }
}

interface ContactsMapStateToProps {
    contactsList: Array <contact>;
}
interface ContactsMapDispatchToProps {
    // getContacts: () => void
}

export default connect<ContactsMapStateToProps, ContactsMapDispatchToProps, ContactsProps, AppStore.store>(
    (store) => ({
        contactsList: store.user.contactList
    }),
    {
        // getContacts: RequestContacts
    }
)(Contacts);