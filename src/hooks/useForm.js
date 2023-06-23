import { useState } from 'react';

export const useForm = ( initialForm = {} ) => {
  //obtengo el objeto inicial
    const [ formState, setFormState ] = useState( initialForm );

    const onInputChange = ({ target }) => {
        //el name y el value del target e.target.value - e.target.name
        const { name, value } = target;
        //seteo con lo que hay + lo nuevo
        setFormState({
            ...formState,
            [ name ]: value //esto equivale a decir formState["username"] o formState["email"]
            //pilla el name del target 
        });
    }

    const onResetForm = () => {
        //lo reseteo dejandolo como al inicio
        setFormState( initialForm );
    }

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,
    }
}