import React, { useState, useEffect } from 'react'
import { projectStorage } from './firebaseConfig'



export default function useUploadPictureToStorage( file ) {

    // handling state.
    const [ progress, setProgress ] = useState(0)
    const [ cloudStorageUrl, setCloudStorageUrl ] = useState(null)
    const [ uploadError, setUploadError ] = useState(null)


    useEffect(() => {

        // the reference to the file.
        let storageReference = projectStorage.ref().child(`Student Pictures/${file.name}`)
        storageReference.put(file).on('state_changed', ( snap ) => {
            let percentage = ( snap.bytesTransferred / snap.totalBytes ) * 100
            setProgress(percentage)
        }, (err) => {
            setUploadError(err)
        }, async () => {
            let url = await storageReference.getDownloadURL()
            setCloudStorageUrl(url)
        })
    }, [ file ])

    // returning the needed variables from the hook.
    return { progress, cloudStorageUrl, uploadError }

}
