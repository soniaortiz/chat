import * as React from 'react';
import { FlatButton, Paper } from 'material-ui';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { setLanguage } from '../../store/LangAction';

class Home extends React.Component<HomeProps> {
    componentDidMount() {
        this.props.loadLanguages('en');
    }
    redirectToLogin = () => {
        this.props.history.replace('/login');
    }

    redirectToRegistration = () => {
        this.props.history.replace('/registration');
    }

    render() {
        return (
            <Paper style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                marginTop: '-50px',
                marginLeft: '-200px'
            }}>
                <FlatButton label={this.props.messages.login}
                    onClick={this.redirectToLogin}
                    style={{
                        marginRight: '20px',
                        backgroundColor: '#00BCD4',
                        color: 'white',
                    }}

                />

                <FlatButton label={this.props.messages.signup}
                    onClick={this.redirectToRegistration}
                    style={{
                        backgroundColor: '#00BCD4',
                        marginLeft: '20px',
                        color: 'white'

                    }}

                />
            </Paper>
        );

    }

};

interface HomeMS2P {
    messages: any
}

interface HomeOwnProps extends RouteComponentProps<{}> { }
interface HomeD2P {
    loadLanguages: (language: string) => void;
}
type HomeProps = HomeMS2P & HomeOwnProps & HomeD2P;

export default connect<HomeMS2P, HomeD2P, HomeOwnProps, AppStore.Store>(
    (store) => ({
        messages: store.intlReducer.messages
    }),
    {
        loadLanguages: setLanguage
    }
)(Home);