import * as React from 'react';
import { Dialog, FlatButton, } from 'material-ui';
// import request from 'axios';

interface ContactRequestState {
    open: boolean;
}

interface ContactRequestProps {
    user: any;
    onCloseDialog: () => void;
    // sendfriendrequest(email: string, emailContact: string): Promise<boolean>;

}
export class ContactRequestDialog extends React.Component<ContactRequestProps, ContactRequestState> {
    constructor(props: ContactRequestProps) {
        super(props);
        this.state = { open: true };
        console.log('email in modal', this.props.user.email);
    }

    handleClose = () => {
        this.setState({ open: false });
        this.props.onCloseDialog();
    }

    handleContactRequest = () => {
        console.log('send request to user ');
        // request.post('/sendfriendrequest')
        //     .then(() => {
        //         this.props.onCloseDialog();
        //         this.setState({ open: false });
        //     });
        // this.props.sendfriendrequest(email, this.props.user.email);
    }

    render() {
        return (
            <Dialog open={this.state.open}>
                <div>
                    user email: {this.props.user.email}
                </div>
                <FlatButton onClick={this.handleContactRequest}>
                    send request
                </FlatButton>

                <FlatButton onClick={this.handleClose}>
                    close
                </FlatButton>

            </Dialog>
        );
    }
}