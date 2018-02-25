import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import { addReminder, deleteReminder, clearReminders } from '../actions/index';
import '../index.css';
import moment from 'moment';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            dueDate: ''
        }
    }

    // call the methods of the reducers folder in order to modify our front app.

    addReminder() {
        console.log('this.state =>', this.state);
        this.props.addReminder(this.state.text, this.state.dueDate);
    }
    deleteReminder(id) {
        // console.log(id);
        this.props.deleteReminder(id);
    }

    clearReminders() {
        this.props.clearReminders();
    }

    renderReminders() {
        const { reminders } = this.props;
        return (
            <ul className="list-group col-sm-4">
                {
                    reminders.map(reminder => {
                        return (
                            <li key={reminder.id} className="list-group-item">
                                <div className="list-item">
                                    <div>{reminder.text}</div>
                                    <div><em>{moment(new Date(reminder.dueDate)).fromNow()}</em></div>
                                </div>
                                <div className="list-item delete-button"
                                    onClick={() => this.deleteReminder(reminder.id)}
                                >
                                    &#x2715;
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        );
    }

    render() {
        // console.log('props', this.props);
        return (
            <div className="App">
                <div className="title">
                    Reminder Pro
                </div>
                <div className="form-inline reminder-form">
                    <div className="form-group">
                        <input type="text"
                            className="form-control"
                            placeholder="I need to.."
                            onChange={event => this.setState({ text: event.target.value })}
                        />
                        <input type="text"
                            className="form-control"
                            type="datetime-local"
                            onChange={event => this.setState({ dueDate: event.target.value })}
                        />
                    </div>
                    <button
                        type="button"
                        className="btn btn-success"
                        onClick={() => this.addReminder()}>
                        Add Reminder
                    </button>
                </div>
                {this.renderReminders()}
                <div className="btn btn-danger"
                    onClick={() => this.props.clearReminders()}>
                    Clear All
                </div>
            </div>

        )
    }
}

// this will bind the actions to the props store object of our entire app
// function mapDispatchToProps(dispatch) {
//     return bindActionCreators({ addReminder }, dispatch);
// }

function mapStateToProps(state) {
    return {
        reminders: state
    }
}

// this will connect the app component with the function in order to get access to actions in props object
export default connect(mapStateToProps, { addReminder, deleteReminder, clearReminders })(App);