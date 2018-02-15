import * as React from 'react';
import { TextField } from 'material-ui';
import request from 'axios';

interface SearchFriendProps {
    // searchUser(name: string): Promise<boolean>;
}

interface SearchFriendState {
    userName: string;
}
export class SearchFriend extends React.Component<SearchFriendProps, SearchFriendState> {

    constructor(props: SearchFriendProps) {
        super(props);
        this.state = { userName: '' };
    }

    searchTheUser = ({target: {value}}: React.ChangeEvent<HTMLInputElement>) => {    
        this.setState({userName: value });
        console.log("user name: ", value);
        request.get('/findUsers', {
            params: {
                userName: value
            }
        })
        .then((response) => {
            console.log('Response ', response);
        })
        .catch((e) => console.log(e));
    }
    render() {
        return (
            <TextField onChange={this.searchTheUser} />
        );
    }
}