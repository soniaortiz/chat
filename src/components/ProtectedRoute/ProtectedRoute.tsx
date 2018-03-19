import * as React from 'react';
import { Route } from 'react-router';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class ProtectedRoute extends React.Component<PRProps> {
    render() {
        return (
            this.props.isLogged ?
                <Route exact
                    path={this.props.path}
                    component={this.props.com2render}
                /> :
                <Redirect to="/" />
        );
    }
}

interface PROwnProps {
    // tslint:disable-next-line:no-any
    com2render: any;
    path: string;
}

interface PRMS2P {
    isLogged: boolean;
}

type PRProps = PROwnProps & PRMS2P;

export default connect<PRMS2P, {}, PROwnProps, AppStore.Store>(
    (store) => (
        {
            isLogged: store.app.logged
        }
    )
)(ProtectedRoute);