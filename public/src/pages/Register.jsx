import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import styled from "styled-components"
import Logo from "../assets/logo.svg"
import {ToastContainer, toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import axios from "axios"
import { registerRoute } from '../utils/APIRoutes'


function Register() {

  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  }

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (handleValidation()) {
          console.log("in validsd", registerRoute)
          const { password, confirmPassword, username, email} = values
          const {data} = await axios.post(registerRoute, {
            username, 
            email, 
            password,
          })

        }
    }

    const handleValidation = () => {
      const { password, confirmPassword, username, email} = values

      if (password !== confirmPassword) {
        // alert("oop")
        toast.error("Password and Confirm Password should be same.", toastOptions)
        return false
      } else if (username.length < 3) {
        toast.error("Username must be longer than 3 charecters.", toastOptions)
        return false
      } else if (password.length < 3) {
        toast.error("Password must be longer than 8 charecters.", toastOptions)
        return false
      } else if (email === "") {
        toast.error("Email is required.", toastOptions)
        return false
      }

      return true
    }

    const handleChange = (event) => {
      setValues({...values,[event.target.name]: event.target.value})

    }
  return (
    <>
        <FormContainer>
            <form onSubmit={(event) => handleSubmit(event)}>
                <div className="brand">
                    <img src={Logo} alt="logo" />
                    <h1>zerochat</h1>
                </div>
                <input 
                    type="text" 
                    placeholder='Username' 
                    name="username" 
                    onChange={e=>handleChange(e)} 
                />
                <input 
                    type="email" 
                    placeholder='Email' 
                    name="email" 
                    onChange={e=>handleChange(e)} 
                />
                <input 
                    type="password" 
                    placeholder='Password' 
                    name="password" 
                    onChange={e=>handleChange(e)} 
                />
                <input 
                    type="password" 
                    placeholder='Confirm Password' 
                    name="confirmPassword" 
                    onChange={e=>handleChange(e)} 
                />
                <button type='submit'> Create User </button>
                <span>Already have an account ? <Link to="/login">Login</Link> </span>
            </form>
        </FormContainer>
        <ToastContainer />
    </>
  )
}

const FormContainer = styled.div`
height: 100vh;
width: 100vw;
display: flex;
flex-direction: column;
justify-content: center;
gap: 1rem;
align-items: center;
background-color: #660000;
.brand {
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: center;
  img {
    height: 5rem;
  }
  h1 {
    color: white;
    text-transform: uppercase;
  }
}

form {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background-color: #00000076;
  border-radius: 2rem;
  padding: 3rem 5rem;
}
input {
  background-color: transparent;
  padding: 1rem;
  border: 0.1rem solid #f0b2bc;
  border-radius: 0.4rem;
  color: white;
  width: 100%;
  font-size: 1rem;
  &:focus {
    border: 0.1rem solid #DC566C;
    outline: none;
  }
}
button {
  background-color: #DC566C;
  color: white;
  padding: 1rem 2rem;
  border: none;
  font-weight: bold;
  cursor: pointer;
  border-radius: 0.4rem;
  font-size: 1rem;
  text-transform: uppercase;
  &:hover {
    background-color: #DC566C;
  }
}
span {
  color: white;
  text-transform: uppercase;
  a {
    color: #DC566C;
    text-decoration: none;
    font-weight: bold;
  }
}
`

export default Register