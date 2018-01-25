import * as React from 'react';
import { DispatchProp, connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';

interface MeProps extends DispatchProp<{}>, RouteComponentProps<{}> {
    user: AppStore.user
}

export class Me extends React.Component<MeProps> {
    render() {
        return <div>
            <p> {this.props.user.name}</p>
            <p> {this.props.user.middleName}</p>
            <p>{this.props.user.email}</p>
        </div>
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