import { useEffect, useState,useMemo } from 'react';

export const useForm = ( initialForm = {} , formValidations={}) => {
  //obtengo el objeto inicial
    const [ formState, setFormState ] = useState( initialForm );
    const [formValidation,setFormValidation] = useState({});
    //cada vez que hay un cambio en el formstate se ejecuta createvalidators
    useEffect(()=>{
        createValidators();
    },[formState])

    const isFormValid = useMemo(()=>{
        for (const formValue of Object.keys(formValidation)) {
            if(formValidation[formValue] !==null) return false;
        }
        return true;
    },[formValidation])
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

    const createValidators = ()=>{
        const formCheckedValues = {};
        for(const formField of Object.keys(formValidations)){
            const [fn,errorMessage='Este campo es requerido'] = formValidations[formField]
            formCheckedValues[`${formField}Valid`] = fn(formState[formField]) ? null:errorMessage
        }
        setFormValidation(formCheckedValues);
        //console.log(formCheckedValues)
    }
    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,
        ...formValidation,
        isFormValid
    }
}