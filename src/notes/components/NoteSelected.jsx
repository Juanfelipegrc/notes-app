import React, { useEffect, useRef, useState } from 'react'
import SaveIcon from '@mui/icons-material/Save';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import { useForm } from '../../hooks/useForm';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveNote, setModified, setPendingAction } from '../../store/slices/notes/notesSlice';
import { startDeletingNote, startNewNote, startSaveNote, startUploadingFiles } from '../../store/slices/notes/thunks';
import { ImagesGallery } from './ImagesGallery';


export const NoteSelected = () => {

    const {active, isSaving, isModified, pendingAction, tempNote} = useSelector(state => state.notes);

    const [lastState, setLastState] = useState({active: {}, written: false});

    const [animation, setAnimation] = useState(false)

    const dispatch = useDispatch();

    const fileInputRef = useRef();

    const {title, body, onInputChange, formState} = useForm(active);





    const inputRef = useRef();
    const textArea = useRef();
    const containerRef = useRef();

  
    
    const onSaveNote = () => {
        dispatch(startSaveNote());
        dispatch(setModified(false));
        setLastState({active, written: true})
        console.log(isModified)
        Swal.fire({
            title: "Saved Note",
            text: active.title.length > 0 ? `Note: ${active.title}, Saved Successfully`: '',
            icon: "success"
          });
        
    }



    const onDeleteNote = () => {
        dispatch(startDeletingNote())
    }

        


    const onFileInputChange = ({target}) => {

        if(target.files === 0) return;

        dispatch(startUploadingFiles(target.files));
        dispatch(setModified(true));
    }




    


    useEffect(() => {

        if(lastState.written && lastState.active?.id === active.id) return;


        
        setLastState({active, written: true});

 
    }, [active.id]);




    useEffect(() => {
        dispatch(setActiveNote(formState));

      }, [formState]);



    

    useEffect(() => {



        if(!lastState.written) return;


        if(lastState.active?.id !== active.id) return;

        

        if(lastState.active?.body !== active.body || lastState.active?.title !== active.title || lastState.active?.imagesUrls?.length !== active?.imagesUrls.length){


            dispatch(setModified(true));

            
        } else {
    
            dispatch(setModified(false))
        }
        
        

    }, [active]);
    



    useEffect(() => {
        if(active){
            setAnimation(true);
            const timer = setTimeout(() => {
                setAnimation(false)
            }, 1000);

            return () => {
                clearTimeout(timer)
            }
        }

        
    }, [active.id])


    
    useEffect(() => {
        const handleBlur = () => {
            const sideBar = document.querySelector('.container-side-bar-page')
            sideBar.scrollTop = 0;
            window.scrollTo(0, 0);
        };
    

        const inputElement = inputRef.current;
        const textAreaElement = textArea.current;
        // Selecciona todos los elementos input y textarea
        inputElement.addEventListener('blur', handleBlur);
        textAreaElement.addEventListener('blur', handleBlur);
    
        // Limpia los event listeners cuando el componente se desmonta
        return () => {
            inputElement.removeEventListener('blur', handleBlur);
            textAreaElement.removeEventListener('blur', handleBlur);
        
        };
      }, []);



      useEffect(() => {


        if(!isModified) return;

        const handleBeforeUnload = (event) => {
            event.preventDefault();
            event.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
        };

        window.addEventListener('beforeunload', handleBeforeUnload)
      
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload)
        }
      }, [isModified]);



      useEffect(() => {
        

        if (!isModified || !pendingAction) return; 

    

        console.log(lastState.active.title === '' && lastState.active.body === '' && lastState.active.imagesUrls?.length === 0 && active.title !== '' || active.body !== '' || active.imagesUrls.length !== 0())


        console.log({
            'LAST ACTIVE TITLE': lastState.active.title,
            'LAST ACTIVE BODY': lastState.active.body,
            'RECENT ACTIVE TITLE' : active.title,
            'RECENT ACTIVE BODY' : active.body,

        })

        const handleSwitchNote = async () => {

            const emptyNoteValidate = lastState.active.title === '' && lastState.active.body === '' && lastState.active.imagesUrls?.length === 0 && (active.title !== '' || active.body !== '' || active.imagesUrls.length !== 0);

            const result = await Swal.fire({
                title: "Unsaved Changes",
                text: "You have unsaved changes. Do you really want to switch notes?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes, discard changes",
                cancelButtonText: "No, stay here"
            });
    
            if (!result.isConfirmed) {
                if(pendingAction === 'newNote'){
                    dispatch(setActiveNote(active)); 
                    dispatch(setPendingAction(''));
                }

                if(pendingAction === 'setNote') {
                    dispatch(setActiveNote(active));
                    dispatch(setPendingAction(''));
                }
            } else {
                
                if(pendingAction === 'newNote'){

                    

                    if(emptyNoteValidate){
                        console.log('deleting')
                        await dispatch(startDeletingNote());
                    };
                    dispatch(setPendingAction(''));
                    dispatch(startNewNote());
                    dispatch(setModified(false))
                }

                if(pendingAction === 'setNote'){

              
                    if(emptyNoteValidate){
                        console.log('deleting')
                        await dispatch(startDeletingNote());
                    };

                    dispatch(setActiveNote(tempNote));
                    dispatch(setPendingAction(''));
                    dispatch(setModified(false))

                }
                
            }
            
        };
    
        handleSwitchNote();

    }, [pendingAction]); 
      
      

    

  return (
    <>
    
        <div ref={containerRef} className={`container-note-selected ${animation? 'animate__animated animate__fadeIn' : ''}`}>
        
            <div className="save-changes">
                <button disabled={isSaving} className={isSaving? 'disabled-button-note-selected' : ''}  onClick={onDeleteNote}>
                    <DeleteIcon/>
                </button>
                <button disabled={isSaving} className={isSaving? 'disabled-button-note-selected' : ''}  onClick={() => fileInputRef.current.click()}>
                    <FileUploadIcon/>
                </button>
                <button disabled={isSaving} className={isSaving? 'disabled-button-note-selected' : ''}  onClick={onSaveNote}>
                    <SaveIcon/>
                </button>
            </div>

            <div className='form-note-selected'>
                <form>
                    <div className="item-form-note-selected">
                        
                        <input 
                            type="text"
                            placeholder='Title'
                            value={title}
                            name='title'
                            onChange={onInputChange}
                            ref={inputRef}
                            disabled={isSaving}
                        />
                        <input
                        type="file"
                        style={{display:'none'}}
                        ref={fileInputRef}
                        onChange={onFileInputChange}
                        multiple
                        disabled={isSaving}
                        />
                    </div>
                    <div className="item-form-note-selected">
                       
                        <textarea 
                            type="text"
                            placeholder='Body' 
                            className='body-item-note-selected'
                            value={body}
                            name='body'
                            onChange={onInputChange}
                            ref={textArea}
                            disabled={isSaving}
                            
                            
                        />
                    </div>
                </form>
            </div>


            <div className='container-images-gallery'>

        
                <ImagesGallery images={active.imagesUrls}/>

            </div>

     
        </div>

    </>
  )
}
