import * as React from 'react';
import {
    // Paper, 
    TextField,
    FlatButton,
    RaisedButton,
    CardHeader,
    Card,
    CardMedia
} from 'material-ui';
import { connect } from 'react-redux';
import { UpdateConversationStatus } from '../../store/conversationAction';
import { SendMessage } from '../../store/sendMessageAction';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import MessagesList from '../Messages/MessagesList';

interface ConversationSate {
    message: string;
}

export class Conversation extends React.Component<ConversationPropsMix, ConversationSate> {
    constructor(props: ConversationPropsMix) {
        super(props);
        this.state = { message: '' };
    }
    closeConversation = () => {
        // console.log('close conversation');
        this.props.SetConversationStateOpen();
    }

    sendMessage = () => {
        // console.log(this.state.message);
        this.props.SendMessage({ messageContent: this.state.message, conversation_id: this.props.conversationId });
    }

    handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        // event.persist();
        this.setState(() => ({ message: target.value }));
    }
    render() {
        return (
            <Card
                style={
                    { height: '100%' }
                }
            >
                <CardHeader
                    title={'Conversation name'}
                    style={
                        {
                            width: '80%'
                        }
                    }
                >
                    <FlatButton
                        icon={<NavigationClose />}
                        labelPosition={'before'}
                        label={'Close'}
                        onClick={this.closeConversation}
                        className={'ConvName'}
                    />
                </CardHeader>

                <CardMedia >
                    <img src="./conversation_background.jpg" alt="" />
                    <MessagesList />
                </CardMedia>

                <TextField
                    onChange={this.handleChange}
                    style={{
                        width: '85%'
                    }}
                />

                <RaisedButton
                    label={'Send'}
                    onClick={this.sendMessage}
                />
            </Card>
        );
    }
}

interface ConversationMapDispatchToProps {
    SetConversationStateOpen: () => void;
    SendMessage: (data: { messageContent: string, conversation_id: string }) => void;
}

interface ConversationMapToProps {
    conversationId: string;
    messagesList: any;
    // conversationName: string
}
type ConversationPropsMix = ConversationMapDispatchToProps & ConversationMapToProps;
export default connect<ConversationMapToProps, ConversationMapDispatchToProps, {}, AppStore.Store>(
    (store) => ({
        conversationId: store.app.currentConversation,
        messagesList: store.conversations
    }),
    {
        SetConversationStateOpen: UpdateConversationStatus,
        SendMessage: SendMessage
    }
)(Conversation);