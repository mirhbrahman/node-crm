import isEmpty from "../validation/is-empty";
import {
  OPPORTUNITY_LOADING,
  GET_OPPORTUNITIES,
  GET_OPPORTUNITY,
  UPDATE_OPPORTUNITY,
  DELETE_OPPORTUNITY,
  GET_CONTACT_OPPORTUNITIES
} from "../actions/types";

const initialState = {
  opportunities: null,
  opportunity: null,
  contactOpportunities: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case OPPORTUNITY_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_OPPORTUNITIES:
      return {
        ...state,
        opportunities: action.payload,
        loading: false
      };
    case GET_OPPORTUNITY:
      return {
        ...state,
        opportunity: action.payload
      };
    case GET_CONTACT_OPPORTUNITIES:
      return {
        ...state,
        contactOpportunities: isEmpty(action.payload) ? null : action.payload
      };
    case UPDATE_OPPORTUNITY:
      return {
        ...state,
        opportunities: state.opportunities.map(opportunity =>
          opportunity._id === action.payload._id
            ? (opportunity = action.payload)
            : opportunity
        ),
        opportunity: null
      };

    case DELETE_OPPORTUNITY:
      return {
        ...state,
        opportunities: state.opportunities.filter(
          opportunity => opportunity._id !== action.payload._id
        )
      };

    default:
      return state;
  }
}
