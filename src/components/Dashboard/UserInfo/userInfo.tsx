import * as React from 'react';
import { DispatchProp, connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';

interface MeProps extends DispatchProp<{}>, RouteComponentProps<{}> {
    user: AppStore.user
}

export class Me extends React.Component<MeProps> {
    render() {
        return (<div>
            {
                Object.entries(this.props.user).map((prop)=>
                    <p>{prop[1]}</p>
            )}
        </div>)
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