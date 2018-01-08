import * as React from 'react';

interface LoginProps{
}
interface LoginState{
}

export class Login extends React.Component<LoginProps, LoginState>{
    validateEmailType(){
        const regEx = /([a-zA-Z0-9]+)\@([a-zA-Z0-9]+)\.([a-zA-Z0-9]{2,5})(\.)*([a-zA-Z0-9]{2,5})$/ig
    }

    render(){
        return (
        <div id="loginForm" className="from-group">
            <label htmlFor="">Email</label>
            <input type="text" required={true} id="emailField"/>
            <label htmlFor="">Password</label>
            <input type="password" required={true} id="passwordfield"/>
            <button className={'btn btn-primary'}>Login</button>        
        </div>)
    }
}