import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'
import moment from 'moment'

function CreateProject() {
    const [projectName, setProjectName] = useState("")
    const [dueDate, setDueDate] = useState(null)
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

        let tempErrorList = []

        let isUniqueTemp = isUnique
        let isValidEntry = true
        setIsUnique(true)
        setErrorList([])
        for(const eachProject of projects){
            const dbDate = moment(eachProject.dueDate).format("MM-DD-YYYY")            
            if(eachProject.project == projectName && dbDate == dueDate){
                isUniqueTemp = false
            }
        }


        if (projectName.length < 1){
            tempErrorList.push("Project name requiredsssssss")
            isValidEntry = false
        } else if(projectName.length < 3){
            tempErrorList.push("Project name must be at least 3 characterssssss")
            isValidEntry = false
        } 

        if(dueDate == null){
            tempErrorList.push("Due Date is requiredssssss")
            isValidEntry = false
        }


        setIsUnique(isUniqueTemp)
        setErrorList(tempErrorList)
        if (isUniqueTemp && isValidEntry){
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