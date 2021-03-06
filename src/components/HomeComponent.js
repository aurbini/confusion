import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap'
import Loading from './LoadingComponent'
import { baseUrl } from '../shared/sharedUrl';
import { FadeTransform } from 'react-animation-components';

const RenderCard = ({item, isLoading, errMess}) => {
  if(isLoading){
    return (
      <Loading />
    )
  }else if(errMess){
    return (
      <h4>{errMess}</h4>
    )
  }else{
    return (
      <FadeTransform
        in
        transformProps={{
            exitTransform: 'scale(0.5) translateY(-50%)'
        }}>
        <Card>
            <CardImg src={baseUrl + item.image} alt={item.name} />
            <CardBody>
            <CardTitle>{item.name}</CardTitle>
            {item.designation ? <CardSubtitle>{item.designation}</CardSubtitle> : null }
            <CardText>{item.description}</CardText>
            </CardBody>
        </Card>
      </FadeTransform>
    ) 
  }
}

const Home = ({leader, leaderLoading, leaderErrMess, dish, promotion, dishesLoading, dishesErrMess, promosLoading, promosErrMess}) => {
  console.log(leader)
  return ( 
    <div className="container">
      <div className="row align-items-start">
        <div className="col-12 col-md m-1">
          <RenderCard 
            item={dish} 
            isLoading={dishesLoading}
            errMess={dishesErrMess} 
          />
        </div>
        <div className="col-12 col-md m-1">
          <RenderCard 
            item={promotion}
            isLoading={promosLoading}
            errMess={promosErrMess} 
          />
        </div> 
        <div className="col-12 col-md m-1">
          <RenderCard 
            item={leader}
            isLoading={leaderLoading}
            errMess={leaderErrMess}
          />
        </div>
      </div>
    </div>
   );
}
 
export default Home;