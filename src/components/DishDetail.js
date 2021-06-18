/* eslint-disable react/jsx-no-comment-textnodes */
import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody,
  CardTitle, BreadcrumbItem, Breadcrumb, Button, Row, Label, Col, 
  Modal, ModalHeader, ModalBody, } from 'reactstrap'
import { Link } from 'react-router-dom'
import { findAllByDisplayValue } from '@testing-library/dom';
import { Control, LocalForm, Errors } from 'react-redux-form'
import Loading from './LoadingComponent'

const RenderDish = ({ dish }) => {
  if(dish !== undefined){
    return (
      <Card >
        <CardImg width="100%" src={dish.image} alt={dish.name} />
        <CardBody> 
          <CardTitle > {dish.name} </CardTitle>
          <CardText > {dish.description} </CardText>
        </CardBody>
      </Card>
    )
  }
}

const RenderComments = ({ comments, addComment, dishId }) => {
  let commentList
  if(comments !== undefined){
    return (
      <div>
        { commentList = comments.map((comment) => {
          return (
            <div key={comment.id}>
              <h4>Comments</h4>
              <li key={comment.id} className="list-unstyled">
                {comment.comment} <br />
                --{comment.author}, {new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
              </li>
            </div>
            )
          })
        }
        <CommentForm 
          dishId={dishId}
          addComment={addComment}
        />
      </div>
    )
  }else{
    commentList = (<div></div>)
  }
  return (
    <div>
      {commentList}
    </div>
  )
}

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
const isNumber = (val) => !isNaN(Number(val));
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

class  CommentForm extends Component {
  state = {  
    isModalOpen: false
  }

  toggleModal = () => {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    })
  }

  handleSubmit = (values) => {
    this.toggleModal()
    this.props.addComment(this.props.dishId, values.rating, values.author, values.comment)
  }

  
  render() { 
    return ( 
      <div>
        <Button outline onClick={this.toggleModal}>Submit Button</Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal} className="">
        <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
              <Row className="form-group">
                <Label htmlFor="firstname" >Rating</Label>
                <Col >
                  <Control.select model=".rating" id="rating" name="rating"
                    className="form-control"
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </Control.select>  
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="firstname" >Your Name</Label>
                <Col >
                  <Control.text model=".author" id="author" name="author"
                    placeholder="name"
                    className="form-control"
                    validators={{
                        required, minLength: minLength(3), maxLength: maxLength(15)
                    }}
                  />
                  <Errors
                      className="text-danger"
                      model=".name"
                      show="touched"
                      messages={{
                          required: 'Required',
                          minLength: 'Must be greater than 2 characters',
                          maxLength: 'Must be 15 characters or less'
                      }}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="firstname" >Your Name</Label>
                <Col >
                  <Control.textarea model=".comment" id="comment" name="comment"
                      className="form-control"
                      rows="6"
                  />
                </Col>
              </Row>
              <Button className="mt-2" type="submit" value="submit" color="primary">Submit</Button>
            </LocalForm>
          </ModalBody>
        </Modal>
      </div>
      );
  }
}

const DishDetail = (props) => {
  if(props.isLoading){
    return (  
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>  
    )
  }
  else if(props.errMess){
    return (  
      <div className="container">
        <div className="row">
          <h4>{this.props.errMess}</h4>
        </div>
      </div>  
    )
  }
  if(props.dish !== undefined ){
    <div className="container">
      <div className="row">
        <Breadcrumb>
          <BreadcrumbItem ><Link to="/menu">Menu</Link></BreadcrumbItem>
          <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
        </Breadcrumb>
        <div className="col-12">
          <h3>{props.dish.name} </h3>
          <hr />
        </div>
      </div>
      <div className="row" >
        <div className="col-12 col-md-5 m-1" >
          <RenderDish dish={props.dish} />
        </div>
        <div className="col-12 col-md-5 m-1">
          <RenderComments comments={props.comments} 
            addComment={props.addComment}
            dishId={props.dish.id}/>
        </div>
      </div>
    </div>
  }
  else{
    return (
      <div></div>
    );
  }
}

export default DishDetail;