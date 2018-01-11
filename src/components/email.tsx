import * as React from 'react';

export class EmailField extends React.Component<emailProps, emailState>{
    constructor(props: emailProps){
        super(props)
        this.state={valid: false, expression: true}
    }
    validateExpression=(event: React.ChangeEvent<HTMLInputElement>)=>{
        const regEx = /[a-zA-Z0-9]+\@([a-zA-Z0-9]+)\.[a-zA-Z0-9]{2,5}(\.[a-zA-Z0-9]{2,5})*$/gi;
                if((event.target.value).match(regEx)){
                    this.props.setEmailValue(event.target.value);
                    this.setState({valid: true, expression: true});
                    this.props.setEmailValue(event.target.value);
                }else{
                    this.setState({valid: false, expression: false});
                }
    }
    render(){
        return <div>
                <input type="email" className="form-control" onInput={this.validateExpression}/>
                <p hidden={this.state.expression} className="has-warning">
                    this is not a valid email, example: user@myaddress.com
                    </p>
                </div>
            

    }
}