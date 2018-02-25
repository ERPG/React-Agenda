import { ADD_REMINDER, DELETE_REMINDER, CLEAR_REMINDERS } from '../constants';
import { bake_cookie, read_cookie } from 'sfcookies';

// here you store all the state object of the Application

const reminder = (action) => {
    let { text, dueDate } = action;
    console.log('action =>', action);
    return {
        id: Math.random(),
        text,
        dueDate
    }
}
const removeById = (state = [], id) => {
    const reminders = state.filter(reminder => reminder.id !== id);
    console.log('new reduced reminders', reminders);
    return reminders;
}

const reminders = (state = [], action) => {
    let reminders = null;
    // this will initialice the cookies saved
    state = read_cookie('reminders');
    switch (action.type) {
        case ADD_REMINDER:
            reminders = [...state, reminder(action)];
            // add the new reminder to the cookies
            bake_cookie('reminders', reminders);
            //console.log('reminder as state', reminders);
            return reminders;

        case DELETE_REMINDER:
            reminders = removeById(state, action.id);
            // update reminders to the cookies
            bake_cookie('reminders', reminders);
            //console.log('new new', reminders);
            return reminders;
        case CLEAR_REMINDERS:
            reminders = [];
            bake_cookie('reminders', reminders);
            return reminders;
        default:
            return state;
    }

}

export default reminders;