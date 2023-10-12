export const initialState = {
    status: 'checking', //not-authenticated, authenticated
    uid: null,
    email:null,
    displayName: null,
    photoURL: null,
    errorMessage: null
}
export const authenticatedState = {
    status: 'autenticado', //not-authenticated, authenticated
    uid: '123ABC',
    email:'pepito@google.com',
    displayName: 'Demo user',
    photoURL: 'https://imagen.jpg',
    errorMessage: null
}

export const notAuthenticatedState = {
    status: 'no-autenticado', //not-authenticated, authenticated
    uid: null,
    email:null,
    displayName: null,
    photoURL: null,
    errorMessage: null
}

export const demoUser = {
    uid: 'ABC123',
    email: 'demo@google.es',
    displayName: 'Demo user',
    photoURL: 'https://demo.jpg'
}