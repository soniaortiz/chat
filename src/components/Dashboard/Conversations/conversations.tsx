import * as React from 'react';
import { connect } from 'react-redux';
import { MenuItem } from 'material-ui';
import { SetConversationWindow } from '../../../store/appSetConversationModalWindow';
import { RequestConversations } from '../../../store/conversationsActions';
interface ConversationsProps {
}

export class Conversations extends React.Component<ConversationWindowProps> {

    componentDidMount() {
        this.props.setConversations();
        console.log('the conversations', this.props.conversationsList);
    }

    openConversation = (Conversation: string) => () => {
        console.log('conversation: ', Conversation);
        this.props.conversationSelected ? false :
            this.props.dispatchConversation(Conversation);
    }
    render() {
        console.log(this.props.conversationsList);        
        return (
            <React.Fragment>
                {console.log(this.props.conversationsList)}
                {
                    this.props.conversationsList ?
                        Object.keys(this.props.conversationsList)
                        .map((element, index) => (
                            <MenuItem
                                key={index}
                                onClick={this.openConversation(element)}
                            >
                                {
                                    // element.conversationName ?
                                    //     element.conversationName :
                                    //     (
                                    //         element.participants.filter((participant) => {
                                    //             // console.log(participant.email, this.props.myEmail)
                                    //             return participant.email != this.props.myEmail;
                                    //         }
                                    //         )[0].name
                                    //     )
                                    // this.props.conversationsList.element
                                    this.props.conversationsList[element].conversationName
                                }
                            </MenuItem>
                        )) : []
                }
            </ React.Fragment>
        );
    }
}

interface ConversationsMapStateToProps {
    conversationsList: AppStore.Conversations;
    conversationSelected: boolean;
    myEmail: string;
}

interface ConversationMapDispatchToProps {
    dispatchConversation: (conversationId: string) => void;
    setConversations: () => void;
}

type ConversationWindowProps = ConversationsMapStateToProps & ConversationMapDispatchToProps & ConversationsProps;

export default 
connect<ConversationsMapStateToProps, ConversationMapDispatchToProps, ConversationsProps, AppStore.Store>(
    (store) => ({
        conversationsList: store.conversations,
        conversationSelected: store.app.conversationSelected,
        myEmail: store.user.email
    }),
    {
        dispatchConversation: SetConversationWindow, // to open the conversation once it is selected
        setConversations: RequestConversations
    }
)(Conversations);