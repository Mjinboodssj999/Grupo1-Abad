import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/Authentication/authContext"

function Register() {
  
  const { registerUser } = React.useContext(AuthContext);

  const [User, setUser] = useState({    
    username: "",
    password: "",
    confirmPassword: "",
  })

  const { username, password, confirmPassword } = User;

  const handleInputChange = (e) => {
    setUser({
      ...User,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    registerUser({username, password, role: "student"});
  }

  return (
    <div
      class="center"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div className="register-box" style={{width: 400}}>
        <div className="card card-outline card-primary">
          <div className="card-header text-center">
            {/* <a href="../../index2.html" className="h1"> */}
            <h1>
              <img src="/unsaacw.png" style={{ width: 130 }} alt="" /> <br />
              <b>
                Sistema de Tutorias <br /> UNSAAC{" "}
              </b>
            </h1>
            {/* </a> */}
          </div>
          <div className="card-body">
            <p className="login-box-msg">Cambio de Contraseña</p>
            <form >
              {/* <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder="DNI" />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-user" />
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder="Nombres" />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-user" />
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Apellidos"
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-user" />
                  </div>
                </div>
              </div>
               */}
              <div className="input-group mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Correo"
                  name="username"
                  onChange={(e) => setUser({ ...User, username: e.target.value })}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-envelope" />
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Contraseña"
                  name="password"
                  onChange={(e) => setUser({ ...User, password: e.target.value })}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock" />
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input
                  type="password"
                  className="form-control"
                  name="confirmPassword"
                  placeholder="Repita la contraseña"
                  onChange={(e) => setUser({ ...User, confirmPassword: e.target.value })}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock" />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-8">
                  <div className="icheck-primary">
                    <input
                      type="checkbox"
                      id="agreeTerms"
                      name="terms"
                      defaultValue="agree"
                    />
                    <label htmlFor="agreeTerms">
                      Estoy de acuerdo con los{" "}
                      <a href="#">terminos y condiciones</a>
                    </label>
                  </div>
                </div>
                {/* /.col */}
                <div className="col-4">
                  {/* <Link to="/"> */}
                    <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
                      Registrar
                    </button>
                  {/* </Link> */}
                </div>
                {/* /.col */}
              </div>
            </form>
            <div className="social-auth-links text-center">
              {/* <a href="#" className="btn btn-block btn-primary">
                <i className="fab fa-facebook mr-2" />
                Sign up using Facebook
              </a> */}
              <a href="#" className="btn btn-block btn-danger">
                <i className="fab fa-google-plus mr-2" />
                Sign up using Google+
              </a>
            </div>
            {/* <a href="login.html" className="text-center">
              I already have a membership
            </a> */}
          </div>
          {/* /.form-box */}
        </div>
        {/* /.card */}
      </div>
    </div>
  );
}

export default Register;
