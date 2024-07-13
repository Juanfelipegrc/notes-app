import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { startSignInWithEmailPassword, startSignInWithGoogle } from '../../store/slices/auth/thunks';
import { useForm } from '../../hooks/useForm';
import { useCheckAuth } from '../../hooks/useCheckAuth';
import { CheckingAuth } from '../components/CheckingAuth';
import { deleteErrorMessage } from '../../store/slices/auth/authSlices';

const validations = {
  email: [value => value.includes('@'), 'email is not valid'],
  // diplayName: [value => value.lenght > 0, 'the username is not valid'],
  password: [value => value.length > 6, 'password is very short'],
}

const formData = {
  email: '',
  password: '',
}


export const LoginPage = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [formSumitted, setformSumitted] = useState(false)
  const [seePassword, seSeePassword] = useState(false)
  const {status, errorMessage} = useSelector(state => state.auth);
  
  const {onInputChange, onResetForm, email, password, isFormValid, formState, emailValid, passwordValid} = useForm(formData, validations)





  const navigateRegister = () => {
    navigate('/auth/register')
  }

  const signInWithGoogle = () => {
    dispatch(startSignInWithGoogle())
  }
  const onSubmit = (event) => {
    event.preventDefault();
    setformSumitted(true);
    if(!isFormValid) return
    dispatch(startSignInWithEmailPassword({email, password}))
    
  }

  const onSeePassword = () => {
    seSeePassword(!seePassword)
  }
  
  const ShowHide = seePassword? 'Hide' : 'Show';


  

  useEffect(() => {
  
    return () => {
      dispatch(deleteErrorMessage())
    }
  }, [dispatch])

  return (
    <>
      {
        status === 'checking'? <CheckingAuth/>
        :
        <div className='container-auth-page animate__animated animate__fadeIn animate__faster'>
          
          <div className='container-form-auth-login'>

            <h2 className='title-auth'>Login</h2>

            <div style={{display: !errorMessage? 'none' : ''}} className='error-authentication'>
              <p>{errorMessage}</p>
            </div>

            <form onSubmit={onSubmit}>
              <input
                type="text"
                placeholder='Email'
                onChange={onInputChange}
                name='email'
                value={email}
                autoCapitalize='none'
                className={!!emailValid && formSumitted? 'input-auth-error' : 'input-auth'}

              />

                {
                  !!emailValid && formSumitted
                  ? <div className="error-auth">
                    <p>{emailValid}</p>
                  </div>
                  : ''
                }

              <div className='container-form-password'>
              <input 
                type={seePassword? 'text' : 'password'}
                placeholder='Password'
                onChange={onInputChange}
                name='password'
                value={password}
                className={!!passwordValid && formSumitted? 'input-auth-error' : 'input-auth'}
              />
              <button type='button' onClick={onSeePassword}>{ShowHide}</button>
              </div>
              {
                !!passwordValid && formSumitted
                ? <div className="error-auth">
                  <p>{passwordValid}</p>
                </div>
                : ''
              }
              

              <div className='container-form-buttons'>
                <button>Login</button>
                <button type='button' onClick={signInWithGoogle}>Google</button>
              </div>

            </form>
              <div className='container-question-auth'>
                <p>you do not have an account? <b onClick={navigateRegister}>Sign up</b></p>
              </div>

          </div>


        </div>


      }
        
    </>
  )
}
