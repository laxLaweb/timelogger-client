import React from 'react';
import './Project.css';
import {ProjectInterface} from "../../models/project";
import Moment from 'moment';

interface ProjectProps {
    project: ProjectInterface;
    callParentFunction: (projectId: number) => void;
}

class Project extends React.Component<ProjectProps>{
    project: ProjectInterface | undefined;
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

    };

    render(){
        Moment.locale('en');

        let addTimeContent;

        if(this.project?.active){
            addTimeContent = <div className="field-container">
                <div className="title-content">
                    <button className="btn btn-primary" onClick={this.showAddHoursClick}>Add time on project</button>
                </div>
                <div className="value-content">

                </div>
            </div>
        }
        else{
            addTimeContent = <div className="field-container">
                <div className="title-content">
                    Project is closed
                </div>
                <div className="value-content">

                </div>
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
