import * as React from 'react';
// import * as ReactDOM from 'react-dom';

export class Password extends React.Component<PasswordProps, passwordState>{
    constructor(props: PasswordProps){
        super(props)
        this.state={    
            password: '',
            confirmationPassword: '',
        disable: true}
    }
    enableSecondPasswordInput=({target: {value:{length}}, target: {value}}: React.ChangeEvent<HTMLInputElement>)=>{
        length<8?
            this.setState({disable: true, password: value}):
            this.setState({disable: false, password: value});
    }
    matchPassword=({target:{value}}: React.ChangeEvent<HTMLInputElement>)=>{
        // console.log('matching password', RegExp(this.state.password));
        (RegExp("^"+this.state.password+"$").test(value))? 
        this.props.passwordValidation(value):()=>{}
    }
    render(){
        return <div>
            <input type="password" onChange={this.enableSecondPasswordInput}/>
            <input type="password" disabled={this.state.disable} 
            ref="confirmPassword" onChange={this.matchPassword}/>
        </div>
    }
}