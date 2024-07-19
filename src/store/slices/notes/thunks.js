import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { addNewEmptyNote, deleteFileById, deleteNoteById, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from "./notesSlice"
import { FirebaseDB } from "../../../firebase/config";
import { loadNotes } from "../../../helpers/loadNotes";
import { fileUpload } from "../../../helpers/fileUpload";
import CryptoJS from 'crypto-js'

export const startNewNote = () => {
    return async(dispatch, getState) => {
        dispatch(savingNewNote());
        const {uid} = getState().auth;

        const newNote = {
            title: '',
            body: '',
            imagesUrls: [],
            date: new Date().getTime()
        }
        const newDoc = doc(collection(FirebaseDB, `${uid}/notesapp/notes`))
        await setDoc(newDoc, newNote)

        newNote.id = newDoc.id;
  
        dispatch(addNewEmptyNote(newNote));
        dispatch(setActiveNote({...newNote}))
    }
}

export const startLoadingNotes = () => {
    return async(dispatch, getState) => {

        const {uid} = getState().auth;
        const notes = await loadNotes(uid);
        dispatch(setNotes(notes));
    }
}

export const startSaveNote = () => {
    return async(dispatch, getState) => {
        dispatch(setSaving())
        const {uid} = getState().auth;
        const {active} = getState().notes;

        const noteToFireStore = {...active};
        

        const docRef = doc(FirebaseDB, `${uid}/notesapp/notes/${active.id}`);

        noteToFireStore.id = 

        await setDoc(docRef, noteToFireStore, {merge:true});

        dispatch(updateNote(active))

    }
}


export const startDeletingNote = () =>{
    return async(dispatch, getState) => {
        const {uid} = getState().auth;
        const {active} = getState().notes;

        const docRef = doc(FirebaseDB, `${uid}/notesapp/notes/${active.id}`)

        await deleteDoc(docRef);


        const timestamp = Math.floor(new Date().getTime() / 1000);
        const cloudName = 'juanfelipegrc';
        const apiKey = '651647161523528'; 
        const apiSecret = 'q3nCQ2OvxdCD_okGm8DZtXKu04g';




        for (const image of active.imagesUrls) {


            const stringToSign = `public_id=${image.id}&timestamp=${timestamp}${apiSecret}`;
            const signature = CryptoJS.SHA1(stringToSign).toString();


            const url = `https://api.cloudinary.com/v1_1/${cloudName}/${image.type}/destroy`;

            try {
                await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    public_id: image.id,
                    api_key: apiKey,
                    timestamp: timestamp,
                    signature: signature,
                }),
                });
            }catch(error){
                console.log(error)
            }
        }


        dispatch(deleteNoteById(active.id))
    }
}

export const startUploadingFiles = (files) => {
    return async(dispatch) => {
        dispatch(setSaving())
        const fileUploadPromisesUrls = [];

        for (const file of files) {

            const {url, id, type} = await fileUpload(file);
            fileUploadPromisesUrls.push({url, id, type});
        }
        const imageUrls = await Promise.all(fileUploadPromisesUrls);



 
        dispatch(setPhotosToActiveNote(imageUrls))
    }
}

export const startDeleteFile = (id, type) => {
    return async(dispatch) => {
        

    
        const timestamp = Math.floor(new Date().getTime() / 1000);
        const cloudName = 'juanfelipegrc';
        const apiKey = '651647161523528'; 
        const apiSecret = 'q3nCQ2OvxdCD_okGm8DZtXKu04g';


        const stringToSign = `public_id=${id}&timestamp=${timestamp}${apiSecret}`;
            const signature = CryptoJS.SHA1(stringToSign).toString();


            const url = `https://api.cloudinary.com/v1_1/${cloudName}/${type}/destroy`;

            try {
                await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    public_id: id,
                    api_key: apiKey,
                    timestamp: timestamp,
                    signature: signature,
                   
                }),
                });
            }catch(error){
                console.log(error)
            }
        

            


        dispatch(deleteFileById(id))
    }
}