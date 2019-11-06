import React, { Component } from 'react';
import { setAdmin } from "../../actions/authActions";
import MaterialTable from 'material-table';
import { approveCV } from "../../actions/PostActions";
import { connect } from "react-redux";

class adminCv extends Component {
    onChangee(value) {
        const postt = {
            name: value,
        };
        this.props.approveCV(postt);
    }
    render() {
        const columns1 = [
            { title: 'Name', field: 'name' },
            { title: 'Email', field: 'email' },
            { title: 'FilePath', field: 'filePath' },
            { title: 'Date', field: 'date' },
            { title: 'Approved', field: 'approved', type: 'boolean' }
        ]
        return (
            <div><br />
                {this.props.setAdmin()}
                <MaterialTable
                    title="CV Table"
                    columns={columns1}
                    data={this.props.cv}
                    actions={[
                        {
                            icon: 'save',
                            tooltip: 'Save User',
                            onClick: (event, rowData) => {
                                this.onChangee(rowData.name);
                            }
                        }
                    ]} />



            </div>
        );
    }
}
const mapStateToProps = state => ({
    cv: state.getPosts.CV,
    admin: state.auth.admin
});
export default connect(
    mapStateToProps,
    { setAdmin, approveCV }
)(adminCv);


