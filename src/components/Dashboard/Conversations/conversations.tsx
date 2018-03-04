import * as React from 'react';
import { connect } from 'react-redux';
import { MenuItem } from 'material-ui';
import { SetConversationWindow } from '../../../store/appSetConversationModalWindow';
import { RequestConversations } from '../../../store/conversationsActions';
interface ConversationsProps {
}

export class Conversations extends React.Component<ConversationWindowProps> {

    componentWillMount() {
        this.props.setConversations();
        console.log('the conversations', this.props.conversationsList);
    }

    openConversation = (Conversation: any) => () => {
        console.log('Display conversation');
        this.props.conversationSelected ? false :
            this.props.dispatchConversation(Conversation._id);
    }
    render() {
        console.log(this.props.conversationsList);
        return (
            <React.Fragment>
                {
                    this.props.conversationsList ?
                        this.props.conversationsList.map((element, index) => (
                            <MenuItem
                                key={index}
                                onClick={this.openConversation(element)}
                            >
                                {
                                    element.conversationName ?
                                        element.conversationName :
                                        (
                                            element.participants.find((participant) =>
                                                participant.email != this.props.myEmail
                                            )!.name
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
    dispatchConversation: (conversationId: string) => void;
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
        setConversations: RequestConversations
    }
)(Conversations);