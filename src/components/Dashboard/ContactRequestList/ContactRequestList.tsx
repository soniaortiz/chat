import * as React from 'react';
import { connect } from 'react-redux';
import { MenuItem, FlatButton } from 'material-ui';

interface ContactRequestListProps {
}

export class ContactRequestList extends React.Component<ContactRequestListProps & MapStateToProps> {
    render() {
        return (
            <React.Fragment>
                {this.props.requestList.map((user, index) => (
                    <MenuItem key={user} id={index.toString()}>
                        {user}
                        <FlatButton label={'Acept'}/>
                        <FlatButton label={'Reject'}/>
                    </MenuItem>
                ))}
            </React.Fragment>
        );
    }
}

interface MapStateToProps {
    requestList: string[];
}
export default connect<MapStateToProps, {}, {}, AppStore.store>(
    (store) => ({
        requestList: store.user.friendRequests
    }),
    {

    }
)(ContactRequestList);