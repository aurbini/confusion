import React, { Component, useState } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,
  CardTitle } from 'reactstrap'
import DishDetail  from './DishDetail'

class Menu extends Component {

  state = {
    dishSelected: null
  }

  onDishSelect = (dish) => {
    this.setState({
      dishSelected: dish
    })
  }

  // renderDish = (dish) => {
  //   if(dish != null ){
  //     return (
  //       <DishDetail image={dish.image} name={dish.name} description={dish.description} comments={dish.comments}/>
  //     )
  //   }
  //   else{
  //     return(
  //       <div></div>
  //     )
  //   }
  // }

  render(){
    const menu = this.props.dishes.map((dish) => {
      return (
        <div key={dish.id} className="col-12 col-md-5 m-1">
          <Card onClick={() => this.onDishSelect(dish)}>
            <CardImg width="100%" src={dish.image} alt={dish.name} />
            <CardImgOverlay>
              <CardTitle >{dish.name}</CardTitle>
            </CardImgOverlay>
          </Card>
        </div>
      );
    });
  
    return (
      <div className="container">
        <div className="row">
          {menu}
        </div>
        <div className="row">
          <DishDetail dish={this.state.dishSelected} /> 
          {/* {this.renderDish(this.state.dishSelected)} */}
        </div>
      </div>
    );
  }
}

export default Menu;

