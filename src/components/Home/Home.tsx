import * as React from 'react';
import { FlatButton, Paper } from 'material-ui';
// import { RouteProps } from 'react-router';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';

const Home = (props: HomeProps) => {
    const redirectToLogin = () => {
        console.log('go to login');
        props.history.replace('/login');
    };

    const redirectToRegistration = () => {
        props.history.replace('/registration');
    }; 

    return (

        <Paper style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            marginTop: '-50px',
            marginLeft: '-200px'
        }}>
            <FlatButton label={'props.messages.login'}  
                onClick= {redirectToLogin}
                style={{
                    marginRight: '20px',
                    backgroundColor: '#00BCD4',
                    color: 'white',
                }}

            />
             
            <FlatButton label={'props.messages.signup'} 
            onClick = {redirectToRegistration}
            style={{
                backgroundColor: '#00BCD4',
                marginLeft: '20px',
                color: 'white'

            }}

            />
        </Paper>
    );

};

interface HomeMS2P {
    messages: any
}

interface HomeOwnProps extends RouteComponentProps<{}> { }

type HomeProps = HomeMS2P & HomeOwnProps;

export default connect<HomeMS2P, {}, HomeOwnProps, AppStore.Store>(
    (store) => ({
        messages: store.intlReducer.messages
    })
)(Home);