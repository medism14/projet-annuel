"use client"
import DivInput from "@/components/Form/DivInput/DivInput";
import Input from "@/components/Form/DivInput/Input/Input";
import Form from "@/components/Form/Form";
import { useForm } from "react-hook-form";

const LoginPage = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleLogin = (data: any) => {
        console.log('logged')
    }

    return (
        <Form title="Authentification" buttonValue={"S'authentifier"} onClick={handleSubmit(handleLogin)}>
            <DivInput>
        <       input 
                    className={`text-[--tertiary-color] bg-[--secondary-color] border-2 border-[--tertiary-color] h-[2rem] rounded-md outline-none w-full p-3 py-4`} 
                    type='email' 
                    placeholder="Email*" 
                    {...register('email', {
                        required: "Le champ email est requis"
                    })}
                    />
            </DivInput>

            <DivInput>
                <input 
                    className={`text-[--tertiary-color] bg-[--secondary-color] border-2 border-[--tertiary-color] h-[2rem] rounded-md outline-none w-full p-3 py-4`} 
                    type="password" 
                    placeholder="Password*"
                    {...register('password', {
                        required: "Le champ mot de passe est requis"
                    })}
                />
            </DivInput>
        </Form>
    );
}

export default LoginPage;