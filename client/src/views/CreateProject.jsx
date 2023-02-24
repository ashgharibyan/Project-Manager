import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'
import moment from 'moment'

function CreateProject() {
    const [projectName, setProjectName] = useState("")
    const [dueDate, setDueDate] = useState()
    const [projects, setProjects] = useState([])
    const [isUnique, setIsUnique] = useState(true)

    const navigate = useNavigate()

    const [errorList, setErrorList] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:8000/api/projects`)
            .then(res => {
                setProjects(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()

        let isUniqueTemp = isUnique
        setIsUnique(true)
        for(const eachProject of projects){
            const dbDate = moment(eachProject.dueDate).format("MM-DD-YYYY")
            console.log('==========db vars')
            console.log(eachProject.project)
            console.log(eachProject.dueDate)
            console.log(dbDate)
            console.log('state')
            console.log(projectName)
            console.log(dueDate)

            
            if(eachProject.project == projectName && dbDate == dueDate){
                isUniqueTemp = false
            }
        }
        setIsUnique(isUniqueTemp)
        console.log("+++++++++++++++++")
        console.log(isUnique)
        if (isUniqueTemp){
            axios.post(`http://localhost:8000/api/project`, {
                project: projectName,
                dueDate: dueDate
            })
                .then(res => {
                    navigate('/')
                })
                .catch(err => {
                    const errorsResData = err.response.data.errors
                    const tempArr = []
                    for(const eachErr in errorsResData){
                        tempArr.push(errorsResData[eachErr].message)
                    }
                    setErrorList(tempArr)
                    console.log(err)
                })
        }

    }

    const projectNameChange = (e) => {
        setProjectName(e.target.value)
        setIsUnique(true)
    }


    return (
        <div className='container' onSubmit={handleSubmit}>
            <Link to='/' className='btn btn-primary'>Back to Dashboard</Link>

            <form className='container mt-5'>
                <h3>Plan a new project</h3>
                <div className='input-group gap-3 align-items-center mt-3'>
                    <label className='form-label'>Project</label>
                    <input className='form-control' type="text" onChange={projectNameChange}/>
                    {
                        !isUnique && <p style={{color:'red'}}>Project exists! Please enter a unique project name</p>
                    }
                </div>
                <div className='input-group gap-3 align-items-center mt-3'>
                    <label className='form-label'>Due Date</label>
                    <input className='form-control' type="date" onChange={(e)=>setDueDate(moment(e.target.value).format("MM-DD-YYYY"))}/>
                </div>
                <button type="submit">Plan Project</button>
                {
                    errorList && errorList.map((eachError,idx) => {
                        return <p key={idx} style={{color:'red'}}>{eachError}</p>
                    })
                }
            </form>
        </div>
    )
}

export default CreateProject