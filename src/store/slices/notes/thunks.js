import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { addNewEmptyNote, deleteNoteById, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from "./notesSlice"
import { FirebaseDB } from "../../../firebase/config";
import { loadNotes } from "../../../helpers/loadNotes";
import { fileUpload } from "../../../helpers/fileUpload";


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
        dispatch(deleteNoteById(active.id))
    }
}

export const startUploadingFiles = (files) => {
    return async(dispatch) => {
        const fileUploadPromises = [];

        for (const file of files) {
            fileUploadPromises.push(

                fileUpload(file)
            )
        }
        const imageUrls = await Promise.all(fileUploadPromises);

        dispatch(setPhotosToActiveNote(imageUrls))
    }
}