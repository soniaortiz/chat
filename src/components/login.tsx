import * as React from 'react';
import { EmailField } from './email';
import * as axios from 'axios';
const request = axios.default;
import * as Cookies from 'js-cookie';
import { Redirect } from 'react-router';
import { FlatButton } from 'material-ui';

export class Login extends React.Component<LoginProps, LoginState>{
    constructor(props: LoginProps) {
        super(props)
        this.state = { email: '', password: '', redirect: false }
    }
    validateUser = (event: React.MouseEvent<HTMLButtonElement>) => {
        request.post('/login', { email: this.state.email, password: this.state.password })
            .then((result) => {
                if (result.data) {
                    Cookies.set('token', result);
                    this.setState(() => ({ redirect: true }))
                    this.setState(() => ({ password: '' }));
                }
            })
            .catch((e) => e)
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
        console.log("Cookie name: ", Cookies.get("name"));
       if (Cookies.get(name)){return <Redirect to="/dashboard" /> }
        return (
            <div id="loginForm" className="from-group">
                <label htmlFor="">Email</label>
                < EmailField setEmailValue={this.getEmailValue} />
                <label htmlFor="">Password</label>
                <input type="password" required={true} id="passwordfield" onChange={this.setPasswordValue} ref="password" value={this.state.password} />
                <FlatButton className={'btn btn-primary'} onClick={this.validateUser}>Login</FlatButton>
            </div>)
    }
}