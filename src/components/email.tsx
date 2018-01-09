import * as React from 'react';

export class EmailField extends React.Component<emailProps, emailState>{
    constructor(props: emailProps){
        super(props)
        this.state={valid: false}
    }
    validateExpression=(event: React.ChangeEvent<HTMLInputElement>)=>{
        const regEx = /[a-zA-Z0-9]+\@([a-zA-Z0-9]+)\.[a-zA-Z0-9]{2,5}(\.[a-zA-Z0-9]{2,5})*$/gi;
                if((event.target.value).match(regEx)){
                    this.props.setEmailValue(event.target.value);
                    this.setState({valid: true});
                    this.props.setEmailValue(event.target.value);
                }else{
                    this.setState({valid: false});
                }
    }
    render(){
        return <input type="email" className="form-control" onInput={this.validateExpression}/>
    }
}