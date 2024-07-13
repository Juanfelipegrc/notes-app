import { createSlice } from '@reduxjs/toolkit';


export const notesSlice = createSlice({
    name: 'notesSlice',
    initialState: {
        notes: [],
        isSaving: false,
        active: null,

    },
    reducers: {
        savingNewNote: (state) =>{
            state.isSaving = true;
        },
        addNewEmptyNote: (state, action) => {
            state.notes.push(action.payload);
            state.isSaving = false;
        },
        setActiveNote: (state, action) => {
            state.active = action.payload
            
        },
        setNotes: (state, action) => {
            state.notes = action.payload;
        },

        setPhotosToActiveNote:(state, action) => {
            state.active.imagesUrls = [...state.active.imagesUrls, ...action.payload]
        },

        setSaving:(state) => {
            state.isSaving = true;
        },
        updateNote: (state, action) => {
            state.isSaving = false;
            state.notes = state.notes.map(note => {
                if(note.id === action.payload.id){
                    return action.payload
                }

                return note
            })
        },
        clearNotesLogout: (state) => {
            state.isSaving = false;
            state. notes = [];
            state.active = null
        },

        deleteNoteById: (state, action) => {
            state.active = null;
            state.notes = state.notes.filter(note => {
                return note.id != action.payload
            })
        },
        
    
    }
});


export const { 
    addNewEmptyNote,
    clearNotesLogout,
    deleteNoteById,
    savingNewNote,
    setActiveNote,
    setNotes,
    setSaving,
    updateNote,
    setPhotosToActiveNote
 } = notesSlice.actions;