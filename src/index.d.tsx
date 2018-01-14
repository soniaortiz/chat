interface PasswordProps{
    passwordValidation: Function 
}

interface passwordState{
    password: string,
    confirmationPassword: string
    disable: boolean
}

interface emailProps{
    setEmailValue: Function,
}

interface emailState{
    valid: boolean,
    expression: boolean

}

interface SignupProps{
}
interface SignupState{
    name: string,
    middleName: string,
    lastName: string, 
    username: string,
    birthdate: any,//change to Date
    gender: string,
    email: string,
    password: string,
    enabledBtn: boolean,
    // redirect: boolean
}
interface LoginProps{
}
interface LoginState{//from child
    email: string,
    password: string,
    redirect: boolean
}
interface DashboardProps{

}
interface DashboardState{

}
interface SidebarProps{

}
interface SidebarState{

}
