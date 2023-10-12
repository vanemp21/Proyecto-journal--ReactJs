
import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, signInWithGoogle } from '../../../src/firebase/providers'
import { checkingCredentials} from '../../../src/store/auth'
import { checkingAuthentication, startGoogleSignIn, startLoginWithEmailPassword, startLogout } from "../../../src/store/auth/thunks"
import { demoUser} from "../../fixtures/authFixtures"
import { login, logout} from "../../../src/store/auth/authSlice"
import { clearNotesLogout } from '../../../src/store/journal/journalSlice'
jest.mock('../../../src/firebase/providers')

describe('Pruebas en authunks', () => { 
    const dispatch= jest.fn();
    beforeEach(()=>jest.clearAllMocks())
    test('debe invocar el checkingCredentials', async() => { 
       
       await checkingAuthentication()(dispatch); //manda a ejecutar un dispatch, una funcion
       expect(dispatch).toHaveBeenCalledWith(checkingCredentials()) // que esa funcion sea el checkingcredentials
     })

     test('startGoogleSignIn debe de llamar checkingcredentials y login - Exitosamente', async() => { 
        const loginData = { ok: true,...demoUser};
         await signInWithGoogle.mockResolvedValue(loginData);
         await startGoogleSignIn()(dispatch); //ejecuta el dispatch
         expect(dispatch).toHaveBeenCalledWith(checkingCredentials()) //comprobar que el dispatch que ejecuta sea checkingcredentials, porque lo que ejecuta el dispatch son funciones
         expect(dispatch).toHaveBeenCalledWith(login(loginData)) //hay 2 dispatch dentro de startgooglesignin

      })

      test('startGoogleSignIn debe de llamar checkingcredentials y login - Exitosamente', async() => { 
        const loginData = { ok: false,errorMessage: 'Error en los datos'};
        await signInWithGoogle.mockResolvedValue(loginData);
        await startGoogleSignIn()(dispatch); //ejecuta el dispatch
        expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
        expect(dispatch).toHaveBeenCalledWith(logout(loginData.errorMessage)) //espero que salte el error


      })
      test('startLoginWithEmailPassword debe de llamar checkingCredentials y login - Exito', async() => { 
        const loginData = {ok:true, ...demoUser};
        const formData = {email: demoUser.email, password: '123456'}
        await loginWithEmailPassword.mockResolvedValue(loginData) //esto es para comprobar el "ok:true"
        await startLoginWithEmailPassword(formData)(dispatch)//una vez llegado a este punto...
        expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
        expect(dispatch).toHaveBeenCalledWith(login(loginData))
        
       })
       test('startCreatingUserWithEmailPassword debe de llamar a sus funciones',async()=>{
        const loginData = {ok:true, ...demoUser}
        await registerUserWithEmailPassword.mockResolvedValue(loginData)
        await startLoginWithEmailPassword( {email: demoUser.email, password: '12345'})(dispatch)
        expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
        expect(dispatch).toHaveBeenCalledWith(login(loginData))


       })

       test('startLogout debe de llamar logoutFirebase, clearNotes y logout', async() => { 

        await startLogout()(dispatch);
        expect(logoutFirebase).toHaveBeenCalled();
        expect(dispatch).toHaveBeenCalledWith(clearNotesLogout());
        expect(dispatch).toHaveBeenCalledWith(logout({}))
        })
 })