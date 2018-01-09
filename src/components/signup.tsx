import * as React from 'react';
import {EmailField} from './email';

export class Signup extends React.Component<SignupProps, SignupState>{
    constructor(props: SignupProps){
        super(props)
    }
    getEmailValue=(mailValue: string)=>{
        this.setState({email: mailValue});
    }
    setName= (event: React.ChangeEvent<HTMLInputElement>)=>{
        this.setState({name: event.target.value});
    }
    setMiddleName= (event: React.ChangeEvent<HTMLInputElement>)=>{
        this.setState({middleName: event.target.value});
    }
    setLastName= (event: React.ChangeEvent<HTMLInputElement>)=>{
        this.setState({lastName: event.target.value});
    }
    setUserName=(event: React.ChangeEvent<HTMLInputElement>)=>{
        this.setState({userName: event.target.value});
    }
    render(){
        return (
            <div id="signup" className="form-group">
                <label htmlFor="nameField">First Name</label>
                <input type="text" id="nameField" required className="form-control"/>
                <label htmlFor="middleNameField">Middle name</label>
                <input type="text" id="middleNameField" className="form-control"/>
                <label htmlFor="lastNameField">Lastname</label>
                <input type="text" id="lastNameField" required className="form-control"/>
                <label htmlFor="">email</label>
                <EmailField setEmailValue={this.getEmailValue}/>               
                <label htmlFor="userNameField">Username</label>
                <input type="text" required={true} className="form-control" id="userNameField"/>
                <label htmlFor="birthdateField">Birthdate</label>
                <input type="date" id="birthdateField" className="form-control"/>
                <label htmlFor="sexField">Sex</label>
                <div id="sexField" className="form-check">
                    <label htmlFor="maleOpt" className="form-check-label">Male</label>
                    <input type="radio" name ="gender" value="male" checked className="form-check-input" id="maleOpt"/>
                    <label htmlFor="femaleOpt" className="form-check-label">Female</label>
                    <input type="radio" name = "gender" value="female" className="form-check-input" id="femaleOpt"/>
                </div>
                <button className="btn btn-primary" >Register</button>
            </div>
        )
    }
}