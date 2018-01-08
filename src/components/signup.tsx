import * as React from 'react';

const EmailField=()=>{
    return <input type="email" className="form-control"/>
}

export class Signup extends React.Component{
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
                <EmailField />               
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