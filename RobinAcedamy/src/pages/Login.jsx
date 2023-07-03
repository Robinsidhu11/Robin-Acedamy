import React from 'react'
import loginimg from '../assets/Images/login.webp'
import Template from '../components/core/Homepage/Auth/Template'
const Login = () => {
  return (
    <Template title="Welcome Back" description1="Build skills for today, tomorrow, and beyond." description2="Education to future-proof your career." image={loginimg} formType="login"></Template>
  )
}

export default Login
