import { authSlice, checkingCredentials,login, logout } from "../../../src/store/auth/authSlice"
import { demoUser, initialState, authenticatedState } from "../../fixtures/authFixtures"

describe('Pruebas en el authSlice', () => {
    test('Debe regresar el estado inicial y llamarse "auth" ', () => {

        expect(authSlice.name).toBe('auth')
        const state = authSlice.reducer(initialState, {});
        //el {} es la accion, el reducer, action/payload
        //console.log(initialState)
        expect(state).toEqual(initialState);
    });
    test('debe de realizar la autenticacion', () => {

        const state = authSlice.reducer(initialState, login(demoUser))
        //console.log(state)
        expect(state).toEqual({
            status: 'autenticado',
            uid: demoUser.uid,
            email: demoUser.email,
            displayName: demoUser.displayName,
            photoURL: demoUser.photoURL,
            errorMessage: null,

        })
    });
    test('debe de realizar el logout y mostrar un mensaje de error', () => {
        const errorMessage = 'Credenciales incorrectas';

        const state = authSlice.reducer(authenticatedState, logout())
        console.log(state)
        expect(state).toEqual({
            status: 'no-autenticado', //not-authenticated, authenticated
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: undefined

        })

    });

    test('debe de realizar el logout y mostrar un mensaje de error', () => {
        const errorMessage = 'Credenciales incorrectas';

        const state = authSlice.reducer(authenticatedState, logout({errorMessage:errorMessage}))
        console.log(state)
        expect(state).toEqual({
            status: 'no-autenticado', //not-authenticated, authenticated
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: errorMessage

        })

    });

    test('debe de cambiar el estado a checking', () => { 
        const state = authSlice.reducer(authenticatedState,checkingCredentials());
        expect(state.status).toBe('checking')
     })
})