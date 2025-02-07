import { createSlice } from '@reduxjs/toolkit';


export const notesSlice = createSlice({
    name: 'notesSlice',
    initialState: {
        notes: [],
        isSaving: false,
        active: null,
        isModified: false,
        pendingAction: null,
        tempNote: null,

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
            state.isSaving = false;
        },

        setSaving:(state) => {
            state.isSaving = true;
        },

        setModified:(state, {payload}) => {
            state.isModified = payload;
        },

        setTempNote: (state, {payload}) => {
            state.tempNote = payload;
        },

        setPendingAction:(state, {payload}) => {
            state.pendingAction = payload;
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
        
        deleteFileById: (state, action) => {
            state.active.imagesUrls = state.active.imagesUrls.filter(image => {
                return image.id != action.payload
            })
        }
        
    
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
    setPhotosToActiveNote,
    deleteFileById,
    setModified,
    setPendingAction,
    setTempNote,
 } = notesSlice.actions;