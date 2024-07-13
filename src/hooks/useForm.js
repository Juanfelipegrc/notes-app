import { useEffect, useMemo, useState } from "react"



export const useForm = (initialForm, validations = {}) => {

    const [formState, setFormState] = useState(initialForm);


    const [formValidation, setFormValidation] = useState({})


    useEffect(() => {
        setFormState(initialForm);
    }, [initialForm]);
    
    useEffect(() => {
      checkValidations();
    }, [formState])

    const isFormValid = useMemo(() => {
        for (const formValue of Object.keys(formValidation)) {
            if(formValidation[formValue] !== null) return false;            
        }

        return true;
    })
    
    
    const checkValidations = () =>{

        const formCheckedValues = {};

        for (const formField of Object.keys(validations)) {

            const [fn, errorMessage] = validations[formField];

            formCheckedValues[`${formField}Valid`] = fn(formState[formField]) ? null : errorMessage;

            setFormValidation(formCheckedValues)

            
        }

    }


    const onInputChange = ({target}) => {

        const {name, value} = target;
        setFormState({
            ...formState,
            [name]: value
        })
        
    }

    const onResetForm = () => {
        setFormState(initialForm)
    }

    

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,
        ...formValidation,
        formValidation,
        isFormValid,
    }
    
    
    
}
