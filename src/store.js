import member1 from './images/Users/1.jpg';
import member2 from './images/Users/2.jpg';
import member3 from './images/Users/3.jpg';
import member4 from './images/Users/4.jpg';

const initialState = {
    users: [{ //created because of no info about icon sources for each user
        id: 1,
        icon: member1,
        color: "#31ade4"
    },
    {
        id: 2,
        icon: member2,
        color: "#DEA43E"
    },
    {
        id: 30, //random id
        icon: member3,
        color: "#FC00FF"
    },
    {
        id: 40, //random id
        icon: member4,
        color: "#EDF1F5"
    },
    ],
    text: '',
    messages: []
}

export function addTextAction(text) {
    return {
        type: 'UPDATE_TEXT', payload: text
    }
}

export function addMessageAction(message) {
    return {
        type: 'ADD_MESSAGE', payload: message
    }
}

export default function appReducer(state = initialState, action){ // Reducer
    switch (action.type) {
        case 'UPDATE_TEXT':
            return { ...state, text: action.payload}
        case 'ADD_MESSAGE':
            return { ...state, //copying the original state
                 messages: action.payload }

                 /*Two different options to add item to an array without mutation: 
                  return { ...state,
                    //messages: [...state.messages, action.payload] }
                    //messages: state.messages.concat(action.payload) }
                 */

        default:
            return state
    }
}