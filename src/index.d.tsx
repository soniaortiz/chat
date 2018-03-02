interface PasswordProps {
    passwordValidation: Function;
}
interface passwordState {
    password: string;
    confirmationPassword: string;
    disable: boolean;
}
interface emailProps {
    setEmailValue: Function;
}
interface emailState {
    valid: boolean;
    expression: boolean;
}
interface SignupProps {
}
interface SignupState {
    redirect: boolean;
    name: string;
    middleName: string;
    lastName: string;
    username: string;
    birthdate: any; //change to Date
    gender: string;
    email: string;
    password: string;
    enabledBtn: boolean;
}
interface LoginState {//from child
    email: string;
    password: string;
    redirect: boolean;
    open: boolean;
}
interface DashboardProps {
}
interface DashboardState {
}
interface SidebarProps {
}
interface SidebarState {
}

interface UserContact {
    name: string;
    middleName: string;
    lastName: string;
    gender: string;
    email: string;
}

interface contact {
    contact_id: string;
    contactName: string;
}
interface conversation {
    conversation_id: string;
    conversationName: string;
}
declare namespace AppStore {//store
    interface App {
        logged: boolean;
        loading: boolean;
        requestWindowOpened: boolean;
        newContactRequests: Array<string>;
    }
    interface User {
        name: string;
        middleName: string;
        lastName: string;
        email: string;
        birthdate: Date;
        gender: string;
        avatar: string;
        friendRequests: string[];
        contactList: Array<contact>;
        conversations: Array<conversation>;
    }
    interface conversations extends Array<conversation> { }
    interface messages { }
    interface store {
        app: App;
        user: User;
        conversations: conversations;
        messages: messages;
        // contacts: contacts;
    }
}