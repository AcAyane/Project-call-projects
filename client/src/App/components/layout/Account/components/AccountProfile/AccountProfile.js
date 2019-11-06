import React from 'react';
import axios from "axios";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import clsx from 'clsx';
import moment from 'moment';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardActions,
  CardContent,
  Avatar,
  Typography,
  Divider,
  Button,
  LinearProgress
} from '@material-ui/core';

import { FetchUser } from '../../../../../../actions/getUserAction';
// import { getUser } from '../../../../../../actions/authActions';

const avatar1 = require("./avatar_5.png");
const getUser = () => {
  axios.get("/api/users").then(res => console.log(res.data));
};
const user = axios.get("/api/users").then(res => res.data);
// const user = fetch("/api/users").then(response => response.json());

const useStyles = makeStyles(theme => ({
  root: {},
  details: {
    display: 'flex'
  },
  avatar: {
    marginLeft: 'auto',
    height: 110,
    width: 100,
    flexShrink: 0,
    flexGrow: 0
  },
  progress: {
    marginTop: theme.spacing(2)
  },
  uploadButton: {
    marginRight: theme.spacing(2)
  }
}));

const AccountProfile = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  console.log(user);
  // const user = {
  //   name: 'Shen Zhi',
  //   city: 'Rabat',
  //   country: 'Morocco',
  //   timezone: 'GTM-7',
  //   avatar: avatar1
  // };

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent>
        <div className={classes.details}>
          <div>
            <Typography
              gutterBottom
              variant="h4"
            >
              {props.name.name}

            </Typography>
            <Typography
              className={classes.locationText}
              color="textSecondary"
              variant="body1"
            >
              {props.name.region}, {props.name.country}
            </Typography>
            <Typography
              className={classes.dateText}
              color="textSecondary"
              variant="body1"
            >
              {moment().format('hh:mm A')} ({"AM"})
            </Typography>
          </div>

          <AccountBoxIcon style={{ fontSize: 80, marginLeft: 60 }}></AccountBoxIcon>
        </div>
        <div className={classes.progress}>
          <Typography variant="body1">Profile Completeness: 70%</Typography>
          <LinearProgress
            value={70}
            variant="determinate"
          />
        </div>
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          className={classes.uploadButton}
          color="primary"
          variant="text"
        >
          Upload picture
        </Button>
        <Button variant="text">Remove picture</Button>
      </CardActions>
    </Card>
  );
};

AccountProfile.propTypes = {
  className: PropTypes.string,
  // user: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    name: state.auth.user,
    user: state.getUser.username
  }
};


export default connect(
  mapStateToProps, { FetchUser }
  // useStyles
)(AccountProfile);
