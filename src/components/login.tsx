import * as React from 'react';
import { EmailField } from './email';
import * as axios from 'axios';
const request = axios.default;
// import * as Cookies from 'js-cookie';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { RequestLogin } from '../appActions'

export class Login extends React.Component<LoginProps, LoginState>{
    constructor(props: LoginProps) {
        super(props)
        this.state = { email: '', password: '', redirect: false, open: false }
    }
    validateUser = (event: (React.MouseEvent<HTMLButtonElement>) | React.KeyboardEvent<HTMLInputElement>) => {
        let flag = true;
        (event.type == 'keydown' && (event as React.KeyboardEvent<HTMLInputElement>).keyCode != 13) ?
            flag = false : flag = true;
        if (flag)
            request.post('/login', { email: this.state.email, password: this.state.password }, {withCredentials: true})
                    .then(({data:{user_id}}) => {
                        console.log(user_id);
                        this.setState(() => ({ password: '', redirect: true }));
                        this.props.login(user_id);
                        console.log("change to: ", this.props.isLogged);
                        console.log("Set user id to: ", this.props.user_id_is);
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
        if (this.props.isLogged) { return <Redirect to="/dashboard" />}
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
        )
    }
}

export default connect<loginMapToProps, loginReducersToProps, LoginProps, AppStore>(
    (store) => ({ isLogged: store.app.logged, user_id_is: store.app.user_id}),
    {
        login: RequestLogin
    }
)(Login)