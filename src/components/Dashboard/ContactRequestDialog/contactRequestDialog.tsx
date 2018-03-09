import * as React from 'react';
import { Dialog, FlatButton, Paper, } from 'material-ui';
import { connect, DispatchProp } from 'react-redux';
import { SendContactRequest } from '../../../store/userActionSendContactRequest';
import SocialPersonAdd from 'material-ui/svg-icons/social/person-add';
import { nspUser } from '../../../socketsClient';
import { setModalWindowAction } from '../../../store/appActionRequestWindow';

interface ContactRequestProps extends DispatchProp<AppStore.User> { // own props
    user: UserContact;
    onCloseDialog: () => void;
}

interface ContactRequestState {
    open: boolean;
}

export class ContactRequestDialog extends React.Component<connectedComponentProps, ContactRequestState> {
    constructor(props: connectedComponentProps) {
        super(props);
        this.state = { open: true };
        this.props.setModalRequestWindow(); // set to true
        // console.log('email in modal', this.props.user);
    }

    handleClose = () => {
        // this.setState({ open: false });
        this.props.onCloseDialog();
        this.props.setModalRequestWindow(); // set to false
    }

    handleContactRequest = () => {

        //  console.log('users emails', this.props.emailSender, this.props.user.email); // sender receiver
        this.props.sendfriendrequest(this.props.emailSender, this.props.user.email);
        nspUser.emit('send contact request', { user: this.props.user.email });
        // this.setState({ open: false });
        this.props.setModalRequestWindow(); // set to false        
    }

    render() {
        return (
            <Dialog open={this.props.requestWindowOpened}>
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
    emailSender: string,
    requestWindowOpened: boolean
};

type dispatchToProps = {
    sendfriendrequest(email: string, emailContact: string): void;
    setModalRequestWindow(): void;
};

type connectedComponentProps = mapToProps & dispatchToProps & ContactRequestProps;

export default connect<mapToProps, dispatchToProps, ContactRequestProps, AppStore.Store>(
    (store) => ({
        emailSender: store.user.email,
        requestWindowOpened: store.app.requestWindowOpened
    }),
    {
        sendfriendrequest: SendContactRequest,
        setModalRequestWindow: setModalWindowAction
    }
)(ContactRequestDialog);