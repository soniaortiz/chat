import * as React from 'react';
import { DispatchProp, connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import {
    Avatar,
    List,
    Paper,
    ListItem
} from 'material-ui';
import './style.css';

interface MeProps extends DispatchProp<{}>, RouteComponentProps<{}> {
    user: AppStore.User;
}

export class Me extends React.Component<MeProps> {

    openAvatar = () => {
        console.log('Open avatar');
    }
    render() {
        return (
            <Paper style={{
                overflow: 'auto'
            }}>
                <Avatar src="./avatar.jpg" size={100} className="Avatar"
                    onClick={this.openAvatar}
                    style={
                        {
                            zIndex: 5,
                            border: 'solid',
                            position: 'relative'
                        }
                    }
                />
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
                                <ListItem key={index} primaryText={
                                    // property[index] + ' ' +
                                    value.toString()}
                                    disabled={true}

                                />
                            )
                            )
                    }
                </List>

            </Paper>

        );
    }
}

export default connect<{}, {}, {}, AppStore.Store>(
    (store) => ({
        user: store.user
    }),
    {
        // no actions
    }
)(Me) as React.ComponentClass;