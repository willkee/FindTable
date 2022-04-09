import React, { useEffect, useRef } from 'react';
// useRef will persist through re-renders
import ReactDOM from 'react-dom';
import { Provider, useDispatch } from 'react-redux';
import './index.css';
import App from './App';
import configureStore from './store';

import { setModalMount } from './store/modal';

const store = configureStore();

const Root = () => {
  const dispatch = useDispatch();
  const modalMountRef = useRef(null);
  // useRef will pass back 2 properties, 2nd is current

  useEffect(() => {
    dispatch(setModalMount(modalMountRef.current))
  }, [dispatch])

  return (
    <div className='super-parent-container'>
      <App />
      <div ref={modalMountRef} className='modal' />
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
        <Root />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
