import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import classes from "./DefaultUsers.module.css";

const DefaultUsers = () => {

    return (
        <MDBTable responsive hover striped borderColor="dark" className={classes["users-container"]}>
            <MDBTableHead>
                <tr>
                    <th scope='col'>User Type</th>
                    <th scope='col'>Email</th>
                    <th scope='col'>Password</th>
                </tr>
            </MDBTableHead>
            <MDBTableBody>
                <tr>
                    <th scope='row'>Admin</th>
                    <td>admin@admin.com</td>
                    <td>123456</td>
                </tr>
                <tr>
                    <th scope='row'>User</th>
                    <td>user@user.com</td>
                    <td>112233</td>
                </tr>
                <tr>
                    <th scope='row'>User</th>
                    <td>elon.musk@tesla.com</td>
                    <td>model3</td>
                </tr>
            </MDBTableBody>
        </MDBTable>
    );
}

export default DefaultUsers;