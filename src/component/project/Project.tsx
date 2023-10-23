import React from 'react';
import './Project.css';
import {ProjectInterface} from "../../models/project";
import Moment from 'moment';
import AddTimeToProject from '../add-time-to-project/AddTimeToProject';

interface ProjectProps {
    project: ProjectInterface;
    callParentFunction: (projectId: number) => void;
}

/*
* This component will display a single project
* It will also send a post request to add hours on a project
* */
class Project extends React.Component<ProjectProps>{
    project: ProjectInterface | undefined;
    state: {
        showAddHours: boolean
    } = {
        showAddHours: false
    };

    constructor(props: ProjectProps){
        super(props);
        this.project = props.project;
    }

    handleButtonClick = () => {
        // Call the parent's function through the prop
        const { project } = this.props;
        this.props.callParentFunction(project.id);
    };

    showAddHoursClick = () =>{
        this.setState({
            showAddHours: true
        })
    };

    addHoursToProject = (hours: number, date: string) =>{
        console.log('add hours', hours);
        this.setState({
            showAddHours: false
        }, ()=>{
            let payload = {
                date: date,
                hours: hours
            };

            fetch('https://localhost:44393/TimeRegister/'+this.project?.id, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            })
                .then((response) => response.json())
                .then((responseData) => {
                    this.setState({ response: responseData });
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        });



    };

    render(){
        Moment.locale('en');

        let showAddTimeContent;

        if(this.project?.active){
            showAddTimeContent = <div className="field-container">
                <div className="title-content">
                    <button className="btn btn-primary" onClick={this.showAddHoursClick}>Add time on project</button>
                </div>
                <div className="value-content">

                </div>
            </div>
        }
        else{
            showAddTimeContent = <div className="field-container">
                <div className="title-content">
                    Project is closed
                </div>
                <div className="value-content">

                </div>
            </div>
        }

        let addTimeContent;
        if(this.state.showAddHours){
            addTimeContent =
                <div className="project-container">
                    <AddTimeToProject handleFormSubmit={this.addHoursToProject}></AddTimeToProject>
                </div>
        }

        return (
            <div className="project-container">
                <div className="field-container">
                    <div className="title-content">
                        Name
                    </div>
                    <div className="value-content">
                        {this.project?.name}
                    </div>
                </div>

                <div className="field-container">
                    <div className="title-content">
                        Deadline
                    </div>
                    <div className="value-content">
                        {Moment(this.project?.deadline).format('yyyy-MM-DD')}
                    </div>
                </div>

                {showAddTimeContent}

                {addTimeContent}

                <div className="field-container">
                    <div className="title-content">
                        <button className="btn btn-info" onClick={this.handleButtonClick}>Show spend time</button>
                    </div>
                </div>
            </div>);
    }
}

export default Project;
