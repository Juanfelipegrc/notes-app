import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'
import { startRegisterWithEmailPassword } from '../../store/slices/auth/thunks'
import { CheckingAuth } from '../components/CheckingAuth'
import { deleteErrorMessage } from '../../store/slices/auth/authSlices'

const validations = {
  email: [value => value.includes('@'), 'email is not valid'],
  displayName: [value => value.length > 0, 'username is not valid'],
  password: [value => value.length > 6, 'password is very short'],
}

const formData = {
  email: '',
  password: '',
  displayName: '',
}

export const RegisterPage = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();


  const [formSumitted, setformSumitted] = useState(false)

  const [seePassword, seSeePassword] = useState(false)

  const {status, errorMessage} = useSelector(state => state.auth);

  const {onInputChange, email, password, displayName, isFormValid, emailValid, displayNameValid, passwordValid} = useForm(formData, validations)


  const onSubmit = (event) => {
    event.preventDefault();
    setformSumitted(true);
    if(!isFormValid) return
    dispatch(startRegisterWithEmailPassword({email, password, displayName}))
  }

  const navigateLogin = () => {
    navigate('/auth/login')
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

            <h2 className='title-auth'>Register</h2>

            <div style={{display: !errorMessage? 'none' : ''}}className='error-authentication'>
              <p>{errorMessage}</p>
            </div>

            <form onSubmit={onSubmit}>


            <input
                type="text"
                placeholder='Username'
                onChange={onInputChange}
                name='displayName'
                value={displayName}
                className={!!displayNameValid && formSumitted? 'input-auth-error' : 'input-auth'}

              />

                {
                  !!displayNameValid && formSumitted
                  ? <div className="error-auth">
                    <p>{displayNameValid}</p>
                  </div>
                  : ''
                }



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
                <button className='register-button'>
                  Register
                </button>
              </div>

            </form>
            <div className='container-question-auth'>
                <p>do you already have an account? <b onClick={navigateLogin}>Sign in</b></p>
              </div>

          </div>


        </div>
      }
        

    </>
  )
}
