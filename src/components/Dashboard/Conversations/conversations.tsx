import * as React from 'react';
import { connect, DispatchProp } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { TableRowColumn } from 'material-ui';
import { RequestConversations } from '../../../store/conversationsActions';

interface ConversationsProps extends RouteComponentProps<{}>, DispatchProp<{}> {
    conversationsList: AppStore.conversations,
    getConversations: () => Promise<boolean>,
}

export class Conversations extends React.Component<ConversationsProps> {

    componentDidMount() {
        console.log("Conversations executed ");
        this.props.getConversations()
            .then((response) => console.log(response));
    }
    render() {
        return (<TableRowColumn>
               {
                <ul id="Contacts">
                    {
                        this.props.conversationsList ?
                            this.props.conversationsList.map((element) => (
                                <li key={Math.random() + 100}>
                                    {element}
                                </li>
                            )) : <li>j</li>
                    }
                </ul>
            }        </TableRowColumn>
        );
    }
}

export default connect<{}, {}, ConversationsProps, AppStore.store>(
    (store) => ({
        conversationsList: store.conversations
    }),
    {
        getConversations: RequestConversations
    }
)(Conversations) as React.ComponentClass;