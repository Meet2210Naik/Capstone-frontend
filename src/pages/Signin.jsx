import "./Signin.css";



import { useState } from "react";
import { SigninUser } from "../services/auth";
import { useNavigate } from "react-router-dom";
import { preconnect } from "react-dom";




function Signup() {
  const [companyName, setCompanyName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isStudent, setIsStudent] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [errorFields, setErrorFields] = useState({});


  const navigate = useNavigate();


  const handleRoleChange = (studentMode) => {
    setIsStudent(studentMode);
    setUserName('');
    setEmail('');
    setPassword('');

    // clear company field when switching back to student
    if (studentMode) {
      setCompanyName('');
    }
  };

  const handleSignin = async (e) => {
    e.preventDefault();


    const newErrors = {};


    //Creating user object
    const userData = {
      userName,
      email,
      password,
      role: isStudent ? "student" : "company",
      ...(!isStudent && { companyName })
    };


    // ===== VALIDATION =====

    if (!userData.userName) {
      newErrors.userName = "Username required";
    }

    if (!userData.email) {
      newErrors.email = "Email required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(userData.email)) {
        newErrors.email = "Invalid email format";
      }
    }

    if (!userData.password) {
      newErrors.password = "Password required";
    }

    if (!isStudent && !userData.companyName) {
      newErrors.companyName = "Company name required";
    }

    // If there are validation errors, stop submission
    if (Object.keys(newErrors).length > 0) {
      setErrorFields(newErrors);
      return;
    }

    // Clear old errors
    setErrorFields({});
    setError("");

    // ===== API CALL =====
    try {


      setLoading(true);

      const data = await SigninUser(userData);



      localStorage.setItem("token", data.token);
      console.log("Signin success");


      navigate("/dashboard");


    } catch (err) {
      if (!err.response) {
        setError("Server not reachable");
      } else if (err.response.status === 400) {
        // Backend field errors
        const fieldErrors = err.response.data; // e.g., { email: ["Already taken"] }

        // Map to your state so you can show icons/messages
        const newErrorFields = {};
        Object.keys(fieldErrors).forEach((key) => {
          // Only take first message for each field
          newErrorFields[key] = fieldErrors[key][0];
        });

        setErrorFields(newErrorFields);
        setError("Please correct the highlighted fields."); // generic message
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
    <div className="signup-page">

      {/* LEFT PANEL */}

      <div className={`signup-info-panel ${isStudent ? "student" : "company"}`}>

        <div className="bg-layer bg1"></div>
        <div className="bg-layer bg2"></div>
        <div className="bg-layer bg3"></div>
        <div className="bg-layer bg4"></div>
        <div className="bg-layer bg5"></div>

        <div key={isStudent} className="info-content">


          {isStudent ? (
            <>
              <h1 className="signin-info-panel-title class-student">Join us as a Student</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>

              <ul>
                <li>Learning paths</li>
                <li>Track progress</li>
                <li>Portfolio tools</li>
                <li>Company connections</li>
                <li>Personalized learning</li>
              </ul>
            </>
          ) : (
            <>
              <h1>Join us as a Company</h1>
              <p>Discover talented students and hire smarter.</p>

              <ul>
                <li>Access talent pool</li>
                <li>Post jobs</li>
                <li>Track applicants</li>
                <li>Analytics dashboard</li>
                <li>Brand promotion</li>
              </ul>
            </>
          )}

        </div>

      </div>

      {/* RIGHT PANEL */}
      <div className="signup-form-panel">


        <div className="signup-form">

          <h2>Skillora</h2>

          {/* TOGGLE SWITCH */}
          <div className="toggle-wrapper">

            <div className="toggle-container">

              <div
                className={`toggle-highlight ${isStudent ? "student" : "company"}`}
              />

              <button
                type="button" className={`toggle-option ${isStudent ? "active" : ""}`} onClick={() => handleRoleChange(true)}
              >
                Student
              </button>

              <button
                type="button"
                className={`toggle-option ${!isStudent ? "active" : ""}`}
                onClick={() => handleRoleChange(false)}
              >
                Company
              </button>

            </div>

          </div>


          <form onSubmit={handleSignin}>

            {!isStudent && (
              <div className="input-group">
                <input
                  type="text"
                  placeholder=" "
                  value={companyName}
                  onChange={(e) => {
                    setCompanyName(e.target.value);
                    if(errorFields.companyName){
                      setErrorFields(prev => ({...prev,companyName: undefined}));
                    }
                  }}
                  className={`${companyName ? "has-content" : ""} ${errorFields.companyName ? "has-error" : ""}`}

                />
                <label>Company Name</label>
                <span className="input-icon">{errorFields.companyName && '\u26A0'}</span>
              {errorFields.companyName && (
                <span className="input-error-text">{errorFields.companyName}</span>
              )}
              </div>
            )}

            <div className="input-group">
              <input
                type="text"
                placeholder=" "
                value={userName}
                onChange={(e) => {
                  setUserName(e.target.value);
                  if(errorFields.userName){
                    setErrorFields(prev => ({...prev,userName:undefined}));
                  }
                }}
                className={`${userName ? "has-content" : ""} ${errorFields.userName ? "has-error" : ""}`}
              />
              <label>Username</label>
              <span className="input-icon">{errorFields.userName && '\u26A0'}</span>
              {errorFields.userName && (
                <span className="input-error-text">{errorFields.userName}</span>
              )}
            </div>


            <div className="input-group">
              <input
                type="email"
                placeholder=" "
                value={email}
                onChange={(e) => {setEmail(e.target.value);
                  if(errorFields.email){
                    setErrorFields(prev => ({...prev,email:undefined}));
                  }
                }}
                className={`${email ? "has-content" : ""} ${errorFields.email ? "has-error" : ""}`}
              />
              <label>Email</label>
              <span className="input-icon">{errorFields.email && '\u26A0'}</span>
              {errorFields.email && (
                <span className="input-error-text">{errorFields.email}</span>
              )}
            </div>


            <div className="input-group">
              <input
                type="password"
                placeholder=" "
                value={password}
                onChange={(e) => {setPassword(e.target.value);
                  if(errorFields.password){
                    setErrorFields(prev => ({...prev,password:undefined}));
                  }
                }}
                className={`${password ? "has-content" : ""} ${errorFields.password ? "has-error" : ""}`}
              />
              <label>Password</label>
             <span className="input-icon">{errorFields.password && '\u26A0'}</span>
              {errorFields.password && (
                <span className="input-error-text">{errorFields.password}</span>
              )}
            </div>

            <div className="remember">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Remember me</label>

            </div>

            <button
              className={`signup-btn ${loading ? "loading" : ""}`}
              onClick={handleSignin}
              disabled={loading}
            >
              <span className="btn-text">{loading ? "Sending..." : "Signin"}</span>
              <span className="btn-arrow">&#10148;</span>
            </button>



          </form>

        </div>
      </div>

    </div>
  );
}

export default Signup;
