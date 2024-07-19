import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startDeleteFile } from '../../store/slices/notes/thunks';




export const ImagesGallery = ({images}) => {

    const dispatch = useDispatch();
    const {isSaving} = useSelector(state => state.notes)


    const onDeleteFile = (id, type) => {
        dispatch(startDeleteFile(id, type))
    }

    const onDownloadFile = async (url, filename) => {
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/octet-stream',
                },
            });
            const blob = await response.blob();
            const downloadUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error('Error downloading the file', error);
        }
    };


    
  
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
                                <p><a onClick={() => onDownloadFile(image.url, image.id)}>Download File</a></p>
                                <p onClick={() => onDeleteFile(image.id, image.type)}>Delete File</p>
                            </div>
                        </div>
                    ))
            }

            

        </div>

    </>
  )
}
