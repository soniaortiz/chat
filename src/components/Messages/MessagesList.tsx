import * as React from 'react';
import { MenuItem } from 'material-ui';
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
        // console.log('Retrieve messages');
        this.props.getMessages(this.props.currentConversation);
    }
    render() {
        return (
            <React.Fragment>
                {/* {console.log('The list', this.props.getStoreMessages())} */}
                {
                    this.props.messages.map((message: AppStore.Messages, index: number) => (
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
                            {message.sender && message.messageContent}
                        </MenuItem>
                    ))
                }
            </React.Fragment>
        );
    }
}

interface MessageListOwnProps {
    // list: any
}
type MessagesListProps = MessagesListMSTP;

interface MessagesListMSTP {
    currentConversation: string;
    messages: Array<any>;
    myEmail: string;
    // getStoreMessages: Function;
}

interface DispMessagesToProps {
    getMessages: (currentConversation: string) => any;
}
export default connect<MessagesListMSTP, DispMessagesToProps, {}, AppStore.Store>(
    (store) => ({
        currentConversation: store.app.currentConversation,
        messages: store.conversations.currentConversation.messages,
        myEmail: store.user.email
    }),
    {
        getMessages: RequestConversationMessagesAction
    }
)(MessagesList);