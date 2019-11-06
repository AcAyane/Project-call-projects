import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Counting from "../components/counting";
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Post from '../components/layout/Post'
import {
  Card,
  CardHeader,
  CardActions,
  CardContent,
  Avatar,
  Typography,
  Divider,
  Button,
  LinearProgress
} from '@material-ui/core';

import { getPosts } from '../../actions/PostActions';
import { connect } from "react-redux";

class Home extends Component {

  render() {
    // var rows = [];
    // for (var i = 0; i < images.lenght; i++) {
    //   rows.push(<Post />);
    // }
    var len = 0;
    function importAll(r) {
      var images = [];
      r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); len++; });
      return images;
    }
    const images = importAll(require.context('../components/layout/img', false, /\.(png|jpg)$/));
    var rows = [], i = -1;
    while (++i < len) rows.push(<Post number={i}></Post>);
    return <div>{rows}</div>;
  }
}

function mapStateToProps(state) {
  return {
    posts: state.getPosts.posts
  }
};

export default connect(
  mapStateToProps, { getPosts }
  // useStyles
)(Home);