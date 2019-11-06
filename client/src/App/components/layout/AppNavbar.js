import React, { Component } from 'react';
import { loginUser } from "../../../actions/authActions";
import PropTypes from "prop-types";
import ButtonAppBar from "./Nav";
import { connect } from "react-redux";
import { Helmet } from 'react-helmet';
import { logoutUser } from '../../../actions/authActions';
import { FetchUser } from '../../../actions/getUserAction';
import { getPosts } from '../../../actions/PostActions';
import { getPostsA, getCV } from "../../../actions/PostActions";

import { push } from 'react-router-redirect';

// import { makeStyles } from '@material-ui/core/styles';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';


import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container
} from 'reactstrap';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));
const SampleFab = (name, isAuth, logg, admin, history) => {

  return (
    <div flexGrow="1">
      <AppBar position="static">
        <Toolbar>
          <Helmet>
            {admin ? <style>{'body { background-image: url("https://absoluteinsurance.ca/wp-content/uploads/2014/10/professional.jpg" ); backgroundSize: "cover"; overflow: "hidden";backgroundRepeat  : "no-repeat"; backgroundPosition: "center" }'}</style> : <style>{'body { background-image: url("https://benjaminspencer.me/images/uploads/linkedin.jpg" ); backgroundSize: "cover"; overflow: "hidden";backgroundRepeat  : "no-repeat"; backgroundPosition: "center" }'}</style>}
          </Helmet>
          {isAuth ? <Button className="Button" color="primary"> Profile dssdsdsds</Button> : <div></div>}
          <Button href="/HomePage" color="inherit"><SupervisedUserCircleIcon style={{ fontSize: 40, marginright: -20 }} href="/HomePage"></SupervisedUserCircleIcon></Button>
          {admin ?
            <Typography style={{ paddingLeft: 15 }} variant="h6">
              Welcome Admin !
          </Typography>
            :
            (isAuth ?
              <Typography style={{ paddingLeft: 15 }} variant="h6">
                Welcome {name} !
          </Typography>
              :

              <Typography style={{ paddingLeft: 15 }} variant="h6" >
                Please Login !
          </Typography>
            )
          }


          {admin ? <Button className="Button" color="primary">jksjksarfrffsfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffklaskas</Button> :
            (isAuth ? <Button className="Button" color="inherit" color="primary"> eeeeeeeeeeeeeeeezzzzzzzzzzzzzdddddddzzzzzzzzzzzzzzzzzzzzzzzzzzzssddddddd                 </Button> : <Button className="Button" color="inherit" color="primary">    dddddffffffeeeeeeeeeeeeeeeeeeeddddddddddddddddddd qsdddddddddddddddeeessssss                 </Button>)
          }
          {admin ? <Button className="Button" color="inherit" href="/admin"> Posts </Button> :
            (isAuth ? <Button className="Button" color="inherit" href="/profile"> Profile </Button> : <Button className="Button" color="inherit" href="/addCV">Post Your CV  </Button>)
          }
          {admin ? <div><Button className="Button" color="inherit" href="/adminCv"> CV </Button></div> :
            (isAuth ? <Button className="Button" color="inherit" onClick={logg}>Logout</Button> : <div><Button className="Button" color="inherit" href="/register">Register  </Button> <Button className="Button" color="inherit" href="/login">Login</Button></div>)
          }
          {admin ? <Button className="Button" color="inherit" onClick={() => {
            push("/HomePage");
          }}>Logout</Button> :
            <div></div>
          }

        </Toolbar>
      </AppBar>



      {
        isAuth ? <Drawer
          variant="permanent"
          anchor="left"
        >
          <div />
          <Divider />
          <List>
            {['Inbox', 'Add Post', 'Send email', 'Drafts'].map((text, index) => (
              <ListItem button key={text} component="a" href="/addPost">
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Drawer> : <Button className="Button" color="primary"> </Button>
      }



    </div >
  );
}

class AppNavbar extends Component {

  constructor() {
    super();
    this.state = {
      name: "",
      isOpen: false
    };
  }
  render() {
    return (
      <div>
        {this.props.getPosts()}
        {this.props.getCV()}
        {this.props.getPostsA()}
        {this.props.FetchUser()}
        {SampleFab(this.props.name, this.props.auth.isAuthenticated, this.props.logoutUser, this.props.admin, this.props.history)}
      </div>
    );
  }
}
AppNavbar.propTypes = {
  name: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired
  // classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {

    name: state.auth.user.name,
    auth: state.auth,
    admin: state.auth.admin
  }
};

export default connect(
  mapStateToProps, { logoutUser, FetchUser, getPosts, getPostsA, getCV }
  // useStyles
)(AppNavbar);