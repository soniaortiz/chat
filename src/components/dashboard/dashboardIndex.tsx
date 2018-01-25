import * as React from 'react';
import { connect, DispatchProp } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { CircularProgress, Table, TableBody, TableHeader,  TableRowColumn } from 'material-ui';
import { RequestUserInfo } from '../../store/userActions';
import { TableRow } from 'material-ui/Table';
import { Sidebar } from '../Dashboard/Sidebar/sidebar';

interface DashboardProps extends DispatchProp<{}>, RouteComponentProps<{}> {
    getUser: () => Promise<boolean>,
    user: AppStore.user
}

export class Dashboard extends React.Component<DashboardProps, DashboardState> {
    componentDidMount() {
        this.props.getUser()
            .then(() => console.log(this.props.user)); // ""
    }
    render() {
        if (this.props.user.name)
            return (
                <Table selectable={false} >
                    <TableHeader displaySelectAll={false}>
                    </TableHeader>

                    <TableBody displayRowCheckbox={false}>
                        <TableRow>
                            <TableRowColumn>
                                <Sidebar/>
                            </TableRowColumn>
                            <TableRowColumn>
                                <div>
                                    will contain the 
                                </div>
                            </TableRowColumn>
                        </TableRow>
                    </TableBody>

                </Table>
            );
        return <CircularProgress />;
    }
}

export default connect<{}, {}, DashboardProps, AppStore.store>(
    (store) => ({
        user: store.user
    }),
    {
        getUser: RequestUserInfo
    }
)(Dashboard);