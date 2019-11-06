import React, { useState, Component } from 'react';
import { connect } from 'react-redux';
import { dispatch } from 'redux';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import store from "../../../../../../store";
import { Updateuser } from '../../../../../../actions/updateActions'
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField
} from '@material-ui/core';


// const AccountDetail = (props, UpdateNewUser) => {

//   const [values, setValues] = useState({
//     firstName: 'Ayane Achraf',
//     email: 'Baka@devias.io',
//     phone: '',
//     state: 'Rabat',
//     country: 'Morocco'
//   });

//   const onsubmit = () => {
//     const newPDP = {
//       name: "hiiiiiii",
//       email: "achraf.ay1997@outlook.com"
//     };
//     UpdateNewUser(newPDP);
//   };

//   const handleChange = event => {
//     setValues({
//       ...values,
//       [event.target.name]: event.target.value
//     });
//   };

//   const states = [
//     {
//       value: 'Meknes',
//       label: 'Meknes'
//     },
//     {
//       value: 'Rabat',
//       label: 'Rabat'
//     },
//     {
//       value: 'Marrakech',
//       label: 'Marrakech'
//     }
//   ];

//   return (

//   );
// };






const states = [
  {
    value: 'Meknes',
    label: 'Meknes'
  },
  {
    value: 'Rabat',
    label: 'Rabat'
  },
  {
    value: 'Marrakech',
    label: 'Marrakech'
  }
];


class AccountDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: props.user.name,
      email: props.user.email,
      region: props.user.region,
      country: props.user.country
    };
    this.onChange = this.onChange.bind(this)
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onsubmit = (oldname) => {
    const newPDP = {
      oldname: oldname,
      name: this.state.name,
      email: this.state.email,
      region: this.state.region,
      country: this.state.country
    };
    this.props.Updateuser(newPDP);
  };

  render() {
    return (
      <div>
        <Card
        >
          <form
            autoComplete="off"
            noValidate
          >
            <CardHeader
              subheader="The information can be edited"
              title="Profile"
            />
            <Divider />
            <CardContent>
              <Grid
                container
                spacing={6}
              >
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextField
                    fullWidth
                    id="name"
                    helperText="If u wanna change your name"
                    label="Full name"
                    margin="dense"
                    name="name"
                    onChange={this.onChange}
                    required
                    value={this.state.name}
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextField
                    fullWidth
                    id="email"
                    label="Email Address"
                    margin="dense"
                    name="email"
                    onChange={this.onChange}
                    required
                    value={this.state.email}
                    variant="outlined"
                  />
                </Grid>

                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextField
                    fullWidth
                    id="region"
                    label="Select Region"
                    margin="dense"
                    name="region"
                    onChange={this.onChange}
                    required
                    select
                    // eslint-disable-next-line react/jsx-sort-props
                    SelectProps={{ native: true }}
                    value={this.state.region}
                    variant="outlined"
                  >
                    {states.map(option => (
                      <option
                        key={option.value}
                        value={option.value}
                      >
                        {option.label}
                      </option>
                    ))}
                  </TextField>
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextField
                    fullWidth
                    id="country"
                    label="Country"
                    margin="dense"
                    name="country"
                    onChange={this.onChange}
                    required
                    value={this.state.country}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </CardContent>
            <Divider />
            <CardActions>
              <Button
                OnClick={this.onsubmit(this.props.user.name)}
                color="primary"
                variant="contained"
              >
                Save details
          </Button>
            </CardActions>
          </form>
        </Card>
        {/* {AccountDetail(this.props, this.props.Updateuser)} */}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    auth: state.auth
  }
};

export default connect(
  mapStateToProps, { Updateuser }
  // useStyles
)(AccountDetails);



AccountDetails.propTypes = {
  className: PropTypes.string
};


