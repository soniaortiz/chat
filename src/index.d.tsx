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
    redirect: boolean,
    name: string,
    middleName: string,
    lastName: string, 
    username: string,
    birthdate: any,//change to Date
    gender: string,
    email: string,
    password: string,
    enabledBtn: boolean,
}
interface LoginProps extends loginReducersToProps, loginMapToProps{
}
interface LoginState{//from child
    email: string,
    password: string,
    redirect: boolean,
    open: boolean
}
interface DashboardProps{
}
interface DashboardState{
}
interface SidebarProps{
}
interface SidebarState{
}
interface AppStore{
    app: { logged: boolean}
}
interface loginMapToProps{
    isLogged: boolean
}
interface loginReducersToProps{
    login : any
}
