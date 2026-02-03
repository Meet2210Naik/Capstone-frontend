import './Login.css'
import facebooklogo from './img/Facebookbg.png'
import linkedinlogo from './img/linkedinbg.png'
import githublogo from './img/githubbg.png'
import xlogo from './img/xbg.png'



function Login() {
  return (
    <div className="page">
        <div className='login-panel'>
        <div className="welcome-block">
            <h1 className="display-4 fw-bold text-left">Welcome Back!</h1>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tenetur eius,iste maxime adipisci commodi totam repellendus laudantium fuga quaerat provident cumque facere architecto, nobis, ducimus amet enim. Ipsum, modi eveniet?</p>
            <div className='socials-panel'>      
                <a href='#' rel='noopener noreferrer' target='_blank'><img src={facebooklogo} alt="faccebooklogo"/></a>
                <a href='#' rel='noopener noreferrer'target='_blank' ><img src={linkedinlogo} alt="linkedinlogo" /></a>
                <a href='#' rel='noopener noreferrer' target='_blank'><img src={githublogo} alt="githublogo" /></a>
                <a href='#' rel='noopener noreferrer' target='_blank'><img src={xlogo} alt="xlogo" /></a>
            </div>
        </div>
        <div className='login-card'>
            <h2 className='h2 text-muted text-center mt-2'>Login</h2>
            <label className='text-muted'>Email:</label>
            <input type='email' placeholder='example@gmail.com'></input>
            <label className='text-muted'>Password:</label>

            <input type='password' placeholder='password'></input>
            <button className='login-button' type='button'>Login</button>
            <a className='link-forget-pass' href='#' target='_blank'>Forgot password?</a>
        </div>

      </div>

    </div>
  )
}

export default Login
