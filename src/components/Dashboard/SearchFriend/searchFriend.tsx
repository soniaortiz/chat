import * as React from 'react';
import request, { AxiosResponse } from 'axios';
import { AutoComplete, MenuItem, Paper } from 'material-ui';
import ContactRequestDialog from '../ContactRequestDialog/contactRequestDialog';
import ActionSearch from 'material-ui/svg-icons/action/search';
// import SvgIcon from 'material-ui/SvgIcon';
import { connect } from 'react-redux';
import { setModalWindowAction } from '../../../store/appActionRequestWindow';

interface SearchFriendProps {
}

interface SearchFriendState {
    userName: string;
    userEmail: string;
    selected: UserContact;
    users: UserContact[];
    viewUser: boolean;
}

export class SearchFriend extends React.Component<SearchFriendPropsMix, SearchFriendState> {

    constructor(props: SearchFriendPropsMix) {
        super(props);
        this.state = {
            userName: '', userEmail: '',
            selected: {
                name: '',
                middleName: '',
                lastName: '',
                gender: '',
                email: ''
            },
            users: [],
            viewUser: false
        };
        // this.users = [];
    }

    displayUser = (event: React.MouseEvent<HTMLDivElement>) => {
        const emailUser = this.state.users[Number(event.currentTarget.id)];
        // console.log('Emailuser: ', emailUser);
        this.setState({ viewUser: true, selected: emailUser });
        console.log('Display user: ', this.props.requestWindowOpened);
        this.props.setModalRequestWindow();
        console.log('this.props.modal', this.props.requestWindowOpened);

    }

    onCloseDialog = () => {
        console.log('Dialog closed');
    }

    handleNewRequest = (value: string) => {
        if (!value) { return; }
        this.props.setModalRequestWindow();
        this.setState({ userName: value });
        // this.console.log(value);
        request
            .get('/findUsers', {
                params: {
                    userName: value
                }
            })
            .then((response) => new Promise<AxiosResponse>((res, rej) => setTimeout(() => { res(response); }, 500)))
            .then((response) => {
                console.log(response.data); // the object array 
                this.setState({ users: response.data }); // to display list

            })
            .catch((e) => console.log(e));
    }

    render() {
        return (
            <Paper >
                {
                    this.props.requestWindowOpened ?
                        <ContactRequestDialog
                            user={this.state.selected}
                            onCloseDialog={this.onCloseDialog}
                        /> : false
                }

                <div className="search">
                    <AutoComplete
                        onUpdateInput={this.handleNewRequest}
                        maxSearchResults={10}
                        hintText={'Search new Contact'}
                        dataSource={
                            this.state.users.map((user, index) => {
                                return ({
                                    text: user.name,
                                    value: (
                                        < MenuItem
                                            id={index.toString()}
                                            onClick={this.displayUser}
                                            key={index}
                                            primaryText={user.name}
                                        />
                                    )
                                });
                            })
                        }
                    />
                </div>
                <div className="search">
                    <ActionSearch />
                </div>
            </Paper>
        );
    }
}

type SearchFriendPropsMix = SearchFriendMapToProps & SearchFriendProps & SearchFriendDispatchToProps;

interface SearchFriendMapToProps {
    requestWindowOpened: boolean;
}

interface SearchFriendDispatchToProps {
    setModalRequestWindow: () => void;
}
export default connect<SearchFriendMapToProps, SearchFriendDispatchToProps, SearchFriendProps, AppStore.Store>(
    (store) => (
        {
            requestWindowOpened: store.app.requestWindowOpened
        }),
    {
        setModalRequestWindow: setModalWindowAction
    }
)(SearchFriend);