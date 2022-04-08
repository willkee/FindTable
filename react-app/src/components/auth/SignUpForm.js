import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { signUp } from '../../store/session';
import { setCurrentModal, hideModal } from '../../store/modal';
import LoginForm from './LoginForm';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const dispatch = useDispatch();

  const onSubmit = async (e) => {
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
    <form onSubmit={onSubmit}>
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
      <button type='submit'>Sign Up</button>
      <button onClick={showLoginForm}>Already signed up? Log in!</button>
    </form>
  );
};

export default SignUpForm;
