
import './Login.css'


import { useState } from 'react'
import { loginUser } from '../services/auth'


import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";



import facebooklogo from './img/Facebookbg.png'
import linkedinlogo from './img/linkedinbg.png'
import githublogo from './img/githubbg.png'
import xlogo from './img/xbg.png'
import bgImg from './img/login-background-img.jpg';




function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [errorFields, setErrorFields] = useState({});
  const [loading, setLoading] = useState(false);


      const navigate = useNavigate();

    

  const handleLogin = async (e) => {
    e.preventDefault();

    const newErrors = {};

    // ===== VALIDATION =====
    if (!email) {
      newErrors.email = "Email required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        newErrors.email = "Invalid email format";
      }
    }

    if (!password) {
      newErrors.password = "Password required";
    }

    // Stop if errors
    if (Object.keys(newErrors).length > 0) {
      setErrorFields(newErrors);
      return;
    }

    // Clear errors
    setErrorFields({});
    setError("");

    try {
      setLoading(true);

      const data = await loginUser(email, password);

      localStorage.setItem("token", data.token);
      console.log("Login success");

      // navigate("/dashboard");
    navigate("/dashboard");

    } catch (err) {
      if (!err.response) {
        setError("Server not reachable");
      } else if (err.response.status === 401) {
        setError("Incorrect email or password");
      } else {
        setError("Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  };




  return (
    <div className="login-page" style={{ backgroundImage: `url(${bgImg})` }}>
      {/* Animated container */}
      <div className="animated-bar">
        <div className={'login-panel animate'}>
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

            <div className="input-wrapper">
              <input
                id='useremail'
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errorFields.email && <span className="input-icon">{"\u26A0"}</span>}
            </div>
            <label className='text-muted'>Password:</label>
            <div className="input-wrapper">
              <input
                id='userpassword'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errorFields.password && <span className="input-icon">{"\u26A0"}</span>}
            </div>
            <div className='form-check d-flex justify-content-start align-items-center'>
              <input className="form-check-input" type='checkbox' id='rememberMe' /><span className="form-check-label text-white text-center" htmlFor="rememberMe">
                Remember Me</span>
            </div>
            <button id='loginbutton' className='login-button' type='button' onClick={handleLogin} disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
            {error && <p className="text-danger mt-2">{error}</p>}
            <div className='link-options d-flex justify-content-between'>
              <Link to='/Signin' className='link-signin-acc' target='_self'>Create Account?</Link>
              <a className='link-forget-pass' href='#' target='_blank'>Forgot password?</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login


