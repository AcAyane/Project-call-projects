import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { FetchUser } from "../../actions/getUserAction";
import classnames from "classnames";

class GetUserC extends Component {

    constructor() {
        super();
        this.state = {
            username: "",
            errors: {}
        };
    }

    CallGetUser() {
        this.props.FetchUser();
    }

    render() {
        return (
            <div>
                <button
                    style={{
                        width: "150px",
                        borderRadius: "3px",
                        letterSpacing: "1.5px",
                        marginTop: "1rem"
                    }}
                    onClick={this.CallGetUser()}
                    className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                    Get the User : {this.username}
                </button>
                <h1>{this.username}</h1>
            </div>
        );
    };
}

GetUserC.propTypes = {
    GetUser: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    username: state.username,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { FetchUser }
)(GetUserC);
