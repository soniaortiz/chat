import * as React from 'react';
import { Dialog, FlatButton, TextField, Divider } from 'material-ui';
import { connect } from 'react-redux';
import { OpenModalWindowAction } from '../../../store/chatGroup';

interface GroupProps {

}
class CreateChatGroup extends React.Component<ChatGroupProps> {

    closeWindow = () => {
        this.props.closeWindow();
    }
    render() {
        return (
            <Dialog open={this.props.openModal} >

                <label> {this.props.messages.search} </label>
                <input type="text" />

                <Divider />

                <label> {this.props.messages.name} </label>
                <TextField />

                <Divider />

                <FlatButton label={this.props.messages.close} onClick={this.closeWindow} />

                <FlatButton label={this.props.messages.create} />

            </Dialog>
        );
    }
}

type ChatGroupProps = GroupM2P & GroupD2P & GroupProps;

interface GroupM2P {
    openModal: boolean;
    messages: any;
}

interface GroupD2P {
    closeWindow: Function;
}

export default connect<GroupM2P, GroupD2P, {}, AppStore.Store>(
    (store) => ({
        openModal: store.app.conversationGroupModWin,
        messages: store.intlReducer.messages
    }),
    {
        closeWindow: OpenModalWindowAction
    }
)(CreateChatGroup);