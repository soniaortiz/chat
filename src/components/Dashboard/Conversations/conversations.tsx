import * as React from 'react';
import { connect } from 'react-redux';
import { MenuItem } from 'material-ui';
// import { Conversation } from '../../Conversation/Conversation';
import { SetConversationWindow } from '../../../store/appSetConversationModalWindow';
interface ConversationsProps {
}

export class Conversations extends React.Component<ConversationWindowProps> {

    openConversation = () => {
        console.log('Display conversation');
        this.props.dispatchConversation();
    }
    render() {
        return (
            // this.props.conversationSelected ?
            //     <Conversation /> :
                <React.Fragment>
                    {this.props.conversationsList ?
                        this.props.conversationsList.map((element, index) => (
                            <MenuItem
                                key={index}
                                onClick={this.openConversation}
                            >
                                {element}
                            </MenuItem>
                        )) : {}
                    }
                </ React.Fragment>
        );
    }
}

interface ConversationsMapStateToProps {
    conversationsList: Array<Conversation>;
    conversationSelected: boolean;
}

interface ConversationMapDispatchToProps {
    dispatchConversation: () => void;
}

type ConversationWindowProps = ConversationsMapStateToProps & ConversationMapDispatchToProps & ConversationsProps;

export default connect<ConversationsMapStateToProps, ConversationMapDispatchToProps, ConversationsProps, AppStore.Store>(
    (store) => ({
        conversationsList: store.user.conversations,
        conversationSelected: store.app.conversationSelected
    }),
    {
        dispatchConversation: SetConversationWindow
    }
)(Conversations) as React.ComponentClass;