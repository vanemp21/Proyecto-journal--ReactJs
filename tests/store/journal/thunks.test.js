import { collection, deleteDoc, getDocs } from "firebase/firestore/lite";
import { addNewEmptyNote, savingNewNote, setActiveNote } from "../../../src/store/journal/journalSlice";
import { startNewNote } from "../../../src/store/journal/thunks";
import { FirebaseDB } from "../../../src/firebase/config";

describe('Pruebas en Journal Thunks', () => { 
    const dispatch = jest.fn();
    const getState = jest.fn();
    beforeEach(()=>jest.clearAllMocks())
    test('startNewNote debe crear una nueva nota en blanco', async() => { 
        const uid='TEST-UID'
        getState.mockReturnValue({auth: {uid:uid}})
        await startNewNote()(dispatch,getState);
        expect(dispatch).toHaveBeenCalledWith(savingNewNote());
        // expect(dispatch).toHaveBeenCalledWith(addNewEmptyNote({
        //     body:'',
        //     title:'',
        //     id: expect.any(String),
        //     date: expect.any(Number),
        // }))

        // expect(dispatch).toHaveBeenCalledWith(setActiveNote({
        //     body:'',
        //     title:'',
        //     id: expect.any(String),
        //     date: expect.any(Number),
        // }))
        const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`)
        const docs = await getDocs(collectionRef);
       // console.log(docs)
        // const deletePromises = []; 
        // docs.forEach(doc=>deletePromises.push(deleteDoc(doc.ref))) <-- Borra las colecciones de firebase
        // await Promise.all(deletePromises)
     })
 })