import * as React from 'react';
import { EmailField } from './email';
import * as axios from 'axios';
import { Password } from './password';
import { TextField, RadioButtonGroup, RadioButton, DatePicker } from 'material-ui';
// import { RadioButtonGroup } from 'material-ui/RadioButton/RadioButtonGroup';
const request = axios.default;

export class Signup extends React.Component<SignupProps, SignupState>{
    constructor(props: SignupProps) {
        super(props)
        this.state = {
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
    setPassword = (password: string) => {
        this.setState((prevState) => {
            return { password: password }
        }, this.validateAndEnableBtn);
        this.validateAndEnableBtn();
    }
    getEmailValue = (mailValue: string) => {
        this.setState((prevState) => {
            return { ...prevState, email: mailValue }
        }, this.validateAndEnableBtn);
    }
    handleBirthdate = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
        this.setState((prevState) => {
            return { ...prevState, birthdate: value }
        }, this.validateAndEnableBtn)
        this.validateAndEnableBtn();
    }
    handleInputChange = ({ target: { name, value } }: React.ChangeEvent<HTMLInputElement>) => {
        this.setState((prevState) => {
            return { ...prevState, [name]: value }
        }, this.validateAndEnableBtn)
    }
    register = (event: React.MouseEvent<HTMLButtonElement>) => {
        const r = { ...this.state }
        delete r.enabledBtn;
        delete r.redirect;//probably not necesary
        request.post('/signup', r)
            .then((result) => {
                console.log(result);
                result ? this.setState(() => ({ redirect: true })) : {}
            })
            .catch((e: Error) => e)
    }
    validateAndEnableBtn = () => {
        const values = Object.values(this.state);
        console.log(values.every(val => {
            console.log(values)
            return val != ''
        }));
        (values.every(val => val != '')) ?
            this.setState((prevState) => ({ enabledBtn: false })) :
            this.setState((prevState) => ({ enabledBtn: true }))
    }
    render() {
        return (
            <div id="signup">
                <label htmlFor="nameField">First Name</label>
                <TextField type="text" id="name" name="name" required
                    onChange={this.handleInputChange} />

                <label htmlFor="middleNameField">Middle name</label>
                <TextField type="text" id="middleName" name="middleName"
                    onChange={this.handleInputChange} />

                <label htmlFor="lastNameField">Lastname</label>
                <TextField type="text" id="lastName" name="lastName"
                    required onChange={this.handleInputChange} />

                <label htmlFor="userNameField">Username</label>
                <TextField type="text" id="userNameField" name="username" required={true}
                    onChange={this.handleInputChange} />

                <label htmlFor="birthdateField" >Birthdate</label>
                <DatePicker type="date" id="birthdateField" name="birthdate"
                    onChange={this.handleBirthdate} />

                <RadioButtonGroup name="gender" onChange={this.handleInputChange} defaultSelected={'male'}>
                    <RadioButton value="male" id="maleOpt" label='male' />
                    <RadioButton value="female" id="femaleOpt" label='female' />
                </RadioButtonGroup>
                
                <label htmlFor="">email</label>
                <EmailField setEmailValue={this.getEmailValue} />

                <label htmlFor="">Password</label>
                <Password passwordValidation={this.setPassword} />

                <button onClick={this.register} disabled={this.state.enabledBtn}>Register</button>
            </div>
        )
    }
}