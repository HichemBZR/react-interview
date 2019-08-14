import {
  GET_FILMS,
  FILMS_LOADING,
  DELETE_FILM,
  EDIT_LIKE,
  EDIT_DISLIKE
} from "../actions/types";

const initialState = {
  films: [],
  likes: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FILMS_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_FILMS:
      return {
        ...state,
        films: state.films.length ? state.films : action.payload.films,
        likes: state.likes.length ? state.likes : action.payload.likes,
        loading: false
      };
    case DELETE_FILM:
      return {
        ...state,
        films: state.films.filter(f => f.id !== action.payload)
      };
    case EDIT_LIKE:
      return {
        ...state,
        films: state.films.map(f => {
          if (f.id === action.payload.id) {
            let newF = f;
            newF.likes = newF.likes + action.payload.value;
            return newF;
          } else return f;
        }),
        likes: state.likes.map(l => {
          if (l.id === action.payload.id) {
            let newL = l;
            newL.value = action.payload.like;
            return newL;
          } else return l;
        })
      };
    case EDIT_DISLIKE:
      return {
        ...state,
        films: state.films.map(f => {
          if (f.id === action.payload.id) {
            let newF = f;
            newF.dislikes = newF.dislikes + action.payload.value;
            return newF;
          } else return f;
        }),
        likes: state.likes.map(l => {
          if (l.id === action.payload.id) {
            let newL = l;
            newL.value = action.payload.like;
            return newL;
          } else return l;
        })
      };
    default:
      return state;
  }
}
