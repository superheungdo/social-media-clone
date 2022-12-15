import React, { useState } from "react";

import "./Auth.css";
import Logo from "../../img/logo.png";

const UsernameInput = ({ value, onChange }) => (
  <div>
    <input
      className="infoInput"
      type="text"
      name="username"
      placeholder="Username"
      required
      value={value}
      onChange={onChange}
    />
  </div>
);

const PasswordInput = ({ name, placeholder, value, onChange }) => (
  <input
    className="infoInput"
    type="password"
    name={name}
    placeholder={placeholder}
    required
    value={value}
    onChange={onChange}
  />
);

const SignUp = ({ data, handleChange, wrongPassword }) => {
  return (
    <>
      <h3>Sign up</h3>

      <div>
        <input
          className="infoInput"
          type="text"
          name="firstname"
          placeholder="First Name"
          required
          value={data.firstname}
          onChange={handleChange}
        />

        <input
          className="infoInput"
          type="text"
          name="lastname"
          placeholder="Last Name"
          required
          value={data.lastname}
          onChange={handleChange}
        />
      </div>

      <UsernameInput value={data.username} onChange={handleChange} />

      <div>
        <PasswordInput
          name="password"
          placeholder="Password"
          value={data.password}
          onChange={handleChange}
        />
        <PasswordInput
          name="confirmpassword"
          placeholder="Confirm password"
          value={data.confirmpassword}
          onChange={handleChange}
        />
      </div>

      <span
        style={{
          color: "red",
          fontSize: "12px",
          alignSelf: "flex-end",
          marginRight: "5px",
          display: wrongPassword ? "block" : "none",
        }}
      >
        * Confirm password is not same
      </span>
    </>
  );
};

const LogIn = ({ data, handleChange }) => {
  return (
    <>
      <h3>Log In</h3>

      <UsernameInput value={data.username} onChange={handleChange} />

      <div>
        <PasswordInput
          name="password"
          placeholder="Password"
          value={data.password}
          onChange={handleChange}
        />
      </div>
    </>
  );
};

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    confirmpassword: "",
  });
  const [wrongPassword, setWrongPassword] = useState(false);

  console.log(data.firstname);

  const toggleAuth = () => setIsSignUp((prevState) => !prevState);

  const handleChange = (e) => {
    if (e.target.name === "password" || e.target.name === "confirmpassword") {
      setWrongPassword(false);
    }

    setData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);

    if (isSignUp) {
      data.password === data.confirmpassword
        ? setWrongPassword(false)
        : setWrongPassword(true);
    }
  };

  return (
    <div className="Auth">
      <div className="a-left">
        <img src={Logo} alt="logo" />

        <div className="Webname">
          <h1>ZKC Media</h1>
          <h6>Explore the ideas throughout the world</h6>
        </div>
      </div>

      <div className="a-right">
        <form className="infoForm authForm" onSubmit={handleSubmit}>
          {isSignUp ? (
            <SignUp
              data={data}
              handleChange={handleChange}
              wrongPassword={wrongPassword}
            />
          ) : (
            <LogIn data={data} handleChange={handleChange} />
          )}

          <div>
            <span
              style={{ fontSize: "12px", cursor: "pointer" }}
              onClick={toggleAuth}
            >
              {isSignUp
                ? "Already have an account? "
                : "Don't have an account? "}
              <span className="toggle-btn" style={{ fontWeight: 900 }}>
                {isSignUp ? "Log in" : "Sign up"}
              </span>
            </span>
          </div>

          <button className="button infoButton" type="submit">
            {isSignUp ? "Signup" : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
