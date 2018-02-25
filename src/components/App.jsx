import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import { addReminder, deleteReminder } from '../actions/index';
import '../index.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        }
    }

    // call the methods of the reducers folder in order to modify our front app.

    addReminder() {
        // console.log('this', this);
        this.props.addReminder(this.state.text);
    }
    deleteReminder(id) {
        // console.log(id);
        this.props.deleteReminder(id);
    }

    renderReminders() {
        const { reminders } = this.props;
        return (
            <ul className="list-group col-sm-4">
                {
                    reminders.map(reminder => {
                        return (
                            <li key={reminder.id} className="list-group-item">
                                <div>{reminder.text}</div>
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
                    </div>
                    <button
                        type="button"
                        className="btn btn-success"
                        onClick={() => this.addReminder()}>
                        Add Reminder
                    </button>
                </div>
                {this.renderReminders()}
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
export default connect(mapStateToProps, { addReminder, deleteReminder })(App);