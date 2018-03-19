import * as React from 'react';
import {
    // Paper, 
    TextField,
    FlatButton,
    RaisedButton,
    CardHeader,
    Card,
    CardMedia,
    Paper
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
        if (this.state.message) {
            this.props.SendMessage({ messageContent: this.state.message, conversation_id: this.props.conversationId });
        }
    }

    handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        // event.persist();
        this.setState(() => ({ message: target.value }));
    }
    render() {
        return (
            <Paper style={{
                width: '100%'
            }
            }>
                <Card
                    style={
                        {
                            // height: '100%',
                            // position: 'absolute'
                            width: '100%'
                        }
                    }
                >

                    <Paper >
                        <CardHeader
                            title={this.props.conversationName ? this.props.conversationName : ''}
                            style={
                                {
                                    width: '50%',
                                    // position: 'absolute'
                                }
                            }
                        >
                            <FlatButton
                                icon={<NavigationClose />}
                                labelPosition={'before'}
                                label={'Close'}
                                onClick={this.closeConversation}
                                className={'ConvName'}
                                style={
                                    {
                                        position: 'relative',
                                        // width: '15%',
                                        // left: '50%'
                                        rigth: 0
                                    }
                                }
                            />
                        </CardHeader>
                    </Paper>

                    <CardMedia >
                        {/* <img src="./conversation_background.jpg" alt="" /> */}
                        <MessagesList />
                    </CardMedia>

                    <TextField
                        onChange={this.handleChange}
                        required={true}
                        style={{
                            // width: '85%'
                        }}
                    />

                    <RaisedButton
                        label={'Send'}
                        onClick={this.sendMessage}
                        style={{
                            position: 'relative',
                            right: '0'
                        }}
                    />
                </Card>

            </Paper>
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
    conversationName: string
}
type ConversationPropsMix = ConversationMapDispatchToProps & ConversationMapToProps;
export default connect<ConversationMapToProps, ConversationMapDispatchToProps, {}, AppStore.Store>(
    (store) => ({
        conversationId: store.app.currentConversation,
        messagesList: store.conversations,
        conversationName: store.conversations[store.app.currentConversation].conversationName
    }),
    {
        SetConversationStateOpen: UpdateConversationStatus,
        SendMessage: SendMessage
    }
)(Conversation);