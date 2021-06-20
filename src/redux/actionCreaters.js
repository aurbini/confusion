import * as actionTypes from './actionTypes'
import { DISHES } from '../shared/dishes'
import { baseUrl } from '../shared/sharedUrl'

export const addComment = (dishId, rating, author, comment) => ({
  type: actionTypes.ADD_COMMENT, 
  payload: {
    dishId, 
    rating, 
    author, 
    comment
  }
})

export const fetchDishes = () => (dispatch) => {

  dispatch(dishesLoading(true));

  return fetch(baseUrl + 'dishes')
    .then(response => response.json())
    .then(dishes => dispatch(addDishes(dishes)))
}

export const dishesLoading = () => ({
  type: actionTypes.DISHES_LOADING
})

export const dishesFailed = (errmess) => ({
  type: actionTypes.DISHES_FAILED, 
  payload: errmess
})

export const addDishes = (dishes) => ({
  type: actionTypes.ADD_DISHES, 
  payload: dishes
})

export const fetchComments = () => (dispatch) => {

  return fetch(baseUrl + 'comments')
    .then(response => response.json())
    .then(comments => dispatch(addComments(comments)))
}

export const commentsFailed = (errmess) => ({
  type: actionTypes.COMMENTS_FAILED, 
  payload: errmess
})

export const addComments = (comments) => ({
  type: actionTypes.ADD_COMMENTS, 
  payload: comments
})

export const fetchPromos = () => (dispatch) => {

  dispatch(promosLoading(true));

  return fetch(baseUrl + 'promotions')
    .then(response => response.json())
    .then(promos => dispatch(addPromos(promos)))
}

export const promosLoading = () => ({
  type: actionTypes.PROMOS_LOADING
})

export const promosFailed = (errmess) => ({
  type: actionTypes.PROMOS_FAILED, 
  payload: errmess
})

export const addPromos = (promos) => ({
  type: actionTypes.ADD_PROMOS, 
  payload: promos
})