"use client"
import DivInput from "@/components/Form/DivInput/DivInput";
import Input from "@/components/Form/DivInput/Input/Input";
import Form from "@/components/Form/Form";
import { useForm } from 'react-hook-form';

const RegisterPage = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleRegister = async (data: any) => {
        console.log('handled register');
    }

    return (
        <Form title="Inscription" buttonValue={"S'inscrire"} onClick={handleSubmit(handleRegister)}>
            <DivInput>
                <input 
                    className={`text-[--tertiary-color] bg-[--secondary-color] border-2 border-[--tertiary-color] h-[2rem] rounded-md outline-none w-full p-3 py-4`} 
                    type="text" 
                    placeholder="Prénom*" 
                    {...register('firstName', {
                        required: "Le prenom est requis",
                    })}
                />
                <input 
                    className={`text-[--tertiary-color] bg-[--secondary-color] border-2 border-[--tertiary-color] h-[2rem] rounded-md outline-none w-full p-3 py-4`} 
                    type="text" 
                    placeholder="Nom*" 
                    {...register('lastName', {
                        required: "Le nom est requis"
                    })}
                />
            </DivInput>
                <div className="bg-inherit text-red-600 mt-1">{errors.lastName && <>{errors.lastName.message}</>}</div>
                <div className="bg-inherit text-red-600 mt-1">{errors.firstName && <>{errors.firstName.message}</>}</div>
            
            <DivInput>
                <input 
                    className={`text-[--tertiary-color] bg-[--secondary-color] border-2 border-[--tertiary-color] h-[2rem] rounded-md outline-none w-full p-3 py-4`} 
                    type="email" 
                    placeholder="Email*" 
                    {...register('email', {
                        required: "L'email est requis",
                    })}
                />
            </DivInput>
                <div className=" bg-inherit text-red-600 mt-1">{errors.email && <>{errors.email.message}</>}</div>

            <DivInput>
                <input 
                    className={`text-[--tertiary-color] bg-[--secondary-color] border-2 border-[--tertiary-color] h-[2rem] rounded-md outline-none w-full p-3 py-4`} 
                    type="password" 
                    placeholder="Mot de passe*" 
                    {...register('password', {
                        required: "Le mot de passe est réquis",
                    })}
                />
            </DivInput>
                <div className="bg-inherit text-red-600 mt-1">{errors.password && <>{errors.password.message}</>}</div>

            <DivInput>
                <input 
                    className={`text-[--tertiary-color] bg-[--secondary-color] border-2 border-[--tertiary-color] h-[2rem] rounded-md outline-none w-full p-3 py-4`} 
                    type="password" 
                    placeholder="Confirmer votre mot passe*"
                    {...register('passwordConfirmation', {
                        required: "La confirmation du mot de passe est réquise",
                    })} 
                />
            </DivInput>
            <div className="bg-inherit text-red-600 mt-1">{errors.passwordConfirmation && <>{errors.passwordConfirmation.message}</>}</div>
        </Form>
    );
}

export default RegisterPage;