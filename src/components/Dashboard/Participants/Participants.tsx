import * as React from 'react';
import { connect } from 'react-redux';
import { MenuItem } from 'material-ui';
// import { setParticipants } from '../../../store/setParticipants';

class Participants extends React.Component<ParticipantsPropTypes> {
    render() {
        return (
            <React.Fragment>
                {this.props.participants.map((user, index) => (
                    <MenuItem key={index} >
                        {user.name}
                    </MenuItem>
                ))}
            </React.Fragment>
        );
    }
}

type ParticipantsPropTypes = ParticipantsMS2P & ParticipantsMD2P;

interface ParticipantsMS2P {
    participants: { name: string, email: string }[];
}

interface ParticipantsMD2P {
    // setParticipants: (user: { name: string, email: string }) => void;
}

export default connect<ParticipantsMS2P, ParticipantsMD2P, {}, AppStore.Store>(
    (store) => ({
        participants: store.app.participants
    }),
    {
        // setParticipants: setParticipants
    }
)(Participants);