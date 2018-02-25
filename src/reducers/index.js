import { ADD_REMINDER, DELETE_REMINDER } from '../constants';

// here goes the logic when for the actions

const reminder = (action) => {
    return {
        text: action.text,
        id: Math.random()
    }
}
const removeById = (state = [], id) => {
    const reminders = state.filter(reminder => reminder.id !== id);
    console.log('new reduced reminders', reminders);
    return reminders;
}

const reminders = (state = [], action) => {
    let reminders = null;
    switch (action.type) {
        case ADD_REMINDER:
            reminders = [...state, reminder(action)]
            //console.log('reminder as state', reminders);
            return reminders;

        case DELETE_REMINDER:
            reminders = removeById(state, action.id);
            //console.log('new new', reminders);
            return reminders;
        default:
            return state;
    }

}

export default reminders;