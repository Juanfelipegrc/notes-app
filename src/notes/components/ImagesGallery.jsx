import React, { useMemo, useState } from 'react'

export const ImagesGallery = ({images}) => {


  
  return (
    <>

        <div style={{overflowY: images.length < 2? 'hidden' : 'scroll'}} className='container-images-gallery-component'>


            {
                images.map(image => (
                    <div key={image} className='item-images-gallery'>
                        {
                            image.includes('.webp') || image.includes('.png') ||
                            image.includes('.jpg') || image.includes('.jpeg') ||
                            image.includes('.gif') || image.includes('.svg')
                            ?
                            <img className='image-images-gallery' src={image}/>
                            :
                            <video className='image-images-gallery' src={image} controls/>


                        }
                        
                    </div>
                ))
            }

            

        </div>

    </>
  )
}
