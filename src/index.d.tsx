interface passwordProperties{
}

interface passwordState{
}

interface emailProps{
    setEmailValue: Function
}

interface emailState{
    valid: boolean
}

interface SignupProps{
}
interface SignupState{
    name: string,
    middleName: string,
    lastName: string, 
    username: string,
    birthdate: Date,
    gender: string,
    email: string,
    password: string
}
interface LoginProps{
}
interface LoginState{//from child
    email: string,
    password: string
}
