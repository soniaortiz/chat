import * as React from 'react';
import { Paper, Toolbar, IconMenu, ToolbarGroup, FlatButton, MenuItem } from 'material-ui';
import ActionTranslate from 'material-ui/svg-icons/action/translate';
import SocialPeople from 'material-ui/svg-icons/social/people';
import CommunicationChat from 'material-ui/svg-icons/communication/chat';
import { connect } from 'react-redux';
import ContactRequestList from '../ContactRequestList/ContactRequestList';
import { LogOutRequest } from '../../../store/logOut';
import { RouteComponentProps } from 'react-router';
import * as H from 'history';
import { setLanguage } from '../../../store/LangAction';
import { OpenModalWindowAction } from '../../../store/chatGroup';
import CreateChatGroup from '../CreateChatGroup/CreateChatGroup';

const languages = ['es-419', 'en', 'it'];

interface NotificationsBarProps extends RouteComponentProps<{}> {
}

interface NotificationsBarState {
    modalCreateChatGroup: boolean;
}
export class NotificationsBar extends React.Component<NotificationsBarProps
    & MapDispatchToPropsNB & MapStateToPropsNB, NotificationsBarState> {

    constructor(props: NotificationsBarProps & MapDispatchToPropsNB & MapStateToPropsNB) {
        super(props);
        this.state = { modalCreateChatGroup: false };
    }
    logOut = () => {
        console.log('Login out');
        this.props.logOut(this.props.history);
    }
    setLanguageToStore = (lang: string) => () => {
        this.props.setLanguage(lang);
    }

    createChatGroup = () => {
        console.log('Open modal window', this.props.modalWindow);
        this.setState({ modalCreateChatGroup: true });
        this.props.setGroupChatMD();
        console.log('Open modal window', this.props.modalWindow);

    }

    render() {
        return (
            < Paper >
                {
                    this.props.modalWindow ?
                        <CreateChatGroup /> :
                        false
                 }

                <Toolbar
                    style={{
                        height: '90px',
                        backgroundColor: 'rgb(0, 188, 212)',
                        display: 'flex',
                        color: 'white'
                    }}
                >
                    <ToolbarGroup>
                        <h1> {this.props.messages.welcomeMessage} </h1>
                    </ToolbarGroup>

                    <ToolbarGroup >
                        <IconMenu
                            iconButtonElement={
                                <ActionTranslate />
                            }
                        >
                            {
                                languages.map((lang, index) => {
                                    return (
                                        <MenuItem onClick={this.setLanguageToStore(lang)} >
                                            {lang}
                                        </MenuItem>
                                    );
                                }
                                )
                            }
                        </IconMenu >

                    </ToolbarGroup>

                    <ToolbarGroup >
                        {this.props.userContactRequests ?
                            this.props.userContactRequests.length : 0}
                        <IconMenu
                            iconButtonElement={
                                <SocialPeople
                                    hoverColor={'blue'}
                                />
                            }
                        >
                            {/* {this.props.userContactRequests.length} */}
                            <ContactRequestList />
                        </IconMenu>
                    </ToolbarGroup>

                    <ToolbarGroup>
                        <FlatButton onClick={this.createChatGroup} >
                            <CommunicationChat />
                        </FlatButton>
                    </ToolbarGroup>

                    <ToolbarGroup >
                        <FlatButton label={this.props.messages.logout} onClick={this.logOut} />
                    </ToolbarGroup>

                </Toolbar>

            </Paper >
        );
    }
}

interface MapDispatchToPropsNB {
    // tslint:disable-next-line:no-any
    logOut: (history: H.History) => void;
    setLanguage: (l: string) => void;
    setGroupChatMD: Function;
}

interface MapStateToPropsNB {
    userContactRequests: string[];
    lan: string;
    messages: any;
    modalWindow: boolean;
}

export default connect<MapStateToPropsNB, MapDispatchToPropsNB, NotificationsBarProps, AppStore.Store>(
    (store) => ({
        userContactRequests: store.user.friendRequests,
        lan: store.intlReducer.locale,
        messages: store.intlReducer.messages,
        modalWindow: store.app.conversationGroupModWin  
        //  to open the modal window to create a chat group
    }),
    {
        logOut: LogOutRequest,
        setLanguage: setLanguage,
        setGroupChatMD: OpenModalWindowAction
    }
)(NotificationsBar);