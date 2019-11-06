import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import Nav from './../components/layout/Nav';
import { setAdmin } from "../../actions/authActions";
import { getPostsA, approvePost } from "../../actions/PostActions";
import { connect } from "react-redux";

import ReactTable from 'react-table';
import MaterialTable from 'material-table';
import 'react-table/react-table.css'
import './admin.css'
var p = 3;
class admin extends Component {
    editRow(value) {
        p = value;
    }
    onChangee(value) {
        const postt = {
            name: value,
        };
        this.props.approvePost(postt);
    }
    render() {
        const columns1 = [
            { title: 'Name', field: 'name' },
            { title: 'Description', field: 'descr' },
            { title: 'Image', field: 'imgPath' },
            { title: 'Date', field: 'date' },
            { title: 'Approved', field: 'approved', type: 'boolean' }
        ]
        const columns = [{
            Header: 'Name',
            accessor: 'name' // String-based value accessors!
        },
        {
            Header: 'Description',
            accessor: 'descr' // String-based value accessors!

        },
        {
            Header: 'Image',
            accessor: 'imgPath' // String-based value accessors!

        },
        {
            Header: 'Date',
            accessor: 'date' // String-based value accessors!

        },
        {
            id: 'edit',
            accessor: '[row identifier to be passed to button]',
            Cell: ({ value }) => (<button onClick={this.editRow({ value })}>Edit</button>)
        }
            ,
        {
            id: 'eddt',
            accessor: '[row identifier to be passed to button]',
            Cell: ({ value }) => (<button onClick={() => { console.log('clicked value', value) }}>Button</button>)
        }

        ]

        return (
            <div >
                {/* className="ReactTable" */}
                {/* <ReactTable
                    data={this.props.posts}
                    columns={columns}
                /> */}
                {this.props.setAdmin()}
                <MaterialTable
                    title="Posts Table"
                    columns={columns1}
                    data={this.props.posts}
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
        )
    }
}
const mapStateToProps = state => ({
    posts: state.getPosts.postsA,
    admin: state.auth.admin
});
export default connect(
    mapStateToProps,
    { setAdmin, getPostsA, approvePost }
)(admin);


