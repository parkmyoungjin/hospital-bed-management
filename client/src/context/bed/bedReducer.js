import {
  GET_BEDS,
  ADD_BED,
  DELETE_BED,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_BED,
  FILTER_BEDS,
  CLEAR_FILTER,
  BED_ERROR,
  CLEAR_BEDS
} from '../types';

const bedReducer = (state, action) => {
  switch (action.type) {
    case GET_BEDS:
      return {
        ...state,
        beds: action.payload,
        loading: false
      };
    case ADD_BED:
      return {
        ...state,
        beds: [action.payload, ...state.beds],
        loading: false
      };
    case UPDATE_BED:
      return {
        ...state,
        beds: state.beds.map(bed =>
          bed._id === action.payload._id ? action.payload : bed
        ),
        loading: false
      };
    case DELETE_BED:
      return {
        ...state,
        beds: state.beds.filter(bed => bed._id !== action.payload),
        loading: false
      };
    case CLEAR_BEDS:
      return {
        ...state,
        beds: null,
        filtered: null,
        error: null,
        current: null
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null
      };
    case FILTER_BEDS:
      return {
        ...state,
        filtered: state.beds.filter(bed => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          return (
            bed.department.match(regex) ||
            bed.wardName.match(regex) ||
            bed.roomNumber.match(regex) ||
            bed.bedType.match(regex)
          );
        })
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null
      };
    case BED_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};

export default bedReducer; 