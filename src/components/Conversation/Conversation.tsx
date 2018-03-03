import * as React from 'react';
import { Paper, TextField, FlatButton } from 'material-ui';
import { connect } from 'react-redux';

export class Conversation extends React.Component {
    render() {
        return (
            <Paper>
                <FlatButton label={'Close'} />
                this is going to be the conversation
                <Paper>
                    <TextField />
                    <FlatButton label={'Send'} />
                </Paper>
            </Paper>
        );
    }
}

export default connect<{}, {}, {}, AppStore.Store>(
    (store) => ({

    })
)(Conversation);