import * as React from 'react';
import { DispatchProp, connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Avatar, List,  Paper, ListItem } from 'material-ui';
import './style.css';

interface MeProps extends DispatchProp<{}>, RouteComponentProps<{}> {
    user: AppStore.user;
}

export class Me extends React.Component<MeProps> {
    render() {
        return (
            <Paper>
                <Avatar src="http://via.placeholder.com/350x150" size={100} className="Avatar" />
                <List>

                    {

                        Object.entries(this.props.user)
                            .filter(
                                ([key]) => key !== 'avatar' && 
                                key !== 'friendRequests' &&
                                key !== 'contactList' &&
                                key !== 'conversations'

                            ) 
                            .map(([key, value], index) => (
                                <ListItem key={index} primaryText={value.toString()}/>
                            )
                            )

                    }
                </List>

            </Paper>

        );
    }
}

export default connect<{}, {}, {}, AppStore.store>(
    (store) => ({
        user: store.user
    }),
    {
        // no actions
    }
)(Me) as React.ComponentClass;