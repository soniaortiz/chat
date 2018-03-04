import * as React from 'react';
import { connect } from 'react-redux';
import { MenuItem } from 'material-ui';
import { SetConversationWindow } from '../../../store/appSetConversationModalWindow';
import { RequestConversations } from '../../../store/conversationsActions';
interface ConversationsProps {
}

export class Conversations extends React.Component<ConversationWindowProps> {

    componentDidUpdate() {
        console.log(this.props.conversationsList);
    }

    componentWillMount() {
        // will request the conversations 
        this.props.setConversations();
        console.log('the conversations', this.props.conversationsList);
    }

    openConversation = () => {
        console.log('Display conversation');
        this.props.conversationSelected ? false :
            this.props.dispatchConversation();
    }
    render() {
        return (
            <React.Fragment>
                {
                    this.props.conversationsList ?
                        this.props.conversationsList.map((element, index) => (
                            <MenuItem
                                key={index}
                                onClick={this.openConversation}
                            >
                                {
                                    element.conversationName ?
                                        element.conversationName :
                                        (
                                            element.participants.filter((participant) =>
                                                participant.email != this.props.myEmail
                                            )[0].name
                                    )
                                }
                            </MenuItem>
                        )) : []
                }
            </ React.Fragment>
        );
    }
}

interface ConversationsMapStateToProps {
    conversationsList: Array<Conversation>;
    conversationSelected: boolean;
    myEmail: string;
}

interface ConversationMapDispatchToProps {
    dispatchConversation: () => void;
    setConversations: () => void;
}

type ConversationWindowProps = ConversationsMapStateToProps & ConversationMapDispatchToProps & ConversationsProps;

export default connect<ConversationsMapStateToProps, ConversationMapDispatchToProps, ConversationsProps, AppStore.Store>(
    (store) => ({
        conversationsList: store.conversations, //.user.conversations,
        conversationSelected: store.app.conversationSelected,
        myEmail: store.user.email
    }),
    {
        dispatchConversation: SetConversationWindow, // to open the conversation once it is selected
        // dispatch to set the conversations in the 
        setConversations: RequestConversations
    }
)(Conversations);