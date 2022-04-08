import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../store/session';
import { setCurrentModal, hideModal } from '../../store/modal';
import SignUpForm from './SignUpForm';
import animation from "../../video/FindTable-loading.mp4";
import styles from './Auth.module.css'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();


  const loginDemo = async (e) => {
    e.preventDefault()
    const data = await dispatch(login("demo@user.com", "password"));
    if (data) return setErrors(data)
    dispatch(hideModal())
  }


  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      return setErrors(data);
    }
    dispatch(hideModal())
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const showSignUpForm = () => {
    dispatch(setCurrentModal(SignUpForm))
  }

  return (
    <div>
      <video loop autoPlay width="250">
        <source src={animation}
          type="video/mp4" />
        Sorry, your browser doesn't support embedded videos.
      </video>
      <form>
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div>
          <label htmlFor='email'>Email</label>
          <input
            name='email'
            type='text'
            placeholder='Email'
            value={email}
            onChange={updateEmail}
          />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input
            name='password'
            type='password'
            placeholder='Password'
            autoComplete='none'
            value={password}
            onChange={updatePassword}
          />
          <div role='button' className={styles.div_button} onClick={onLogin}>Login</div>
        </div>
            <div role='button' className={styles.div_button} onClick={showSignUpForm}>Don't have an account? Sign up!</div>
            <div role='button' className={styles.div_button} onClick={loginDemo}>Demo User</div>
      </form>
    </div>
  );
};

export default LoginForm;
