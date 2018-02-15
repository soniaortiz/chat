import * as React from 'react';
import {  AutoComplete } from 'material-ui';
import request from 'axios';

interface SearchFriendProps {
    // searchUser(name: string): Promise<boolean>;
}

interface SearchFriendState {
    userName: string;
}
export class SearchFriend extends React.Component<SearchFriendProps, SearchFriendState> {

    users: Array<string>;
    constructor(props: SearchFriendProps) {
        super(props);
        this.state = { userName: '' };
        this.users = [];
    }

    handleUpdateInput = (searchText: React.ChangeEvent<HTMLInputElement>) => {
        this.setState(
            { userName: searchText.target.value }
        );
    }

    handleNewRequest = (searchText: any) => {
        this.setState({ userName: searchText});
        // console.log('"user name: "', searchText);
        request.get('/findUsers', {
            params: {
                userName: searchText
            }
        })
            .then((response) => {
                this.users = response.data.map((user: AppStore.user) => {
                    return user.name;
                });
                console.log(this.users);
            })
            .catch((e) => console.log(e));
    }
    render() {
        return (
            // <TextField onChange={this.handleNewRequest} />
            <div>
                <AutoComplete
                    hintText="Name of the person"
                    searchText={this.state.userName}
                    onUpdateInput={this.handleNewRequest}
                    onNewRequest={this.handleNewRequest}
                    dataSource={this.users}
                    filter={(searchText, key) => (key.indexOf(searchText) !== -1)}
                    openOnFocus={true}
                />
            </div>
        );
    }
}