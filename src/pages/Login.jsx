import './Login.css'

import { Link } from 'react-router-dom'


import facebooklogo from './img/Facebookbg.png'
import linkedinlogo from './img/linkedinbg.png'
import githublogo from './img/githubbg.png'
import xlogo from './img/xbg.png'



function Login() {
  return (
    <div className="login-page">
      <div className='login-panel'>
        <div className="welcome-block">
          <h1 className="display-4 fw-bold text-left">Welcome Back!</h1>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tenetur eius,iste maxime adipisci commodi totam repellendus laudantium fuga quaerat provident cumque facere architecto, nobis, ducimus amet enim. Ipsum, modi eveniet?</p>
          <div className='socials-panel'>
            <a href='#' rel='noopener noreferrer' target='_blank'><img src={facebooklogo} alt="faccebooklogo" /></a>
            <a href='#' rel='noopener noreferrer' target='_blank' ><img src={linkedinlogo} alt="linkedinlogo" /></a>
            <a href='#' rel='noopener noreferrer' target='_blank'><img src={githublogo} alt="githublogo" /></a>
            <a href='#' rel='noopener noreferrer' target='_blank'><img src={xlogo} alt="xlogo" /></a>
          </div>
        </div>
        <div className='login-card'>
          <h2 className='h2 text-muted text-center mt-2'>Login</h2>
          <label className='text-muted'>Email:</label>
          <input id='useremail' type='email' placeholder='example@gmail.com' />
          <label className='text-muted'>Password:</label>
          <input id='userpassword' type='password' placeholder='password' />
          <div className='form-check d-flex justify-content-start align-items-center'>
          <input className="form-check-input" type='checkbox' id='rememberMe' /><label className="form-check-label text-white" htmlFor="rememberMe">
            Remember Me</label>
          </div>
          <button id='loginbutton' className='login-button' type='button'>Login</button>
          <div className='link-options d-flex justify-content-between'>
          <Link to='/Signin' className='link-signin-acc'  target='_self'>Create Account?</Link>
          <a className='link-forget-pass' href='#' target='_blank'>Forgot password?</a>
          </div>
        </div>

      </div>

    </div>
  )
}

export default Login
