import * as React from 'react';
import { connect } from 'react-redux';
import { MenuItem } from 'material-ui';

interface ConversationsProps {
}

export class Conversations extends React.Component<ConversationsProps & ConversationsMapStateToProps> {

    openConversation = () => {
        console.log('Display conversation');
    }
    render() {
        return <React.Fragment>
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
        </ React.Fragment>;

    }
}

interface ConversationsMapStateToProps {
    conversationsList: Array<conversation>;
}

export default connect<ConversationsMapStateToProps, {}, ConversationsProps, AppStore.store>(
    (store) => ({
        conversationsList: store.user.conversations
    }),
    {
        //  getConversations: RequestConversations
    }
)(Conversations) as React.ComponentClass;