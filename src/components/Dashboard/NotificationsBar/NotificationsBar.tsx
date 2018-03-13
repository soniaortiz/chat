import * as React from 'react';
import { Paper, Toolbar, IconMenu, ToolbarGroup, FlatButton, MenuItem } from 'material-ui';
import ActionTranslate from 'material-ui/svg-icons/action/translate';
import SocialPeople from 'material-ui/svg-icons/social/people';
import { connect } from 'react-redux';
import ContactRequestList from '../ContactRequestList/ContactRequestList';
import { LogOutRequest } from '../../../store/logOut';
import { RouteComponentProps } from 'react-router';
import * as H from 'history';
import { setLanguage } from '../../../store/LangAction';
// const messages = require('../../../locales.json');

const languages = ['es-419', 'en', 'it'];

interface NotificationsBarProps extends RouteComponentProps<{}> {
}

interface NotificationsBarState {
    displayRequestsList: boolean;
    language: string;
}
export class NotificationsBar extends React.Component<NotificationsBarProps
    & MapDispatchToPropsNB & MapStateToPropsNB, NotificationsBarState> {

    constructor(props: NotificationsBarProps & MapDispatchToPropsNB & MapStateToPropsNB) {
        super(props);
        this.state = { displayRequestsList: false, language: '' };
    }
    logOut = () => {
        console.log('Login out');
        this.props.logOut(this.props.history);
    }
    displayRequests = () => {
        // console.log(this.props.userContactRequests);
        this.setState({ displayRequestsList: !this.state.displayRequestsList });
    }
    setLanguageToStore = (lang: string) => () => {
        this.props.setLanguage(lang);
    }
    render() {
        return (
            <Paper>
                <Toolbar>
                    {
                        <p> {this.props.messages.welcomeMessage} </p>                           
                    }
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

                    <ToolbarGroup >
                        <FlatButton label={'Logout'} onClick={this.logOut} />
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
}

interface MapStateToPropsNB {
    userContactRequests: string[];
    lan: string;
    messages: any
}

export default connect<MapStateToPropsNB, MapDispatchToPropsNB, NotificationsBarProps, AppStore.Store>(
    (store) => ({
        userContactRequests: store.user.friendRequests,
        lan: store.intlReducer.locale,
        messages: store.intlReducer.messages
    }),
    {
        logOut: LogOutRequest,
        setLanguage: setLanguage
    }
)(NotificationsBar);