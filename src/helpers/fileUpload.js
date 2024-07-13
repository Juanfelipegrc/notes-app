



export const fileUpload = async(file) => {

    if(!file) throw new Error('No tenemos nigún archivo para subir');

    const cloudUrl = 'https://api.cloudinary.com/v1_1/juanfelipegrc/upload';

    const formData = new FormData();
    formData.append('upload_preset', 'notes-app');
    formData.append('file', file);

    try {
        const resp = await fetch(cloudUrl, {
            method: 'POST',
            body: formData
        });

        if(!resp.ok) throw new Error('No se pudo subir imagen');

        const cloudResp = await resp.json()
       
        return {
            url: cloudResp.secure_url,
            id: cloudResp.public_id,
            type: cloudResp.resource_type
        };


    } catch (error) {
        throw new Error(error.message)
    }

}
