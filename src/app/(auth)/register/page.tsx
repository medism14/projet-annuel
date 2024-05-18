"use client"
import DivInput from "@/components/Form/DivInput/DivInput";
import Input from "@/components/Form/DivInput/Input/Input";
import Form from "@/components/Form/Form";
import { setUserState } from "@/redux/features/AppState";
import axios from "axios";
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation'
import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";


const RegisterPage = () => {

    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const router = useRouter();
    const userState = useAppSelector(state => state.AppState.userState);
    const dispatch = useAppDispatch();

    const handleRegister = async (data: any) => {
        reset();
        
        const { firstName, lastName, email, password }: { firstName: string, lastName: string, email: string, password: string} = data;
        
        try {
            await axios.post("http://localhost:3001/api/users", {
                email: email,
                name: `${firstName} ${lastName}`,
                password: password
            });
            
            let response = await axios.post("http://localhost:3001/api/users/login", {
                email: email,
                password: password
            });
            
            let data = await response.data;

            localStorage.setItem("accessToken", data.accessToken);
            localStorage.setItem("logged", "true");
            localStorage.setItem("userId", data.userId);
            dispatch(setUserState(!userState));
            router.push('/analyse');
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (localStorage.getItem("logged") == "true") {
            router.push("/");
        }        
    }, [])

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

function dispatch(arg0: { payload: boolean; type: "AppState/setUserState"; }) {
    throw new Error("Function not implemented.");
}
