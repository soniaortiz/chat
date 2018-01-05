import * as React from 'react';

const EmailField = ()=>{
    return (
        <input type="text"/>
    )
}

const PasswordField =()=>{
    return <input type="password"/>
}

const LoginBtn = ()=>{
    return <button>Login</button>
}

export class Login extends React.Component{
    render(){
        return (
        <div id="loginform">
            <label htmlFor="">Email</label>
            <EmailField />
            <label htmlFor="">Password</label>
            <PasswordField />
            <LoginBtn/>
        </div>)
    }
}