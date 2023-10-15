import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

export default function EditStudent() {

  let navigate = useNavigate()
  const {id} = useParams()

  useEffect(() => {
    loadStudent()
  }, [])

  const [student, setStudent] = useState({
    firstName: '',
    lastName: '',
    age: ''
  })

  const { firstName, lastName, age } = student

  const onInputChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value })
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    await axios.put(`http://localhost:8080/student/${id}`, student)
    navigate('/')
  }

  const loadStudent  = async (e) => {
    const result = await axios.get(`http://localhost:8080/student/getById/${id}`)
    setStudent(result.data)
  }

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
          <h2 className='text-center m-4'>Edit Student</h2>

          <form onSubmit = {(e) => onSubmit(e)}>

            <div className='mb-3'>

              <label htmlFor='firstName' className='form-label'>First Name</label>
              <input type={"text"} className='form-control' placeholder='First Name' name='firstName'
                value={firstName} onChange={(e) => onInputChange(e)} />

              <label htmlFor='lastName' className='form-label'>Last Name</label>
              <input type={"text"} className='form-control' placeholder='Last Name' name='lastName'
                value={lastName} onChange={(e) => onInputChange(e)} />

              <label htmlFor='age' className='form-label'>Age</label>
              <input type={"text"} className='form-control' placeholder='Age' name='age'
                value={age} onChange={(e) => onInputChange(e)} />

            </div>

            <button type='submit' className='btn btn-outline-primary'>Submit</button>
            <Link className='btn btn-outline-danger mx-2' to='/'>Cancel</Link>
          </form>
        </div>
      </div>
    </div>
  )
}

