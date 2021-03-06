import * as React from 'react';
import { Paper } from 'material-ui';

export class Password extends React.Component<PasswordProps, PasswordState> {
    constructor(props: PasswordProps) {
        super(props);
        this.state = {
            password: '',
            confirmationPassword: '',
            disable: true
        };
    }
    enableSecondPasswordInput = (
        { target: { value: { length } }, target: { value } }: 
        React.ChangeEvent<HTMLInputElement>
    ) => {
        if (length < 8) {
            this.setState({ disable: true, password: value, confirmationPassword: '' });
            this.props.passwordValidation('');
        } else {
            this.setState({ disable: false, password: value });
        }
    }
    matchPassword = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
        this.setState(() => ({ confirmationPassword: value }));
        (RegExp('^' + this.state.password + '$').test(value)) ?
            this.props.passwordValidation(value) : this.props.passwordValidation('');
    }

    render() {
        return (
            <Paper>
            <input type="password" onChange={this.enableSecondPasswordInput} value={this.state.password} />
            <p hidden={!this.state.disable}>The password must contain at least 8 characters</p>
            <p>Confirm password</p>
            <input type="password" disabled={this.state.disable} value={this.state.confirmationPassword}
                ref="confirmPassword" onChange={this.matchPassword} />
            </Paper>
        );
    }
}