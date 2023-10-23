import React, {ChangeEvent, FormEvent} from 'react';
import './AddTimeToProject.css';

interface AddTimeToProjectProps {
    handleFormSubmit: (hours: number, date: string) => void;
}

interface AddTimeToProjectState {
    hours: number;
    date: string;
}

/*
* This component will display and handle the add time to a project, it will send the request to its parent class
* */
class AddTimeToProject extends React.Component<AddTimeToProjectProps, AddTimeToProjectState> {
    constructor(props: AddTimeToProjectProps) {
        super(props);
        this.state = {
            hours: 0,
            date: ''
        };
    }

    handleHourInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        // Update the inputValue state as the user types
        this.setState({ hours: parseInt(e.target.value, 10) || 0 });
    };

    handleDateInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        // Update the inputValue state as the user types
        this.setState({ date: e.target.value});
    };

    handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        // Perform actions with the input value, e.g., call a class method
        this.props.handleFormSubmit(this.state.hours, this.state.date);
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="field-container">
                    <div className="title-content">
                        Add hours to project:
                    </div>
                    <div className="value-content">
                        <input
                            type="number"
                            value={this.state.hours}
                            onChange={this.handleHourInputChange}
                        />
                    </div>
                </div>
                <div className="field-container">
                    <div className="title-content">
                        Date:
                    </div>
                    <div className="value-content">
                        <input
                            placeholder="YYYY-mm-dd"
                            type="text"
                            value={this.state.date}
                            onChange={this.handleDateInputChange}
                        />
                    </div>
                </div>
                <div>
                    <button className="btn btn-primary" type="submit">Save hours to project</button>
                </div>
            </form>
        );
    }
}

export default AddTimeToProject;
