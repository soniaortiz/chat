import * as React from 'react';
import { MenuItem, CircularProgress } from 'material-ui';
import { connect } from 'react-redux';
import { RequestConversationMessagesAction } from '../../store/messageAction';
// import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';

const style: React.CSSProperties = {
    borderRadius: 10,
    width: '50%',
    textAlign: 'justify',
    border: 'solid 1px',
    color: 'white',
    margin: '10px',
    left: '45%',
    position: 'relative'
};

const innerDivStyle = {
    background: '#4FC3F7',
    textColor: 'black',
};

class MessagesList extends React.Component<MessagesListProps & DispMessagesToProps & MessageListOwnProps> {
    componentDidMount() {
        // console.log('Retrieve messages/*-', this.props.currentConversation);
        this.props.getMessages(this.props.currentConversation);
        console.log(this.props.messages);
    }
    render() {
        return (
            this.props.messages ?
                <React.Fragment>
                    {
                        this.props.messages
                        [this.props.currentConversation].
                            messages.map((message: AppStore.Messages, index: number) => (
                                <MenuItem
                                    key={index}
                                    style={{
                                        ...style,
                                        left: message.sender && (message.sender.email === this.props.myEmail) ?
                                            '48%' : 0
                                    }}
                                    disabled={true}
                                    innerDivStyle={innerDivStyle}
                                >
                                    <div>
                                        {/* <span>{message.sender}</span> */}
                                        <div>{message.sender && message.messageContent}</div>
                                    </div>
                                </MenuItem>
                            ))
                    }
                </React.Fragment> :
                <CircularProgress size={60} thickness={7} />

        );
    }
}

interface MessageListOwnProps {
    // list: any
}
type MessagesListProps = MessagesListMSTP;

interface MessagesListMSTP {
    currentConversation: string;
    messages: any;
    myEmail: string;
    // getStoreMessages: Function;
}

interface DispMessagesToProps {
    getMessages: (currentConversation: string) => any;
}
export default connect<MessagesListMSTP, DispMessagesToProps, {}, AppStore.Store>(
    (store) => ({
        currentConversation: store.app.currentConversation,
        messages: store.conversations, // will return the conversations with messages
        myEmail: store.user.email
    }),
    {
        getMessages: RequestConversationMessagesAction
    }
)(MessagesList);