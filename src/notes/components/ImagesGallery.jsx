import React from 'react'

export const ImagesGallery = ({images}) => {
  return (
    <>
    
        <div style={{overflowY: images.length < 2? 'hidden' : 'scroll'}} className='container-images-gallery-component'>


            {
                images.map(image => (
                    <div key={image} className='item-images-gallery'>
                        <img className='image-images-gallery' src={image}/>
                    </div>
                ))
            }

            

        </div>

    </>
  )
}
