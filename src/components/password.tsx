import * as React from 'react';
// import * as ReactDOM from 'react-dom';

export class Password extends React.Component<PasswordProps, passwordState>{
    constructor(props: PasswordProps){
        super(props)
        this.state={    
            firstPassword: '',
            confirmationPassword: '',
        disable: true}
    }

    enableSecondPasswordInput=({target: {value:{length}}}: React.ChangeEvent<HTMLInputElement>)=>{
        if(length!=8){
            // ReactDOM.findDOMNode(this.refs.confirmPassword).setAttribute('disabled', 'false');
            this.setState({disable: true})
            console.log("enable");            
        }
        else{
            // ReactDOM.findDOMNode(this.refs.confirmPassword).setAttribute('disabled', 'true');
            this.setState({disable: false})
            console.log("disable");
        }
    }
    render(){
        return <div>
            <input type="password" onChange={this.enableSecondPasswordInput}/>
            <input type="password" disabled={this.state.disable} ref="confirmPassword"/>
        </div>
    }
}