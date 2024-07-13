import React from 'react'
import { SideBar } from '../components/SideBar'
import { NoNoteSelected } from '../components/NoNoteSelected'
import { NoteSelected } from '../components/NoteSelected'
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import { startNewNote } from '../../store/slices/notes/thunks';

export const NotesPage = () => {

  const dispatch = useDispatch();

  const {active} = useSelector(state => state.notes)

  const addNewNote = () => {
    dispatch(startNewNote());
}


  return (
    <>

      <div className='container-notes-page'>
        <SideBar/>

        {
          !!active
          ? <NoteSelected/>
          : <NoNoteSelected/>
        }
        
        

        <button
          onClick={addNewNote}
          className='add-new-note-button'
         >
          <AddIcon/>
        </button>

      </div>


    </>
  )
}
