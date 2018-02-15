import * as React from 'react';
import { EmailField } from '../Email/email';
import * as axios from 'axios';
import { Password } from '../Password/password';
import { TextField, RadioButtonGroup, RadioButton, DatePicker, Divider } from 'material-ui';
import { Redirect } from 'react-router-dom';
import './style.css';

const request = axios.default;

export class Signup extends React.Component<SignupProps, SignupState> {
    constructor(props: SignupProps) {
        super(props);
        this.state = {
            redirect: true,
            name: '',
            middleName: '',
            lastName: '',
            username: '',
            birthdate: '',
            gender: '',
            email: '',
            password: '',
            enabledBtn: true
        };
    }
    setPassword = (password: string) => {
        this.setState(
            (prevState) => {
                return { password: password };
            },
            this.validateAndEnableBtn);
        this.validateAndEnableBtn();
    }
    getEmailValue = (mailValue: string) => {
        this.setState(
            (prevState) => {
                return { ...prevState, email: mailValue };
            },
            this.validateAndEnableBtn);
    }
    handleBirthdate = (event: React.ChangeEvent<HTMLInputElement>, date: Date) => {
        this.setState(
            (prevState) => {
                return { ...prevState, birthdate: date };
            },
            this.validateAndEnableBtn);
        this.validateAndEnableBtn();
    }
    handleInputChange = ({ target: { name, value } }: React.ChangeEvent<HTMLInputElement>) => {
        this.setState(
            (prevState) => {
                return { ...prevState, [name]: value };
            },
            this.validateAndEnableBtn);
    }
    register = (event: React.MouseEvent<HTMLButtonElement>) => {
        const r = { ...this.state };
        request.post('/signup', r)
            .then((result) => {
                this.setState(() => ({ redirect: false }));
            })
            .catch((e: Error) => e);
    }
    validateAndEnableBtn = () => {
        const values = Object.values(this.state);
        // console.log(values.every(val => {
        //     console.log(values);
        //     return val != '';
        // }));
        (values.every(val => val != '')) ?
            this.setState((prevState) => ({ enabledBtn: false })) :
            this.setState((prevState) => ({ enabledBtn: true }));
    }
    render() {
        if (!(this.state.redirect)) {
            return <Redirect to="/login" />;
        }
        return (
            <div id="signup" className={'form'}>
                <label htmlFor="nameField">First Name </label>
                <TextField type="text" id="name" name="name" required
                    onChange={this.handleInputChange} />
                <Divider />

                <label htmlFor="middleNameField">Middle name </label>
                <TextField type="text" id="middleName" name="middleName"
                    onChange={this.handleInputChange} />
                <Divider />

                <label htmlFor="lastNameField">Lastname </label>
                <TextField type="text" id="lastName" name="lastName"
                    required onChange={this.handleInputChange} />
                <Divider />

                <label htmlFor="userNameField">Username </label>
                <TextField type="text" id="userNameField" name="username" required={true}
                    onChange={this.handleInputChange} />
                <Divider />

                <label htmlFor="birthdateField" >Birthdate </label>
                <DatePicker name="birthdate"
                    onChange={this.handleBirthdate} />
                <Divider />
                <label htmlFor="">Gender</label>
                <RadioButtonGroup name="gender" onChange={this.handleInputChange}>
                    <RadioButton value="male" id="maleOpt" label="male" />
                    <RadioButton value="female" id="femaleOpt" label="female" />
                </RadioButtonGroup>
                <Divider />

                <label htmlFor="">email </label>
                <EmailField setEmailValue={this.getEmailValue} />
                <Divider />

                <label htmlFor="">Password </label>
                <Password passwordValidation={this.setPassword} />
                <Divider />

                <button onClick={this.register} disabled={this.state.enabledBtn}>Register </button>
            </div>
        );
    }
}