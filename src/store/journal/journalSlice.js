import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        messageSaved: '',
        notes: [],
        active: null,
        // active: {
        //     id: 'ABC123',
        //     title: '',
        //     body: '',
        //     date: 1234567,
        //     imageUrls: [], 
        // }
    },
    //se inicializa el objeto y cada funcion recibira los parametros necesarios
    //para que luego esto solo se actualice en caso de que hayan cambios
    //y aparte añada datos
    reducers: {

        savingNewNote: (state) => {
            state.isSaving = true;
        },
        addNewEmptyNote: (state, action) => {
            state.notes.push(action.payload);
            state.isSaving = false;
        },
        setActiveNote: (state, action) => {
            state.active = action.payload;
        },
        setNotes: (state, action) => {
            state.notes = action.payload;
        },
        setSaving: (state) => {
            state.isSaving = true;
        },
        updateNote: (state, action) => {
            state.isSaving = false;
            state.notes = state.notes.map(note=>{
                if(note.id===action.payload.id){
                    return action.payload;
                }
                return note;
            });

        },
        deleteNodeById: (state, action) => {

        },

    }
});
// Action creators are generated for each case reducer function
export const { addNewEmptyNote, setActiveNote, setNotes, setSaving, updateNote, deleteNodeById, savingNewNote } = journalSlice.actions;