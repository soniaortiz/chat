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
    email: string,
    userName: string,
    password: string    
}
interface LoginProps{
    // email: string,
    // password: string
}
interface LoginState{//from child
    email: string,
    password: string
}
