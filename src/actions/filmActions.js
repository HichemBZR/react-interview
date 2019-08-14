import {
  GET_FILMS,
  CLEAR_ERRORS,
  GET_ERRORS,
  FILMS_LOADING,
  DELETE_FILM,
  EDIT_LIKE,
  EDIT_DISLIKE
} from "./types";
import { movies$ } from "../data/movies";

// Set loading state
export const setFilmsLoading = () => {
  return {
    type: FILMS_LOADING
  };
};

// Get Films
export const getFilms = () => dispatch => {
  dispatch(setFilmsLoading());
  movies$.then(
    res => {
      let likes = [];
      res.forEach(f => {
        likes.push({ id: f.id, value: 0 });
      });
      dispatch({
        type: GET_FILMS,
        payload: { films: res, likes }
      });
    },
    err => {
      console.log(err);
    }
  );
};

// Delete Film
export const deleteFilm = id => dispatch => {
  dispatch({
    type: DELETE_FILM,
    payload: id
  });
};

// Edit Like
export const editLike = (id, value, like) => dispatch => {
  dispatch({
    type: EDIT_LIKE,
    payload: { id, value, like }
  });
  dispatch(getFilms());
};

// Edit Disike
export const editDislike = (id, value, like) => dispatch => {
  dispatch({
    type: EDIT_DISLIKE,
    payload: { id, value, like }
  });
  dispatch(getFilms());
};
