import React, { useEffect, useRef, useState } from 'react'
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
    const [screen, setScreen] = useState('')

    const width = window.innerWidth;
    useEffect(() => {

      if(width < 1200){
        setScreen('mobile')
    }

        if(width >= 1200){
            setScreen('desktop')
            setHiddenSideBar(false);
            setAnimation(false)
        }

    }, [width])
    

    

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



    const restBoxRef = useRef();
    

    const animationValidation = animation ? 'animate__animated animate__slideOutLeft' : 'animate__animated animate__slideInLeft';



    useEffect(() => {
        const onChangeHiddenBar = () => {
            setHiddenSideBar(true)
            setAnimation(true)
            
        };
        
        if(hiddenSideBar === false){
            
            const restBox = restBoxRef.current;
            
            restBox.addEventListener('click', onChangeHiddenBar)


            return () => {
                restBox.removeEventListener('click', onChangeHiddenBar)
            }
        }

    }, [hiddenSideBar])


    const onSetActiveNote = (note) => {
        if(screen === 'mobile'){
            setHiddenSideBar(true)
            setAnimation(true)
        }
        dispatch(setActiveNote(note))
    }
    

  return (
    <>
        <div style={{display: hiddenSideBar? 'none' : ''}} className={`container-side-bar-page ${animation? 'animate__animated animate__fadeOut' : ''} `}>

            <div className={`container-side-bar ${ screen ==='desktop'? '' : animationValidation}`}>

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
                                    <SideBarItem key={note.date} note={note} onSetActiveNote={onSetActiveNote}/>
                                ))
                                :<div className='no-notes'>
                                    <h3>there are no notes</h3>
                                </div>
                            }
                            
                            
                        </ul>
                    </div>
                    
                    
                    <div style={{display: screen === 'mobile'? 'flex' : 'none'}} className='hidden-side-bar'>
                        <button onClick={onChangeAnimation}>
                            <ArrowBackIosNewIcon/>
                        </button>
                    </div>
                </div>

                

            </div>
            <div ref={restBoxRef} className='rest-box'>

            </div>

        </div>
        <div style={{display: hiddenSideBar && screen === 'mobile'? 'flex' : 'none'}} className={`hidden-side-bar-enter ${hiddenSideBar? 'animate__animated animate__fadeIn' : 'animate__animated animate__fadeOut'}`}>
                        <button onClick={onChangeAnimation}>
                            <ArrowForwardIosIcon/>
                        </button>
        </div>
        
    
    </>

  )
}
