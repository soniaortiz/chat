import * as React from 'react';
import { EmailField } from './email';
// import { Redirect } from 'react-router';
import { connect, DispatchProp } from 'react-redux';
import { RequestLogin } from '../store/appActions';
import { RouteComponentProps } from 'react-router';

interface LoginProps extends DispatchProp <{}>, RouteComponentProps<{}>{
    login (email: string, password: string): Promise <boolean> 
}

export class Login extends React.Component<LoginProps, LoginState> {
    constructor(props: LoginProps) {
        super(props);
        this.state = { email: '', password: '', redirect: false, open: false };
    }
    validateUser = (event: (React.MouseEvent<HTMLButtonElement>) | React.KeyboardEvent<HTMLInputElement>) => {

        let flag = true;
        (event.type == 'keydown' && (event as React.KeyboardEvent<HTMLInputElement>).keyCode != 13) ?
            flag = false : flag = true;
        if (flag) {
            const {email, password} = this.state;
            this.props.login(email, password)
            .then((valid)=>{
                if(valid){
                    this.props.history.push('/dashboard')
                }
            })
            .catch((e)=>console.log(e))
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
            <div>
                <label htmlFor="">Email</label>
                < EmailField setEmailValue={this.getEmailValue} />
                <label htmlFor="">Password</label>
                <input type="password" required={true} id="passwordfield"
                    onChange={this.setPasswordValue} ref="password" value={this.state.password}
                    onKeyDown={this.validateUser}
                />
                <button onClick={this.validateUser}>Login</button>
            </div>
        );
    }
}

export default connect<{}, {}, LoginProps, AppStore.app>(
    (store) => (
        { isLogged: store.logged }
    ),
        {
            login: RequestLogin
        }
)(Login);