import * as React from 'react';
import {EmailField} from './email';
import * as axios from 'axios';
const request = axios.default;
import  * as Cookies from 'js-cookie';
import {Redirect} from 'react-router'


export class Login extends React.Component<LoginProps, LoginState>{
    constructor(props: LoginProps){
        super(props)
        this.state = {email: '', password: '', redirect: false}
    }
    validateUser = (event: React.MouseEvent<HTMLButtonElement>)=>{
        request.post('/login',{email: this.state.email, password: this.state.password})
        .then((result)=>{
            Cookies.set('token', result);
            this.setState(()=>({redirect: true}))
            this.setState(()=>({password: ''}));
        })
        .catch((e)=>e)
    }
    getEmailValue=(mailValue: string)=>{
        this.setState({email: mailValue});
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
        if(this.state.redirect)
            {return <Redirect to="/dashboard"/>}
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