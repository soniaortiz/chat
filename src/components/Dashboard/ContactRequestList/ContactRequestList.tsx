import * as React from 'react';
import { connect } from 'react-redux';
import { MenuItem, FlatButton } from 'material-ui';
import { AceptContactRequest } from '../../../store/userAceptContactRequest';
import { RejectContactRequest } from '../../../store/userRejectContactRequest';

// import * as io from 'socket.io-client';
// const socket = io('http://localhost:8000');

interface ContactRequestListProps {
}

export class ContactRequestList extends React.Component
    <ContactRequestListProps&MapStateToProps&MapDispatchToProps> {

    aceptContactRequest = (email: string) => {
        return (event: React.MouseEvent<HTMLButtonElement>) => {
            console.dir(email);
            this.props.aceptContactRequest(email);
        };
    }

    rejectContactRequest = (email: string) => {
        return (event: React.MouseEvent<HTMLButtonElement>) => {
            console.dir(email);
            this.props.rejectContactRequest(email);
        };
    }

    render() {
        return (
            <React.Fragment>
                {this.props.requestList.map((user, index) => (
                    <MenuItem key={user} id={index.toString()}>
                        {user}
                        <FlatButton label={'Acept'} onClick={this.aceptContactRequest(user)} />
                        <FlatButton label={'Reject'} onClick={this.rejectContactRequest(user)} />
                    </MenuItem>
                ))}
            </React.Fragment>
        );
    }
}

interface MapStateToProps {
    requestList: string[];
}

interface MapDispatchToProps {
    aceptContactRequest: (contactEmail: string) => void;
    rejectContactRequest: (contactEmail: string) => void;
}
export default connect<MapStateToProps, MapDispatchToProps, {}, AppStore.store>(
    (store) => ({
        requestList: store.user.friendRequests
    }),
    {
        aceptContactRequest: AceptContactRequest,
        rejectContactRequest: RejectContactRequest
    }
)(ContactRequestList);