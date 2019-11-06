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
import { addCV } from "../../../actions/PostActions";
import { Divider, Grid, CardHeader } from '@material-ui/core';
const axios = require("axios");
const mongoose = require("mongoose");

class AddPost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: true,
            name: '',
            email: '',
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
        formData.append('myCV', this.state.file);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        axios.post("api/posts/uploadCV", formData, config)
            .then((response) => {
                alert("The file is successfully uploaded");
            });
    };

    onSubmit = e => {
        e.preventDefault();
        const newCV = {
            email: this.state.email,
            name: this.state.name
        };
        this.props.addCV(newCV)
    }

    render() {
        return (
            <div>
                <br></br>
                <br></br>

                <Grid>
                    <h4>Postuler Votre CV</h4>
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
                                    type="email"
                                    name="email"
                                    id="item"
                                    placeholder="Your Email"
                                    onChange={this.onChange}
                                />

                                <br></br>
                                <br></br>

                                <input type="file" name="myCV" onChange={this.onChange1} />
                                <button onClick={this.onUpload} class="button4">Upload</button>
                                <br></br>
                                <br></br>
                                <br></br>
                                <button type="submit" class="button3">Submit</button>

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

export default connect(mapStateToProps, { addCV })(AddPost);