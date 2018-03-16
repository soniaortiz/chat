import * as React from 'react';
import { Dialog, FlatButton, TextField, Divider, AutoComplete, MenuItem, Paper } from 'material-ui';
import { connect } from 'react-redux';
import { OpenModalWindowAction } from '../../../store/chatGroup';
import { CreateChatGroupAction } from '../../../store/createGroupConversation';

interface GroupConversationState {
    conversationName: string;
    // participants: any,
}
interface GroupProps {
}
class CreateChatGroup extends React.Component<ChatGroupProps, GroupConversationState> {

    enableBtn = true;
    constructor(props: ChatGroupProps) {
        super(props);
        this.state = { conversationName: '' };
    }

    validateName = () => {
        this.enableBtn = false;
    }

    closeWindow = () => {
        this.props.closeWindow();
    }

    createGroupConversation = () => {
        this.props.createChatGroup(this.state.conversationName);
        this.props.closeWindow();
    }

    setConversationName = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
        this.setState(
            { conversationName: value }
        );

        if (value === '') {
            this.enableBtn = true; // disable
        } else {
            this.enableBtn = false;
        }
    }
    render() {
        return (
            <Dialog open={this.props.openModal} >

                <Paper className={'ParticipantsList'}
                    style={{
                        display: 'inline-block'
                    }}>
                    <label> {this.props.messages.search + ' '} </label>
                    <AutoComplete
                        filter={AutoComplete.caseInsensitiveFilter}
                        dataSource={
                            this.props.contactList.map(
                                (obj: any, index: number) => {
                                    return {
                                        text: obj.name,
                                        value: (<MenuItem
                                            key={index}
                                            primaryText={obj.name}
                                        />)
                                    };

                                })
                        } />

                    <Divider />

                    <label> {this.props.messages.name} </label>
                    <TextField
                        onChange={this.setConversationName}
                    />
                    <Divider />
                </Paper>
                <Paper
                    className={'ParticipantsList'}
                    style={{
                        display: 'inline-block'
                    }}
                >
                    <p>Participants</p>
                </Paper>
                <Divider />

                <FlatButton label={this.props.messages.close} onClick={this.closeWindow} />

                <FlatButton label={this.props.messages.create}
                    onClick={this.createGroupConversation}
                    disabled={this.enableBtn} />

            </Dialog>
        );
    }
}

type ChatGroupProps = GroupM2P & GroupD2P & GroupProps;

interface GroupM2P {
    openModal: boolean;
    // tslint:disable-next-line:no-any
    messages: any;
    contactList: any;
}

interface GroupD2P {
    closeWindow: Function;
    createChatGroup: Function;
}

export default connect<GroupM2P, GroupD2P, {}, AppStore.Store>(
    (store) => ({
        openModal: store.app.conversationGroupModWin,
        messages: store.intlReducer.messages,
        contactList: store.user.contactList
    }),
    {
        closeWindow: OpenModalWindowAction,
        createChatGroup: CreateChatGroupAction
    }
)(CreateChatGroup);