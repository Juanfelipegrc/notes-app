import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom'

export const NotesRoutes = () => {


  const {status} = useSelector(state => state.auth);

  if(status === 'not-authenticated'){
    return <Navigate to='/auth/*'/>
  }
  return (


    <Outlet/>

  )
}
