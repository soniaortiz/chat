import * as React from 'react';
import { Paper } from 'material-ui';
import './style.css';
import NotificationsBar from '../NotificationsBar/NotificationsBar';
import { Route } from 'react-router';
import { connect } from 'react-redux';
import Conversation from '../../Conversation/Conversation';
interface PanelProps {

}
export class Panel extends React.Component<PanelPropertiesMix> {
    constructor(props: PanelPropertiesMix) {
        super(props);
    }

    render() {
        console.log('this.props', this.props.showConversation);
        return (
            <Paper style={{ position: 'absolute' , width: '70%', height: 'vh 100%', overflow: 'auto'}}>
                <Paper >
                    <Route component={NotificationsBar} />
                </Paper>
                {
                    this.props.showConversation ?
                        <Paper>
                            <Conversation />
                        </Paper> : false
                }
            </Paper>
        );
    }
}

interface PanelMapToProps {
    showConversation: boolean;
}

interface PanelMapDispatchToProps {

}

type PanelPropertiesMix = PanelProps & PanelMapToProps & PanelMapDispatchToProps;
export default connect<PanelMapToProps, PanelMapDispatchToProps, PanelProps, AppStore.Store>(
    (store) => ({
        showConversation: store.app.conversationSelected,
    })
)(Panel);