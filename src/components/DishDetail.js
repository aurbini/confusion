import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,
  CardTitle } from 'reactstrap'


class DishDetail extends Component {
  state = {  }


  renderDish = (dish) => {
    return (
      <Card >
        <CardImg width="100%" src={this.props.dish.image} alt={this.props.dish.name} />
        <CardBody> 
          <CardTitle > {this.props.dish.name} </CardTitle>
          <CardText > {this.props.dish.description} </CardText>
        </CardBody>
      </Card>
    )
  }

  renderComments = (comments) => {
    let commentList
    if(comments != null){
      commentList = comments.map((comment) => {
        return (
          <li key={comment.id} className="list-unstyled">
            {comment.comment} <br />
            --{comment.author}, {comment.date.substring(2,10)}
          </li>
        )
      })
    }else{
      commentList = (<div></div>)
    }
  

    return (
      <div>
        <h4>Comments</h4>
        {commentList}
      </div>
    )
  }

  render() { 
    if(this.props.dish === null ){
      return (<div></div>)
    }
    else{
      return ( 
        <div className="row">
          <div className="col-12 col-md-5 m-1" >
           {this.renderDish(this.props.dish)}
          </div>
          <div className="col-12 col-md-5 m-1">

            {this.renderComments(this.props.dish.comments)}
          </div>
        </div>
      );
    }
  }
}
 
export default DishDetail;