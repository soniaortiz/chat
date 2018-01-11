import * as React from 'react';
import {EmailField} from './email';
import * as axios from 'axios';
const request = axios.default;
import * as ReactDOM from 'react-dom'

export class Login extends React.Component<LoginProps, LoginState>{
    constructor(props: LoginProps){
        super(props)
        this.state = {email: '', password: ''}
    }
    validateUser = (event: React.MouseEvent<HTMLButtonElement>)=>{
        request.post('/login',{email: this.state.email, password: this.state.password})
        .then((result)=>{
            if(result)
            console.log(result)
            this.setState(()=>({password: ''}))
            console.log(result);
        })
        .catch((e)=>e)
        ReactDOM.findDOMNode(this.refs.password).nodeValue='';
    }

    getEmailValue=(mailValue: string)=>{
        this.setState({email: mailValue});
        // console.log(mailValue);
    }
    handleData=(data: LoginState)=>{
        this.setState({
            email: data.email,
            password: data.password
        })
    }
    setPasswordValue=(event: React.ChangeEvent<HTMLInputElement>)=>{
        this.setState({password: event.target.value})
    }
    render(){
        return (
        <div id="loginForm" className="from-group">
            <label htmlFor="">Email</label>
            < EmailField setEmailValue={this.getEmailValue}/>
            <label htmlFor="">Password</label>
            <input type="password" required={true} id="passwordfield" onChange={this.setPasswordValue} ref="password" value={this.state.password}/>
            <button className={'btn btn-primary'} onClick={this.validateUser}>Login</button>        
        </div>)
    }
}