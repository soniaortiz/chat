import * as React from 'react';
import {EmailField} from './email';
import * as axios from 'axios';
import {Password} from './password';
const request = axios.default;

export class Signup extends React.Component<SignupProps, SignupState>{
    constructor(props: SignupProps){
        super(props)
        this.state={
             name: '',
             middleName: '',
             lastName: '', 
             username: '',
             birthdate: '',
             gender: '',
             email: '',
             password: '',
             enabledBtn: true,
             redirect: false
            }         
    }
    setPassword=(password: string)=>{
        this.setState((prevState)=>{
            return {password: password}
        }, this.validateAndEnableBtn);
        this.validateAndEnableBtn();
    }
    getEmailValue=(mailValue: string)=>{
        this.setState((prevState)=>{
            return {...prevState, email: mailValue}
        }, this.validateAndEnableBtn);
    }
    handleBirthdate=({target: {value}}: React.ChangeEvent<HTMLInputElement>)=>{
        this.setState((prevState)=>{
            return{...prevState, birthdate: value}
        }, this.validateAndEnableBtn)
        this.validateAndEnableBtn();
    }
    handleInputChange= ({target: {name, value}}: React.ChangeEvent<HTMLInputElement>)=>{
        this.setState((prevState)=>{
            return { ...prevState,[name]: value}
        }, this.validateAndEnableBtn)
     }
    register=(event: React.MouseEvent<HTMLButtonElement>)=>{
        const r = {...this.state}
        delete r.enabledBtn;
        delete r.redirect;//probably not necesary

        request.post('/signup', r)
        .then((result)=>{
            console.log(result);
            result? this.setState(()=>({redirect: true})): {}            
        })
        .catch((e: Error)=>e)
    }
    validateAndEnableBtn=()=>{
        const values = Object.values(this.state);
            console.log(values.every(val=>{
                console.log(values)
                return val!=''}));
            (values.every(val=>val!=''))?
                this.setState((prevState)=>({enabledBtn: false})):
                this.setState((prevState)=>({enabledBtn: true}))
    }
    render(){
        return (
            <div id="signup" className="form-group">
                <label htmlFor="nameField">First Name</label>
                    <input type="text" id="name" name="name" required 
                    className="form-control" onChange={this.handleInputChange}/>

                <label htmlFor="middleNameField">Middle name</label>
                    <input type="text" id="middleName" name="middleName" 
                    className="form-control" onChange={this.handleInputChange}/>

                <label htmlFor="lastNameField">Lastname</label>
                    <input type="text" id="lastName" name="lastName" 
                    required className="form-control" onChange={this.handleInputChange}/>

                <label htmlFor="userNameField">Username</label>
                    <input type="text" id="userNameField" name= "username" required={true} 
                    className="form-control"  onChange={this.handleInputChange}/>

                <label htmlFor="birthdateField" >Birthdate</label>
                    <input type="date" id="birthdateField" name="birthdate" 
                    className="form-control" onChange={this.handleBirthdate}/>

                <label htmlFor="sexField" >Sex</label>
                    <div id="sexField" className="form-check">
                        <label htmlFor="maleOpt" className="form-check-label">Male</label>
                        <input type="radio" name ="gender" onChange={this.handleInputChange} value="male" 
                        className="form-check-input" id="maleOpt" />

                        <label htmlFor="femaleOpt" className="form-check-label">Female</label>
                        <input type="radio" name = "gender" onChange={this.handleInputChange} value="female" 
                        className="form-check-input" id="femaleOpt"/>
                    </div>

                <label htmlFor="">email</label>
                    <EmailField setEmailValue={this.getEmailValue}/>  

                <label htmlFor="">Password</label>
                    <Password passwordValidation={this.setPassword}/>     

                <button className="btn btn-primary" onClick={this.register} disabled={this.state.enabledBtn}>Register</button>
            </div>
        )
    }
}