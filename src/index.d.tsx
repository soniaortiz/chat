interface PasswordProps {
    passwordValidation: Function;
}
interface PasswordState {
    password: string;
    confirmationPassword: string;
    disable: boolean;
}
interface EmailProps {
    setEmailValue: Function;
}
interface EmailState {
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
interface LoginState { // from child
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
    _id?: string;
    conversation_id: string;
    conversationName: string;
    participants: Array<Partial<AppStore.User>>;
    messages: Array<AppStore.Messages>;
}
declare namespace AppStore {// store
    interface App {
        logged: boolean;
        loading: boolean;
        requestWindowOpened: boolean;
        conversationSelected: boolean;
        currentConversation: string;
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
    interface Conversations extends Array<Conversation> { }
    interface Messages {
        _id: string;
        messageContent: string;
        date: string;
        sender: string;
     }
    interface Store {
        app: App;
        user: User;
        conversations: Conversations;
        messages: Messages;
        // contacts: contacts;
    }
}