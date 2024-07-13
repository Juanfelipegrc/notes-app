import React, { useEffect, useState } from 'react'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import LogoutIcon from '@mui/icons-material/Logout';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useDispatch, useSelector } from 'react-redux';
import { startLogoutFirebase } from '../../store/slices/auth/thunks';
import { SideBarItem } from './SideBarItem';
import { setActiveNote } from '../../store/slices/notes/notesSlice';

export const SideBar = () => {

    const [newName, setnewName] = useState(null)
    const dispatch = useDispatch();
    const {displayName} = useSelector(state => state.auth);
    const {notes} = useSelector(state => state.notes);


    useEffect(() => {
      
        const newNameSplit = displayName?.split(' ');

        if(displayName != null){

            setnewName(newNameSplit[0])

        }

    }, [displayName])
    


    const [animation, setAnimation] = useState(true)
    const [hiddenSideBar, setHiddenSideBar] = useState(true)

    

    const onChangeAnimation = () => {
        setAnimation(!animation)
        if(hiddenSideBar === false){
            setTimeout(() => {
                setHiddenSideBar(true)
            }, 550);
        }else{
            setHiddenSideBar(false)
        }
        
    }

    const onLogout = () => {
        dispatch(startLogoutFirebase());
    }

 
    const onSetHiddenSideBar = () => {
        setHiddenSideBar(true)
        setAnimation(true)
    }
    

    const animationValidation = animation ? 'animate__animated animate__slideOutLeft' : 'animate__animated animate__slideInLeft';

  return (
    <>
        <div style={{display: hiddenSideBar? 'none' : ''}} className={`container-side-bar-page ${animation? 'animate__animated animate__fadeOut' : ''} `}>

            <div className={`container-side-bar ${animationValidation}`}>

                <div className="container-items-side-bar">
                    <div className='container-list-notes'>
                        <div className='container-username'>
                            <h1 className='username'>{newName}</h1>
                                <button className="logout-button" onClick={onLogout}><LogoutIcon/></button>
                        </div>
                        <ul>

                            {
                                notes.length != 0?
                                notes.map(note => (
                                    <SideBarItem key={note.date} note={note} onSetHiddenSideBar={onSetHiddenSideBar}/>
                                ))
                                :<div className='no-notes'>
                                    <h3>there are no notes</h3>
                                </div>
                            }
                            
                            
                        </ul>
                    </div>
                    
                    
                    <div className='hidden-side-bar'>
                        <button onClick={onChangeAnimation}>
                            <ArrowBackIosNewIcon/>
                        </button>
                    </div>
                </div>

                

            </div>
            <div className='rest-box'>

            </div>

        </div>
        <div style={{display: hiddenSideBar? 'flex' : 'none'}} className={`hidden-side-bar-enter ${hiddenSideBar? 'animate__animated animate__fadeIn' : 'animate__animated animate__fadeOut'}`}>
                        <button onClick={onChangeAnimation}>
                            <ArrowForwardIosIcon/>
                        </button>
        </div>
        
    
    </>

  )
}
