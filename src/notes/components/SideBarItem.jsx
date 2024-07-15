import React, { useMemo, useState } from 'react'
import EditNoteIcon from '@mui/icons-material/EditNote';
import { useDispatch } from 'react-redux';


export const SideBarItem = ({note, onSetActiveNote}) => {

    

    const dispatch = useDispatch();

  

    const newTitle = useMemo(() => {
        return note.title.length > 10
        ? `${note.title.substring(0,10)}...`
        : note.title;
    });
    const newBody = useMemo(() => {
        return note.body.length > 20
        ? `${note.body.substring(0,20)}...`
        : note.body;
    });

    
  return (
    <>
        <li className='item-side-bar'>
            <button onClick={() => onSetActiveNote(note)}>
                <div className='item-container-title-icon'>
                    <EditNoteIcon/>
                    <h4>{newTitle}</h4>
                </div>
                <p>{newBody}</p>
            </button>
        </li>
    </>
  )
}
