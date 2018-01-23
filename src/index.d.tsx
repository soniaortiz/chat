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
interface AppStore{//store
    app: { 
            logged: boolean,
        },
    me: {
        userData: any
    }
}
interface loginMapToProps{//store state to props in the component
    isLogged: boolean,
}
interface loginReducersToProps{//props from the component to the store
    login : any  //function to manipulate the state of the store
}