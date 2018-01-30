import * as React from 'react';
import { DispatchProp, connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import {Avatar, List, ListItem, AvatarProps} from 'material-ui';

interface MeProps extends DispatchProp<{}>, RouteComponentProps<{}> {
    user: AppStore.user
}

const avatarProps: AvatarProps={
    className: 'Avatar',
    backgroundColor: 'blue',
    style: {
    }
}

export class Me extends React.Component<MeProps> {
    render() {
        return (
            <div>           
                <List>                    
                    {
                        Object.entries(this.props.user).map((prop)=>(
                            <ListItem key={prop[0]}>{prop[1]}</ListItem>))
                    }                    
                </List>
                
                <List >
                    <Avatar src="" {...avatarProps}/>
                </List>
            </div>
        )
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