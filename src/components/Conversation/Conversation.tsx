import * as React from 'react';
import { Paper, TextField, FlatButton, RaisedButton } from 'material-ui';
import { connect } from 'react-redux';
import { UpdateConversationStatus } from '../../store/conversationAction';

const style = {
    background: 'fuchsia'
};

export class Conversation extends React.Component<ConversationPropsMix> {
    closeConversation = () => {
        console.log('close conversation');
        this.props.SetConversationStateOpen();
    }
    render() {

        return (
            <Paper style={style}>
                <Paper >
                    <FlatButton label={'Close'} onClick={this.closeConversation} />
                    this is going to be the conversation list conversations
                <Paper>
                        <TextField />
                        <RaisedButton label={'Send'} />
                    </Paper>
                </Paper>

            </Paper>
        );
    }
}

interface ConversationMapDispatchToProps {
    SetConversationStateOpen: () => void;
}

type ConversationPropsMix = ConversationMapDispatchToProps;
export default connect<{}, ConversationMapDispatchToProps, {}, AppStore.Store>(
    (store) => ({

    }),
    {
        SetConversationStateOpen: UpdateConversationStatus
    }
)(Conversation);