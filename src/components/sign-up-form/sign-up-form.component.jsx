import { useState } from "react";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import { 
    createAuthUserWithEmailAndPassword,
    createUserDocumentFromAuth 
} from '../../utils/firebase/firebase.utils'

import './sign-up-form.styles.scss'

const SignUpForm = () => {
    
    const defaultFormFields = {
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
    }

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        try {
            const { user } = await createAuthUserWithEmailAndPassword(
                email, 
                password
            );
            await createUserDocumentFromAuth(user, { displayName });
            resetFormFields();
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                alert('Cannot create user, email already in use.');
            } else {
                console.log("error", error);
            }
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        
        setFormFields({...formFields, [name]: value})
    }

    return (
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label="Display Name"
                    name="displayName" 
                    type="text" 
                    onChange={handleChange} 
                    value={displayName} 
                    required
                />
                <FormInput
                    label="Email" 
                    name="email" 
                    type="email" 
                    onChange={handleChange} 
                    value={email} 
                    required
                />

                <FormInput 
                    label="Password"
                    name="password" 
                    type="password" 
                    onChange={handleChange} 
                    value={password} 
                    required
                />

                <FormInput 
                    label="Confirm Password"
                    name="confirmPassword" 
                    type="password" 
                    onChange={handleChange} 
                    value={confirmPassword} 
                    required
                />
                <Button type="submit">Sign Up</Button>
            </form>
        </div>
    );
}

export default SignUpForm;