import React, { Component } from 'react';
import {
  Button,
  Modal,
  Card,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';

import { connect } from 'react-redux';
import { addPost } from "../../../actions/PostActions";
import { Divider, Grid, CardHeader } from '@material-ui/core';
const axios = require("axios");
const mongoose = require("mongoose");

class AddPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: true,
      name: '',
      descr: '',
      file: null
    };

    this.toggle = this.toggle.bind(this);
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }
  onChange1 = e => {
    this.setState({ file: e.target.files[0] });
  };

  onUpload = e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('myImage', this.state.file);
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    };
    axios.post("api/posts/upload", formData, config)
      .then((response) => {
        alert("The file is successfully uploaded");
      });
  };

  onSubmit = e => {
    e.preventDefault();
    const newPost = {
      PDP: this.props.id,
      name: this.state.name,
      descr: this.state.descr
    };
    this.props.addPost(newPost)
  }

  render() {
    return (
      <div>
        <br></br>
        <br></br>

        <Grid>
          <h4>Postuler une post</h4>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Input
                  type="text"
                  name="name"
                  id="item"
                  placeholder="Name"
                  onChange={this.onChange}
                />
                <Input
                  rows="4"
                  type="text"
                  name="descr"
                  id="item"
                  placeholder="Description"
                  onChange={this.onChange}
                />

                <br></br>
                <br></br>

                <input type="file" name="myImage" onChange={this.onChange1} />
                <button onClick={this.onUpload} class="button2">Upload</button>
                <br></br>
                <br></br>
                <br></br>
                <button type="submit" class="button4">Submit</button>

              </FormGroup>
            </Form>
          </ModalBody>
        </Grid>
      </div >
    );
  }
}

const mapStateToProps = state => ({
  id: state.auth.user.id
});

export default connect(mapStateToProps, { addPost })(AddPost);