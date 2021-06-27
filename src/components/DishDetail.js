/* eslint-disable react/jsx-no-comment-textnodes */
import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody,
  CardTitle, BreadcrumbItem, Breadcrumb, Button, Row, Label, Col, 
  Modal, ModalHeader, ModalBody, } from 'reactstrap'
import { Link } from 'react-router-dom'
import { Control, LocalForm, Errors } from 'react-redux-form'
import Loading from './LoadingComponent'
import { baseUrl } from '../shared/sharedUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

const RenderDish = ({ dish }) => {
  if(dish !== undefined){
    return (
      <FadeTransform
        in
        transformProps={{
            exitTransform: 'scale(0.5) translateY(-50%)'
      }}>
        <Card>
            <CardImg top src={baseUrl + dish.image} alt={dish.name} />
            <CardBody>
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
            </CardBody>
        </Card>
      </FadeTransform>
    )
  }
}

const RenderComments = ({ comments, postComment, dishId }) => {
  if(comments !== undefined){
    return (
      <div>
        <h4>Comments</h4> 
        <Stagger in>
          {comments.map((comment) => {
              return (
                  <Fade in>
                  <li key={comment.id}>
                  <p>{comment.comment}</p>
                  <p>-- {comment.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                  </li>
                  </Fade>
              );
          })}
        </Stagger>
        <CommentForm 
          dishId={dishId}
          postComment={postComment}
        />
      </div>
    )
  }else{
    return (
      <div></div>
    )
  }
}

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

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
    this.props.postComment(this.props.dishId, values.rating, values.author, values.comment)
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
  console.log(props.isLoading)
  console.log(props.errMess)
  console.log(props.dish)
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
    return (
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
              postComment={props.postComment}
              dishId={props.dish.id}/>
          </div>
        </div>
      </div>
    )
  }
  else{
    return (
      <div></div>
    );
  }
}

export default DishDetail;