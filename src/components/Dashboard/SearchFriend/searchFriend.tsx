import * as React from 'react';
import request, { AxiosResponse } from 'axios';
import { AutoComplete, MenuItem, Paper } from 'material-ui';
import { ContactRequestDialog } from '../ContactRequestDialog/contactRequestDialog';

interface SearchFriendProps {
    // searchUser(name: string): Promise<boolean>;
}

interface SearchFriendState {
    userName: string;
    userEmail: string;
    selected: string;
    users: any[];
    viewUser: boolean;
}
export class SearchFriend extends React.Component<SearchFriendProps, SearchFriendState> {

    constructor(props: SearchFriendProps) {
        super(props);
        this.state = {
            userName: '', userEmail: '',
            selected: '', users: [],
            viewUser: false
        };
        // this.users = [];
    }

    displayUser = (event: React.MouseEvent<HTMLDivElement>) => {
        // console.dir(event.target);
        // console.dir(event.currentTarget);
        const emailUser = this.state.users[Number(event.currentTarget.id)];
        this.setState({ viewUser: true, selected: emailUser });

    }

    onCloseDialog = () => {
        console.log("Dialog closed");
        this.setState({ viewUser: false });
    }

    handleNewRequest = (value: string) => {
        if (!value) { return; }
        this.setState({ userName: value });
        console.log(value);
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
        // }, 1000);
    }

    render() {
        return (
            <Paper>
                {
                    this.state.viewUser ? <ContactRequestDialog onCloseDialog={this.onCloseDialog}
                        user={this.state.selected} /> : false
                }

                <AutoComplete
                    onUpdateInput={this.handleNewRequest}
                    maxSearchResults={10}
                    dataSource={

                        this.state.users.map((user, index) => {
                            // console.log(user);
                            return ({
                                text: user.name,
                                value: (
                                    < MenuItem
                                        id={index.toString()}
                                        onClick={this.displayUser}
                                        key={index}
                                        primaryText={user.name}
                                    // value={user.name}
                                    />
                                )
                            });
                        })
                    }
                />
            </Paper>
        );
    }
}