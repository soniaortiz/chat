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

interface Contact {
    contact_id: string;
    contactName: string;
}
interface Conversation {
    conversation_id: string;
    conversationName: string;
}
declare namespace AppStore {//store
    interface App {
        logged: boolean;
        loading: boolean;
        requestWindowOpened: boolean;
        conversationSelected: boolean;
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
        contactList: Array<Contact>;
        conversations: Array<Conversation>;
    }
    interface conversations extends Array<Conversation> { }
    interface messages { }
    interface store {
        app: App;
        user: User;
        conversations: conversations;
        messages: messages;
        // contacts: contacts;
    }
}