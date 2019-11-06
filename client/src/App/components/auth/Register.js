import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import Select from 'react-select';
import AsyncSelect from 'react-select/async';
import { connect } from "react-redux";
import { registerUserP, registerUserI, registerUserCV } from "../../../actions/authActions";
import classnames from "classnames";
import zIndex from "@material-ui/core/styles/zIndex";
class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      country: "",
      region: "",
      typeUser: "",
      errors: {}
    };
  }
  // componentDidMount() {
  //   // If logged in and user navigates to Register page, should redirect them to dashboard
  //   if (this.props.auth.isAuthenticated) {
  //     this.props.history.push("/dashboard");
  //   }
  // }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }
  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  onChangeBaka1 = newValue => {
    console.log(newValue);
    this.setState({ country: newValue });
  };
  onChangeBaka2 = newValue => {
    this.setState({ region: newValue });
  };
  onChangeBaka3 = newValue => {
    this.setState({ typeUser: newValue });
  };
  handleChange(event) {
    let value = event.target.value;
    this.setState({
      disabled: value
    });
  }
  onSubmit = e => {
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
      region: this.state.region,
      country: this.state.country
    };
    console.log(newUser);
    if (this.state.email == "achraf.ay1997@gmail.com") { this.props.registerUserP(newUser, this.props.history); }
    else if (this.state.email == "achraf.ayano1997@outlook.com") { this.props.registerUserI(newUser, this.props.history); }
    // else if (this.state.email == "achraf.ayane@um5s.net.ma") { this.props.registerUserCV(newUser, this.props.history); }
    else this.props.registerUserP(newUser, this.props.history);
  };
  render() {
    const { errors } = this.state;
    const baka1 = { value: 'Select Country', label: 'Select Country...' };
    const baka2 = { value: 'Investisseur', label: 'Investisseur' };
    const countries = [
      { value: 'Morocco', label: 'Morocco' },
      { value: 'France', label: 'France' },
      { value: 'Spanish', label: 'Spanish' }
    ];
    const regions = [
      { value: 'Rabat', label: 'Rabat' },
      { value: 'Meknes', label: 'Meknes' },
      { value: 'Marrakech', label: 'Marrakech' }
    ];
    const types = [
      { value: 'Porteur de CV', label: 'Porteur de CV' },
      { value: 'Porteur de Projet', label: 'Porteur de Projet' },
      { value: 'Investisseur', label: 'Investisseur' }
    ]

    return (
      <div className="container">
        <div className="row">
          <div className="col s8 offset-s2">
            <Link to="/" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to
              home
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Register</b> below
              </h4>
              <p className="grey-text text-darken-1">
                Already have an account? <Link to="/login">Log in</Link>
              </p>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.name}
                  error={errors.name}
                  id="name"
                  type="text"
                  className={classnames("", {
                    invalid: errors.name
                  })}
                />
                <label htmlFor="name">Name</label>
                <span className="red-text">{errors.name}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  type="email"
                  className={classnames("", {
                    invalid: errors.email
                  })}
                />
                <label htmlFor="email">Email</label>
                <span className="red-text">{errors.email}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password
                  })}
                />
                <label htmlFor="password">Password</label>
                <span className="red-text">{errors.password}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.password2}
                  error={errors.password2}
                  id="password2"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password2
                  })}
                />
                <label htmlFor="password2">Confirm Password</label>
                <span className="red-text">{errors.password2}</span>
              </div>
              <div className="input-field col s12">
                <Select
                  // onChange={this.onChangeBaka1.bind(this)}
                  onChange={this.onChangeBaka1.bind(this)}
                  value={this.state.country}
                  id="country"
                  type="country"
                  defaultValue={baka1}
                  options={countries} />
              </div>
              <div className="input-field col s12">
                <Select
                  onChange={this.onChangeBaka2.bind(this)}
                  value={this.state.region}
                  id="region"
                  type="region"
                  defaultValue={baka2}
                  options={regions} />
              </div>
              <div className="input-field col s12">
                <select id="lang" onChange={this.onChangeBaka3} value={this.state.typeUser}>
                  <option value="Investisseur">Investisseur</option>
                  <option value="Java">Java</option>
                  <option value="C++">C++</option>
                </select>
              </div>
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <button
                  style={{
                    width: "150px",
                    zIndex: 0,
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div >
    );
  }
}
Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUserI, registerUserP, registerUserCV }
)(withRouter(Register));