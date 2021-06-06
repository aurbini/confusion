import React from 'react';
import { Card, CardImg, CardText, CardBody,
  CardTitle, BreadcrumbItem, Breadcrumb } from 'reactstrap'
import { Link } from 'react-router-dom'

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

  const RenderComments = ({ comments }) => {
    console.log(comments)
    let commentList
    if(comments !== undefined){

      commentList = comments.map((comment) => {
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
    }else{
      commentList = (<div></div>)
    }
    return (
      <div>
        {commentList}
      </div>
    )
  }

  const DishDetail = (props) => {
    console.log(props.dish)
    if(props.dish === undefined ){
      return (<div></div>)
    }
    else{
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
              <RenderComments comments={props.comments} />
            </div>
          </div>
        </div>
      );
    }
  }
 
export default DishDetail;