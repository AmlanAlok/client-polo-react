import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function Home() {

    const [students, setStudents] = useState([])

    useEffect(() => {
        loadStudents()
    }, [])

    // [] will make the page load only once

    const loadStudents = async () => {
        const result = await axios.get('http://localhost:8080/student/getAll')
        setStudents(result.data)
    }

    const deleteStudents = async (id) => {
        await axios.delete(`http://localhost:8080/student/${id}`)
        loadStudents()
    }

    return (
        <div className='container'>
            <div className='py-4'>
                <table className="table border shadow">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">First Name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">Age</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            students.map((student, index) =>(
                                <tr>
                                    <th scope="row" key={index}> {index + 1} </th>
                                    <td>{student.firstName}</td>
                                    <td>{student.lastName}</td>
                                    <td>{student.age}</td>
                                    <td>
                                        <button className="btn btn-primary mx-2">View</button>
                                        <Link className="btn btn-outline-primary mx-2" to={`/editstudent/${student.id}`}>Edit</Link>
                                        <button className="btn btn-danger mx-2" onClick = {() => deleteStudents(student.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        }
                        
                        
                    </tbody>
                </table>
            </div>
        </div>
    )
}
