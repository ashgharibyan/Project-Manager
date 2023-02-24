import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import moment from 'moment'

const Dashboard = () => {
    const [projects, setProjects] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        axios.get(`http://localhost:8000/api/projects`)
            .then(res => {
                setIsLoaded(true)
                setProjects(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    const handleStatusChange = (projectName, projectDueDate, updateID, newStatus) => {
        axios.put(`http://localhost:8000/api/project/${updateID}`, {
            project: projectName,
            dueDate: projectDueDate,
            status: newStatus
        })
            .then(res => {
                axios.get(`http://localhost:8000/api/projects`)
                    .then(res => {
                        setIsLoaded(true)
                        setProjects(res.data)
                    })
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
    }

    const handleDelete = (deleteID) => {
        axios.delete(`http://localhost:8000/api/project/${deleteID}`)
            .then(res => {
                setProjects(projects.filter((one_project)=>one_project._id != deleteID))
            })
            .catch(err => console.log(err))
    }


    return (
        <div className='container'>
            <div className='d-flex align-items-start gap-3'>
                {/* Backlog Projects */}
                <table className='table table-primary'>
                    <thead>
                        <tr>
                            <th>Backlog</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            isLoaded ?
                                projects
                                    .filter((each_proejct) => each_proejct.status == -1)
                                    .map((one_project, idx) => {
                                        return (
                                            <tr key={idx}>
                                                <div className='mt-1'>
                                                    <h4>{one_project.project}</h4>
                                                    <p>Due: {moment(one_project.dueDate).format("MM-DD-YYYY")}</p>
                                                    <button onClick={() => handleStatusChange(one_project.project,one_project.dueDate,one_project._id,0)} className='btn btn-warning'>Start Project</button>
                                                </div>
                                            </tr>
                                        )
                                    }) :
                                <p>Loading...</p>
                        }
                    </tbody>
                </table>
                {/* In Progress Projects */}
                <table className='table table-warning'>
                    <thead>
                        <tr>
                            <th>In Progress</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            isLoaded ?
                                projects
                                    .filter((each_proejct) => each_proejct.status == 0)
                                    .map((one_project, idx) => {
                                        return (
                                            <tr key={idx}>
                                                <div className='mt-1'>
                                                    <h4>{one_project.project}</h4>
                                                    <p>Due: {moment(one_project.dueDate).format("MM-DD-YYYY")}</p>
                                                    <button onClick={() => handleStatusChange(one_project.project,one_project.dueDate,one_project._id,1)} className='btn btn-success'>Move to Completed</button>
                                                </div>
                                            </tr>
                                        )
                                    }) :
                                <p>Loading...</p>
                        }
                    </tbody>
                </table>
                {/* Completed Projects */}
                <table className='table table-success'>
                    <thead>
                        <tr>
                            <th>Completed</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            isLoaded ?
                                projects
                                    .filter((each_proejct) => each_proejct.status == 1)
                                    .map((one_project, idx) => {
                                        return (
                                            <tr key={idx}>
                                                <div className='mt-1'>
                                                    <h4>{one_project.project}</h4>
                                                    <p>Due: {moment(one_project.dueDate).format("MM-DD-YYYY")}</p>
                                                    <button onClick={()=>handleDelete(one_project._id)} className='btn btn-danger'>Remove Project</button>
                                                </div>
                                            </tr>
                                        )
                                    }) :
                                <p>Loading...</p>
                        }
                    </tbody>
                </table>
            </div>
            <Link to="/projects/new" className='btn btn-primary'>Add New Project</Link>
        </div>
    )
}

export default Dashboard