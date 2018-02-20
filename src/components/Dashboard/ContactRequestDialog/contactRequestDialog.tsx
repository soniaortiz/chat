import * as React from 'react';
import { Dialog, FlatButton, } from 'material-ui';
import { connect, DispatchProp } from 'react-redux';
// import request from 'axios';
import { SendContactRequest } from '../../../store/userActionSendContactRequest';

interface ContactRequestProps extends DispatchProp<AppStore.user> {
    user: UserContact; // AppStore.user;
    onCloseDialog: () => void;
    // sendfriendrequest(email: string, emailContact: string): Promise<boolean>;
}

interface ContactRequestState {
    open: boolean;
}

export class ContactRequestDialog extends React.Component<connectedComponentProps, ContactRequestState> {
    constructor(props: connectedComponentProps) {
        super(props);
        this.state = { open: true };
        console.log('email in modal', this.props.user);
    }

    handleClose = () => {
        this.setState({ open: false });
        this.props.onCloseDialog();
    }

    handleContactRequest = () => {
        console.log('send request to user ', this.props.user.email);
        this.props.sendfriendrequest(this.props.emailSender, this.props.user.email);
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

type mapToProps = {
    emailSender: string
};

type dispatchToProps = {
    sendfriendrequest(email: string, emailContact: string): void;
};

type connectedComponentProps = mapToProps & dispatchToProps & ContactRequestProps;

export default connect<mapToProps, dispatchToProps, ContactRequestProps, AppStore.store>(
    (store) => ({
        emailSender: store.user.email
    }),
    {
        sendfriendrequest: SendContactRequest
    }
)(ContactRequestDialog);