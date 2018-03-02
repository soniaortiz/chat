import * as React from 'react';
import { Dialog, FlatButton, Paper, } from 'material-ui';
import { connect, DispatchProp } from 'react-redux';
import { SendContactRequest } from '../../../store/userActionSendContactRequest';
import SocialPersonAdd from 'material-ui/svg-icons/social/person-add';
import { nspUser } from '../../../socketsClient';
interface ContactRequestProps extends DispatchProp<AppStore.User> {
    user: UserContact; // AppStore.user;
    onCloseDialog: () => void;
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
        // console.log('send request to user ', this.props.user.email);
        this.props.sendfriendrequest(this.props.emailSender, this.props.user.email);
        nspUser.emit('send contact request', { user: this.props.user.email });
        this.setState({ open: false });
    }

    render() {
        return (
            <Dialog open={this.state.open}>
                <Paper >
                    user email: {this.props.user.email}

                </Paper>
                <FlatButton
                    onClick={this.handleContactRequest}
                    icon={
                        <SocialPersonAdd color={'blue'} />
                    }
                    label={'send request'}
                />
                <FlatButton
                    onClick={this.handleClose}
                    label={'close'}
                />
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