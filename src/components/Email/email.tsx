import * as React from 'react';
import { TextField, Paper } from 'material-ui';

export class EmailField extends React.Component<EmailProps, EmailState> {
    constructor(props: EmailProps) {
        super(props);
        this.state = { valid: false, expression: true };
    }
    validateExpression = (event: React.ChangeEvent<HTMLInputElement>) => {
        const regEx = /[a-zA-Z0-9]+\@([a-zA-Z0-9]+)\.[a-zA-Z0-9]{2,5}(\.[a-zA-Z0-9]{2,5})*$/gi;
        if ((event.target.value).match(regEx)) {
            this.props.setEmailValue(event.target.value);
            this.setState({ valid: true, expression: true });
            this.props.setEmailValue(event.target.value);
        } else {
            this.setState({ valid: false, expression: false });
        }
    }
    render() {
        return (
            <Paper>
                <TextField name="email" onChange={this.validateExpression} ref="email" />
                <p hidden={this.state.expression}>
                    this is not a valid email, example: user@myaddress.com
                    </p>
            </Paper>
        );
    }
}