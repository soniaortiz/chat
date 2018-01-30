import * as React from 'react';
import { TextField } from 'material-ui';

export class SearchFriend extends React.Component <{}, {}>{

    constructor(props: {}){
        super({});
    }

    searchUser = ( event: React.ChangeEvent<HTMLInputElement>) =>{
        // console.log(event.target.value);
    }

    render() {
        return (
            <TextField onChange={this.searchUser}/>
        );
    }
}