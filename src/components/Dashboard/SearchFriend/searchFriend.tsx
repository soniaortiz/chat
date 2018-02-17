import * as React from 'react';
import request, { AxiosResponse } from 'axios';
import { AutoComplete, MenuItem, Paper } from 'material-ui';

interface SearchFriendProps {
    // searchUser(name: string): Promise<boolean>;
}

interface SearchFriendState {
    userName: string;
    userEmail: string;
    selected: boolean;
    users: any[]
}
export class SearchFriend extends React.Component<SearchFriendProps, SearchFriendState> {

    // users: Array<AppStore.user>;
    constructor(props: SearchFriendProps) {
        super(props);
        this.state = { userName: '', userEmail: '', selected: false, users: [] };
        // this.users = [];
    }

    handleNewRequest = (value: string) => {
        if (!value) { return; }
        this.setState({ userName: value });
        console.log(value);
        // setTimeout(() => {
        // console.log("hello");
        request
            .get('/findUsers', {
                params: {
                    userName: value
                }
            })
            .then((response) => new Promise<AxiosResponse>((res, rej) => setTimeout(() => { res(response); }, 1000)))
            .then((response) => {
                console.log(response.data); // the object array 
                // this.users = response.data.map((user: AppStore.user) => {
                //     return user.name;
                // });
                // this.state.users = response.data;
                this.setState({ users: response.data, selected: true }); // to display list

            })
            .catch((e) => console.log(e));
        // }, 1000);
    }
    render() {
        return (
            <Paper>
                <AutoComplete
                    onUpdateInput={this.handleNewRequest}
                    dataSource={
                        this.state.users.map((user, index) => {
                            return ({
                                text: user.name,
                                value: (
                                    < MenuItem
                                        onClick={() => (console.log(user.email))}
                                        key={index}
                                        id={index.toString()}
                                        primaryText={user.name}
                                    />
                                )
                            });
                        })
                    }
                />
            </Paper>
        );
        // const p = {
        //     users: this.state.users,
        //     onChange: this.handleNewRequest
        // };
        // if (!this.state.selected) {
        //     return (
        //         <TextField onChange={this.handleNewRequest} />
        //     );
        // }
        // return <UsersList  {...p} />;
    }
}