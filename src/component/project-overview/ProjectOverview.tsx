import {ProjectInterface} from "../../models/project";
import React from "react";

import Project from '../project/Project';
import './ProjectOverview.css';
import {TimeRegisterInterface} from "../../models/time-register";
import Moment from 'moment';

/*
* This component will print out all the projects
* It will make a request to get all the projects
* */
class ProjectOverview extends React.Component {
    state: {
        projects: ProjectInterface[],
        timeRegisters: TimeRegisterInterface[],
        sortColumn: string,
        projectSpendTimeId: number | undefined
    } =
    {
        projects: [],
        timeRegisters: [],
        sortColumn: 'name',
        projectSpendTimeId: undefined
    };


    constructor(props: any){
        super(props);
    }

    getProjects(sortColumn: string = 'name'){
        fetch('https://localhost:44393/Project?sortColumn='+sortColumn)
            .then(response => response.json())
            .then(data => {
                    this.setState({
                        projects: data as ProjectInterface[]
                    });
                }
            );
    }

    getSpendTime(projectId: number){
        fetch('https://localhost:44393/TimeRegister/list/'+projectId)
            .then(response => response.json())
            .then(data => {
                console.log('getSpendTime', data);
                    this.setState({
                        timeRegisters: data as TimeRegisterInterface[]
                    });
                }
            );
    }

    componentDidMount() {
        this.getProjects();
    }

    handleSortChange(sortColumn: string){
        this.setState({ sortColumn }, () => {
            this.getProjects(this.state.sortColumn);
        });
    }

    showSpendTime = (projectId: number) => {
        this.setState({ projectSpendTimeId:projectId }, () => {
            this.getSpendTime(projectId);
        });
    };

    render() {
        Moment.locale('en');
        let btn;
        if(this.state.sortColumn == 'deadline'){
            btn = <button className="btn btn-info" onClick={() => this.handleSortChange('name')}>Sort by name</button>;
        }
        else{
           // defaulting to name
            btn = <button className="btn btn-info" onClick={() => this.handleSortChange('deadline')}>Sort by deadline</button>;
        }

        let spendTime;
        if(this.state.projectSpendTimeId){
            let projects = this.state.projects.filter(x => x.id == this.state.projectSpendTimeId);
            let project = projects.length == 1 ? projects[0] : undefined;
            if(project){
                let projectName = project.name;

                spendTime =
                <div className="spend-time-container">
                    <div className="header-text">Name: {projectName}</div>
                    <div>Time spend:</div>
                    {this.state.timeRegisters.map(x =>
                        <div className="time-container" key={x.id}>
                            <div>Date: {Moment(x.date).format('yyyy-MM-DD')}</div>
                            <div>Hours: {x.hours}</div>
                        </div>
                    )}
                </div>;
            }
        }
        else{
            spendTime = undefined
        }

        return (
            <div>
                <div className="row">
                    <div className="col-12">
                        <div className="btn-spacer">
                            {btn}
                        </div>
                    </div>
                </div>

                <div className="row">
                    {this.state.projects.map(x =>
                        <div className="col-3" key={x.id}>
                            <Project callParentFunction={this.showSpendTime} project={x} />
                        </div>
                    )}
                </div>

                { spendTime }
            </div>
        );
    }
}


export default ProjectOverview;
