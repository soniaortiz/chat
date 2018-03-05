import * as React from 'react';
import { Paper, TextField, FlatButton, RaisedButton } from 'material-ui';
import { connect } from 'react-redux';
import { UpdateConversationStatus } from '../../store/conversationAction';
// import { nspConversation } from '../../socketsClient';
import { SendMessage } from '../../store/sendMessageAction';
import MessagesList from '../Messages/MessagesList';
const BtnStyle = {
    align: 'right'
};

interface ConversationSate {
    message: string;
}

export class Conversation extends React.Component<ConversationPropsMix, ConversationSate> {
    constructor(props: ConversationPropsMix) {
        super(props);
        this.state = { message: '' };
    }
    closeConversation = () => {
        console.log('close conversation');
        this.props.SetConversationStateOpen();
    }

    sendMessage = () => {
        console.log(this.state.message);
        this.props.SendMessage({ messageContent: this.state.message, conversation_id: this.props.conversationId })
    }

    handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        // event.persist();
        this.setState(() => ({ message: target.value }));
    }
    render() {
        return (
            <Paper>

                <FlatButton
                    label={'Close'}
                    onClick={this.closeConversation}
                />

                <MessagesList />

                <TextField onChange={this.handleChange} />

                <RaisedButton 
                    label={'Send'} 
                    onClick={this.sendMessage}
                    style={BtnStyle} 
                />
            </Paper>
        );
    }
}

interface ConversationMapDispatchToProps {
    SetConversationStateOpen: () => void;
    SendMessage: (data: { messageContent: string, conversation_id: string }) => void;
}

interface ConversationMapToProps {
    conversationId: string
}
type ConversationPropsMix = ConversationMapDispatchToProps & ConversationMapToProps;
export default connect<ConversationMapToProps, ConversationMapDispatchToProps, {}, AppStore.Store>(
    (store) => ({
        conversationId: store.app.currentConversation
    }),
    {
        SetConversationStateOpen: UpdateConversationStatus,
        SendMessage: SendMessage
    }
)(Conversation);