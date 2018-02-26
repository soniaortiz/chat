import * as React from 'react';
import { EmailField } from '../Email/email';
import { connect, DispatchProp } from 'react-redux';
import { RequestLogin } from '../../store/appActions';
import { RouteComponentProps } from 'react-router';
import { Dialog, Paper } from 'material-ui';

interface LoginProps extends DispatchProp<AppStore.store>, RouteComponentProps<{}> {
    isLogged: boolean;
    isLoading: boolean;
    login(email: string, password: string): Promise<boolean>;
}

export class Login extends React.Component<LoginProps, LoginState> {
    constructor(props: LoginProps) {
        super(props);
        this.state = { email: '', password: '', redirect: false, open: false };
    }

    validateUser = (event: (React.MouseEvent<HTMLButtonElement>) | React.KeyboardEvent<HTMLInputElement>) => {
        let flag = true;
        (event.type === 'keydown' && (event as React.KeyboardEvent<HTMLInputElement>).keyCode !== 13) ?
            flag = false : flag = true;
        if (flag) {
            const { email, password } = this.state;
            console.log(this.props.isLogged);
            // thunk
            this.props.login(email, password)
                .then((valid) => {
                    if (valid) {
                        this.props.history.push('/dashboard');
                    } else {
                        console.log('invalid user');
                    }
                })
                .catch((e) => console.log(e));
        }
    }
    getEmailValue = (mailValue: string) => {
        this.setState({ email: mailValue });
    }
    handleData = (data: LoginState) => {
        this.setState({
            email: data.email,
            password: data.password
        });
    }
    setPasswordValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ password: event.target.value });
    }
    render() {
        return (
            <Paper>
                    <Dialog open={true}>
                        <label htmlFor="">Email</label>
                        < EmailField setEmailValue={this.getEmailValue} />
                        <label htmlFor="">Password</label>
                        <input type="password" required={true} id="passwordfield"
                            onChange={this.setPasswordValue} ref="password"
                            onKeyDown={this.validateUser}
                        />
                        <button onClick={this.validateUser}>Login</button>
                    </Dialog>

            </Paper>
        );
    }
}

export default connect<{}, {}, LoginProps, AppStore.store>(
    (store) => (
        {
            isLogged: store.app.logged,
            isLoading: store.app.loading
        }
    ),
    {
        login: RequestLogin
    }
)(Login);