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
                {/* here is going to map the messages of each conversation */}
                <FlatButton label={'Close'} onClick={this.closeConversation} />
                <TextField />
                <RaisedButton label={'Send'} />
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