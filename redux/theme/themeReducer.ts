const initialState = false

export const themeReducer =(state=initialState,action: { type: string; payload: unknown })=>{
    // eslint-disable-next-line eqeqeq
    if(action.type=="change_theme"){
        return action.payload
    }
   return state
}

