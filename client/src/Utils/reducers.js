function reducer(state = {subs: [], subsm: [], movieids: '', Fullname: '', SubscriptionPerMember:[{}],editMovie:'',refreshMovies:false, refresh: false, initialState:''  }, action) {
    switch (action.type) {
      case "USER_FULLNAME":
              return ({ ...state, Fullname: action.payload })
          case "MOVIESBYMEMBER":
            return ({ ...state,  SubscriptionPerMember: action.payload })
          case "LOADSMB":
            return ({ ...state, subs: action.payload })
          case "LOADSMV":
            return ({ ...state, subsm: action.payload })
        case "WATCHEDMOVIES ":
            return ({ ...state, watchedMovies: action.payload })
        case "UpdateMovie":
            return ({ ...state, editMovie: action.payload })
    
        default:
            return state;
    }
  }
  export default reducer;