import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';


const Login = (props) => {

  const [credentials, setCredentials] = useState({email: "", password: ""});

  const navigate = useNavigate();

  const handleSubmit = async(e)=>{
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email: credentials.email,password: credentials.password})
    });
    const json = await response.json();
    console.log(json);
    if(json.success)
    {
      //redirect
      localStorage.setItem('token', json.authtoken);
      props.showAlert("Logged in Successfully", "success");
      navigate("/");
    }
    else{
      props.showAlert("Invalid Details", "danger");
    }
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };


  return (
    <div className='mt-2 d-flex justify-content-center'>
    <h2 style={{position: "absolute"}}>Login to iNotebook</h2>
      <form onSubmit={handleSubmit} style={{position: "absolute", marginTop: "70px"}}>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name="email" value={credentials.email} onChange={onChange} aria-describedby="emailHelp" />
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" value={credentials.password} onChange={onChange} name='password' />
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}

export default Login
