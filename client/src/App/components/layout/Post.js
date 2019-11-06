import React, { Component } from 'react';
import SlideShow from 'react-image-show';
import Img from 'react-image'
import images from './images'

import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from "react-redux";
import { getPosts } from '../../../actions/PostActions'
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
import { Grid } from '@material-ui/core';
import { createGenerateClassName } from '@material-ui/styles';


class Post extends Component {
    constructor() {
        super();

        this.state = {
            posts: [],
            name: "",
            descr: "",
            date: ""
        };
    }
    get1() {
        // if (this.getImg()[0] == "IMAGE-1.jpg") return require("./img/IMAGE-1.jpg");
    };
    get2() {
        // if (this.getImg()[0] == "IMAGE-2.jpg") return require("./img/IMAGE-2.jpg");
    };
    get3() {
        // if (this.getImg()[0] == "IMAGE-3.jpg") return require("./img/IMAGE-3.jpg");
    };



    getName(obj) {
        const name = this.props.posts.map(post => post.name)
        return name;
    };
    getdescr(obj) {
        const name = this.props.posts.map(post => post.descr)
        return name;
    };
    getDate(obj) {
        const name = this.props.posts.map(post => post.date)
        return name;
    };
    getImg() {
        const name = this.props.posts.map(post => post.imgPath)
        return name;
    };

    render() {
        // const name = require("./img/"+ this.getImg()[0]);
        function importAll(r) {
            var images = [];
            r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
            return images;
        }
        const images = importAll(require.context('./img', false, /\.(jpg|png)$/));
        return (
            <div >
                {/* {images.map(({ id, src, title, description }) => <img key={id} src={src} title={title} alt={description} />)} */}
                {/* {this.props.getPosts()} */}
                {/* <h1>{this.props.number}</h1> */}
                {/* <h1>{images.length}</h1> */}
                {/* {JSON.parse(!{ JSON.stringify(this.props.postss) });} */}
                {/* <ul>{JSON.stringify(this.props.posts[0])}</ul> */}
                {/* <h1>{this.getName(this.props.posts)}</h1> */}
                {/* {this.props.posts.toString()} */}
                {/* {this.props.posts.map(post => <div>{post.name}</div>)} */}
                {/* <React.Fragment> {this.props.postss} </React.Fragment> */}
                <br></br>
                <br></br>
                <Grid
                    item
                    xs={9}
                    xl={9}
                    lg={9}
                    md={12}
                >
                    <Card>
                        <CardHeader
                            subheader={<h7><Moment>{this.getDate(this.props.posts)[this.props.number]}</Moment></h7>}
                            title={<h6>{this.getName(this.props.posts)[this.props.number]}</h6>}
                            avatar={<Avatar>B</Avatar>}
                        />
                        <Divider />
                        <h5 >{this.getdescr(this.props.posts)[this.props.number]}</h5>
                        <br></br>
                        <Img
                            img src={images[this.getImg()[this.props.number]]} alt="cur" class="center"
                            height={350}
                            width={700}
                        />
                        <br></br>
                        <Divider />
                        {/* <button class="button2">{this.props.typeUser}</button> */}
                        {this.props.typeUser ? <button class="button2">Apply</button> : <div></div>}
                        {/* <img src={images[this.getImg()[0]]} width="400" height="200"></img> */}
                    </Card>
                </Grid>
                {/* <img src={require(`./${this.getImg()}`)}></img> */}
                {/* <img src={require("./img/IMAGE-1568562847790.jpg")} /> */}


            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        posts: state.getPosts.posts,
        typeUser: state.auth.user.inv
    }
};

export default connect(
    mapStateToProps, { getPosts }
    // useStyles
)(Post);