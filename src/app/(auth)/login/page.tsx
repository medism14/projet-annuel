"use client"
import DivInput from "@/components/Form/DivInput/DivInput";
import Form from "@/components/Form/Form";
import { useForm } from "react-hook-form";
import axios from "axios";
import { setUserState } from "@/redux/features/AppState";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const LoginPage = () => {

    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const dispatch = useAppDispatch();
    const router = useRouter();
    const userState = useAppSelector(state => state.AppState.userState);

    const handleLogin = async (data: any) => {
        reset();
        
        const { email, password }: {email: string, password: string} = data;
        
        try {
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
            
        }
    }

    useEffect(() => {
        if (localStorage.getItem("logged") == "true") {
            router.push("/");
        }        
    }, [])

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