import * as React from 'react';
import {EmailField} from './email';
import * as axios from 'axios';
import {Password} from './password';
const request = axios.default;

export class Signup extends React.Component<SignupProps, SignupState>{
    constructor(props: SignupProps){
        super(props)
    }
    setPassword=(password: string)=>{
        console.log("password")
        this.setState({password: password});
    }
    getEmailValue=(mailValue: string)=>{
        this.setState({email: mailValue});
    }
    handleBirthdate=({target: {value}}: React.ChangeEvent<HTMLInputElement>)=>{
        this.setState({birthdate: new Date(value)});
    }
    handleInputChange= ({target: {name, value}}: React.ChangeEvent<HTMLInputElement>)=>{
        this.setState((prevState, props)=>{
            // console.log(this.state, prevState);
            return {...prevState, [name]: value}
        });
    }
    register=(event: React.MouseEvent<HTMLButtonElement>)=>{
        console.log({...this.state});
        request.post('/signup', {...this.state})
        .then((result)=>{
            console.log(result);
        })
        .catch((e: Error)=>e)
    }
    render(){
        return (
            <div id="signup" className="form-group">
                <label htmlFor="nameField">First Name</label>
                    <input type="text" id="name" name="name" required className="form-control" onChange={this.handleInputChange}/>
                <label htmlFor="middleNameField">Middle name</label>
                    <input type="text" id="middleName" name="middleName" className="form-control" onChange={this.handleInputChange}/>
                <label htmlFor="lastNameField">Lastname</label>
                    <input type="text" id="lastName" name="lastName" required className="form-control" onChange={this.handleInputChange}/>
                <label htmlFor="">email</label>
                    <EmailField setEmailValue={this.getEmailValue}/>  
                <label htmlFor="">Password</label>
                    <Password passwordValidation={this.setPassword}/>            
                <label htmlFor="userNameField">Username</label>
                    <input type="text" id="userNameField" name= "useraame" required={true} className="form-control"  onChange={this.handleInputChange}/>
                <label htmlFor="birthdateField" >Birthdate</label>
                    <input type="date" id="birthdateField" name="birthdate" className="form-control" onChange={this.handleBirthdate}/>
                <label htmlFor="sexField" >Sex</label>
                    <div id="sexField" className="form-check">
                        <label htmlFor="maleOpt" className="form-check-label">Male</label>
                        <input type="radio" name ="gender" onChange={this.handleInputChange} value="male" checked className="form-check-input" id="maleOpt" />
                        <label htmlFor="femaleOpt" className="form-check-label">Female</label>
                        <input type="radio" name = "gender" onChange={this.handleInputChange} value="female" className="form-check-input" id="femaleOpt"/>
                    </div>
                <button className="btn btn-primary" onClick={this.register} disabled={true}>Register</button>
            </div>
        )
    }
}