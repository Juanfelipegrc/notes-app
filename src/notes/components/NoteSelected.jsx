import React, { useEffect, useRef, useState } from 'react'
import SaveIcon from '@mui/icons-material/Save';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import { useForm } from '../../hooks/useForm';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveNote } from '../../store/slices/notes/notesSlice';
import { startDeletingNote, startSaveNote, startUploadingFiles } from '../../store/slices/notes/thunks';
import { ImagesGallery } from './ImagesGallery';


export const NoteSelected = () => {

    const {active} = useSelector(state => state.notes);

    const [animation, setAnimation] = useState(false)

    const dispatch = useDispatch();

    const fileInputRef = useRef();

    const {title, body, onInputChange, formState} = useForm(active);

    useEffect(() => {
      dispatch(setActiveNote(formState));
    }, [formState]);
    
    const onSaveNote = () => {
        dispatch(startSaveNote());
        Swal.fire({
            title: "Saved Note",
            text: active.title.length > 0 ? `Note: ${active.title}, Saved Successfully`: '',
            icon: "success"
          });
    }

    const onDeleteNote = () => {
        dispatch(startDeletingNote())
    }


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
    
        


    const onFileInputChange = ({target}) => {

        if(target.files === 0) return;

        dispatch(startUploadingFiles(target.files))
    }




    const inputRef = useRef();
    const textArea = useRef();
    const containerRef = useRef();
    
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

    

  return (
    <>
    
        <div ref={containerRef} className={`container-note-selected ${animation? 'animate__animated animate__fadeIn' : ''}`}>
        
            <div className="save-changes">
                <button onClick={onDeleteNote}>
                    <DeleteIcon/>
                </button>
                <button onClick={() => fileInputRef.current.click()}>
                    <FileUploadIcon/>
                </button>
                <button onClick={onSaveNote}>
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
                        />
                        <input
                        type="file"
                        style={{display:'none'}}
                        ref={fileInputRef}
                        onChange={onFileInputChange}
                        multiple
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
