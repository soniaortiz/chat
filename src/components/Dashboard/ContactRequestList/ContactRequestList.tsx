import * as React from 'react';
import { connect } from 'react-redux';
import { MenuItem, FlatButton } from 'material-ui';
import { AceptContactRequest } from '../../../store/userAceptContactRequest';
interface ContactRequestListProps {
}

export class ContactRequestList extends React.Component<ContactRequestListProps & MapStateToProps & MapDispatchToProps> {

    aceptContactRequest = (email: string) => {
        return (event: React.MouseEvent<HTMLButtonElement>) => {
            console.dir(email);
            this.props.aceptContactRequest(email);
        };
    }

    rejectContactRequest = (email: string) => {
        return (event: React.MouseEvent<HTMLButtonElement>) => {
            console.dir(email);

        }

    };

    render() {
        return (
            <React.Fragment>
                {this.props.requestList.map((user, index) => (
                    <MenuItem key={user} id={index.toString()}>
                        {user}
                        <FlatButton label={'Acept'} onClick={this.aceptContactRequest(user)} />
                        <FlatButton label={'Reject'} />
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
    // rejectContactRequest: (contactEmail: string) => void;
}
export default connect<MapStateToProps, MapDispatchToProps, {}, AppStore.store>(
    (store) => ({
        requestList: store.user.friendRequests
    }),
    {
        aceptContactRequest: AceptContactRequest
        // rejectContactRequest: ('fadsfasd')=> {};
    }
)(ContactRequestList);