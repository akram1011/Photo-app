function Pics(state = { pics: [] }, action) {
    switch (action.type) {
        case "SET_PICS":
            return { ...state, pics: action.payload };
        case "UPDATE_PIC":
            let pics = [...state.pics];
            let index = pics.findIndex((item) => item.id === action.payload.id)
            pics[index] = action.payload
            return { ...state, "pics": pics }
        default:
            return { ...state }
    }
}

export default Pics;