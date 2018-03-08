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
        // console.log('the conversations', this.props.conversationsList);
    }

    openConversation = (Conversation: string) => () => {
        // console.log('conversation: ', Conversation);
        // this.props.conversationSelected ? false :
        //     this.props.dispatchConversation(Conversation);

        if (this.props.currentConversation !== Conversation) {
            this.props.dispatchConversation(Conversation);
        } else {
            console.log('going to the else');
        }

    }
    render() {
        // console.log(this.props.conversationsList);        
        return (
            <React.Fragment>
                {/* {console.log(this.props.conversationsList)} */}
                {
                    this.props.conversationsList ?
                        Object.keys(this.props.conversationsList)
                            .map((element, index) => (
                                <MenuItem
                                    key={index}
                                    onClick={this.openConversation(element)}
                                >
                                    {
                                        // this.props.conversationsList[element].conversationName ?
                                        //     this.props.conversationsList[element].conversationName :
                                        //     this.props.conversationsList[element].participants.filter(
                                        //         (participant) => {
                                        //             return participant.email != this.props.myEmail;
                                        //         })[0].name
                                        element

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
    currentConversation: string;
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
            myEmail: store.user.email,
            currentConversation: store.app.currentConversation
        }),
        {
            dispatchConversation: SetConversationWindow, // to open the conversation once it is selected
            setConversations: RequestConversations
        }
    )(Conversations);