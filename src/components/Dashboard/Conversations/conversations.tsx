import * as React from 'react';
import { connect } from 'react-redux';

interface ConversationsProps {
}

export class Conversations extends React.Component<ConversationsProps & ConversationsMapStateToProps> {

    render() {
        return <React.Fragment>
            {this.props.conversationsList ?
                this.props.conversationsList.map((element) => (
                    <li key={Math.random() + 100}>
                        {element}
                    </li>
                )) : {}
            }}
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