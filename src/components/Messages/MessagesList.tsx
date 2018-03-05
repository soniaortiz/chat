import * as React from 'react';
import { MenuItem } from 'material-ui';
import { connect } from 'react-redux';
import { RequestConversationMessagesAction } from '../../store/messageAction';

const style = {
    borderRadius: 10,
    width: '50%',
    textAlign: 'justify',
    border: 'solid 1px',
    textColor: 'darkBlack',
    margin: '10px',
    left: '45%'
};

const innerDivStyle = {
    background: '#4FC3F7',
    textColor: 'black',
};

class MessagesList extends React.Component<MessagesListProps & DispMessagesToProps> {
    componentDidMount() {
        console.log('Retrieve messages');
        console.log('Current conversation: ', this.props.currentConversation);
        this.props.getMessages(this.props.currentConversation);

    }
    render() {
        console.log('conversations: //', this.props.messages);
        return (
            <React.Fragment>
                {
                    this.props.messages.map((message: AppStore.Messages, index: number) => (
                        <MenuItem
                            key={index}
                            style={style}
                            disabled={true}
                            innerDivStyle={innerDivStyle}
                        >
                            {message.messageContent}
                        </MenuItem>
                    ))
                }
            </React.Fragment>
        );
    }
}

type MessagesListProps = MessagesListMSTP;

interface MessagesListMSTP {
    currentConversation: string;
    messages: Array<any>;
}

interface DispMessagesToProps {
    getMessages: (currentConversation: string) => any;
}
export default connect<MessagesListMSTP, DispMessagesToProps, {}, AppStore.Store>(
    (store) => ({
        currentConversation: store.app.currentConversation,
        messages: store.conversations.find((conversation) => {
            return conversation._id === store.app.currentConversation;
        })!.messages
    }),
    {
        getMessages: RequestConversationMessagesAction
    }
)(MessagesList);