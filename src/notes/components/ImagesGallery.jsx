import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startDeleteFile } from '../../store/slices/notes/thunks';




export const ImagesGallery = ({images}) => {

    const dispatch = useDispatch();
    const {isSaving} = useSelector(state => state.notes)


    const onDeleteFile = (id, type) => {
        dispatch(startDeleteFile(id, type))
    }


    
  
  return (
    <>

        <div style={{overflowY: images.length < 2? 'hidden' : 'scroll'}} className='container-images-gallery-component'>


        

            {


                isSaving?
                    <div className='loading-images'>
                        <p>Loading...</p>
                    </div>
                
                :


                    images.map(image => (
                        <div key={image.id} className='item-images-gallery'>

                            
                            {
                                image.url.includes('.webp') || image.url.includes('.png') ||
                                image.url.includes('.jpg') || image.url.includes('.jpeg') ||
                                image.url.includes('.gif') || image.url.includes('.svg')
                                ?
                                
                                <img className='image-images-gallery' src={image.url}/>
                                :
                                <video className='image-images-gallery' src={image.url} controls/>


                            }
                            
                            <div className='container-delete-file'>
                                <p onClick={() => onDeleteFile(image.id, image.type)}>Delete File</p>
                            </div>
                        </div>
                    ))
            }

            

        </div>

    </>
  )
}
