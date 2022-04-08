import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import { signUp } from '../../store/session';
import { setCurrentModal, hideModal } from '../../store/modal';
import { login } from '../../store/session';
import LoginForm from './LoginForm';
import styles from './AuthForms.module.css'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const dispatch = useDispatch();

  const loginDemo = async (e) => {
    e.preventDefault()
    const data = await dispatch(login("demo@user.com", "password"));
    if (data) return setErrors(data)
    dispatch(hideModal())
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      const data = await dispatch(signUp(firstName, lastName, email, password));
      if (data) {
        return setErrors(data)
      }
      dispatch(hideModal())
    }
  };

  const showLoginForm = () => {
    dispatch(setCurrentModal(LoginForm))
  }

  return (
    <form>
      <div>
        {errors.map((error, i) => (
          <div key={i}>{error}</div>
        ))}
      </div>
      <div>
        <label>First Name</label>
        <input
          type='text'
          name='firstName'
          onChange={e => setFirstName(e.target.value)}
          value={firstName}
        ></input>
      </div>
      <div>
        <label>Last Name</label>
        <input
          type='text'
          name='lastName'
          onChange={e => setLastName(e.target.value)}
          value={lastName}
        ></input>
      </div>
      <div>
        <label>Email</label>
        <input
          type='text'
          name='email'
          onChange={e => setEmail(e.target.value)}
          value={email}
        ></input>
      </div>
      <div>
        <label>Password</label>
        <input
          type='password'
          name='password'
          onChange={e => setPassword(e.target.value)}
          autoComplete='none'
          value={password}
        ></input>
      </div>
      <div>
        <label>Confirm Password</label>
        <input
          type='password'
          name='confirmPassword'
          onChange={e => setConfirmPassword(e.target.value)}
          autoComplete='none'
          value={confirmPassword}
        ></input>
      </div>
      <div className={styles.div_button} role='button' onClick={handleSubmit}>Sign Up</div>
      <div className={styles.div_button} role='button' onClick={showLoginForm}>Already signed up? Log in!</div>
      <div className={styles.div_button} role='button' onClick={loginDemo}>Demo User</div>
    </form>
  );
};

export default SignUpForm;
