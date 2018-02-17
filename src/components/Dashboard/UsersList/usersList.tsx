// import * as React from 'react';
// import { MenuItem, AutoComplete } from 'material-ui';

// interface UserListProps {
//     users: Array<any>,
//     onChange: any
// }

// export class UsersList extends React.Component<UserListProps> {
//     mySource: Array<any> = [];
//     constructor(props: UserListProps) {
//         super(props);
//     }
//     render() {
//         this.mySource = this.props.users.map((user, index) => {
//             return ({
//                 text: user.name,
//                 value: (
//                     < MenuItem
//                         key={index}
//                         id={index.toString()}
//                         primaryText= {this.props.users[1].email}
//                     />
//                 )
//             });
//         });

//         console.log(this.mySource);
//         return (
//             <AutoComplete
//             onNewRequest ={this.props.onChange}
//                 dataSource={this.mySource}
//             />
//             // '<div></div>'
//         );

//     }
// }

