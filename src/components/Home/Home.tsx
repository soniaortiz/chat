import * as React from 'react';
import {
    FlatButton,
    Paper, RefreshIndicator
} from 'material-ui';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { setLanguage } from '../../store/LangAction';

class Home extends React.Component<HomeProps> {
    componentDidMount() {
        console.log(this.props.language);
        this.props.loadLanguages(window.navigator.language); // set language 
        if (!this.props.messages[this.props.language]) {
            console.log('setting default language');
            this.props.loadLanguages('en'); // set language 
        }
    }
    redirectToLogin = () => {
        this.props.history.replace('/login');
    }

    redirectToRegistration = () => {
        this.props.history.replace('/registration');
    }

    render() {
        // console.log(this.props.messages);
        return this.props.messages ?
            <Paper style={{
                position: 'fixed',
                // backgroundImage: './523596673.jpg',
                // background: './523596673.jpg',
                // backgroundColor: 'pink',
                backgroundRepeat: 'repeat-x',
                width: '100%',
                height: '100%',
            }}>
            
                <div>
                    <img src="./523596673.jpg" alt="fas" style={{
                        display: 'absolute',
                        // margin: '300px'
                    }}/>
                    
                </div>
                <FlatButton label={this.props.messages.login}
                    onClick={this.redirectToLogin}
                    style={{
                        position: 'relative',
                        top: '50%',
                        left: '50%',
                        marginRight: '20px',
                        backgroundColor: '#00BCD4',
                        color: 'white',
                    }}

                />

                <FlatButton label={this.props.messages.signup}
                    onClick={this.redirectToRegistration}
                    style={{
                        position: 'relative',
                        top: '50%',
                        left: '50%',
                        marginRight: '20px',
                        backgroundColor: '#00BCD4',
                        color: 'white',
                    }}

                />
            </Paper> :
            <RefreshIndicator
                size={40}
                left={10}
                top={0}
                status="loading" />;
    }

}

interface HomeMS2P {
    // tslint:disable-next-line:no-any
    messages: any;
    language: string;

}

interface HomeOwnProps extends RouteComponentProps<{}> { }
interface HomeD2P {
    loadLanguages: (language: string) => void;
}
type HomeProps = HomeMS2P & HomeOwnProps & HomeD2P;

export default connect<HomeMS2P, HomeD2P, HomeOwnProps, AppStore.Store>(
    (store) => ({
        messages: store.intlReducer.messages,
        language: store.app.locale
    }),
    {
        loadLanguages: setLanguage
    }
)(Home);