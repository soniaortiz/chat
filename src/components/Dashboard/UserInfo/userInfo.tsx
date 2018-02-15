import * as React from 'react';
import { DispatchProp, connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Avatar, List, ListItem } from 'material-ui';
import './style.css';

interface MeProps extends DispatchProp<{}>, RouteComponentProps<{}> {
    user: AppStore.user;
}

export class Me extends React.Component<MeProps> {
    render() {
        return (
            <div>
                <Avatar src="" size={100} className="Avatar" />
                <List>
                    {
                        Object.entries(this.props.user).map((prop) => (
                            <ListItem key={prop[0]}>{prop[1]}</ListItem>))
                    }
                </List>
            </div>
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