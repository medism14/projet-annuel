"use client"
import Button from "@/components/ReusableComponents/Button";
import React from 'react';
import { useForm } from 'react-hook-form';
import { registerSubmit } from '@/lib/action';
import axios from "axios";

const ContactPage = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data: any) => {
        try {
          const response = await axios.post('/api/messageEvent', data, {
            headers: { 'Content-Type': 'application/json' },
          });
          console.log(response.data);
        } catch (error) {
          console.error('Error sending message:', error);
        }
      };

    return (
        <>
            <form action="" onSubmit={handleSubmit(onSubmit)} className="m-0 p-0">
            <h1 className="md:text-4xl lg:text-3xl font-bold text-center">Contactez nous</h1>
            <p className="md:text-lg  lg:text-base text-center">Si vous avez des questions ou des demandes qui pourraient susciter votre intérêt, n'hésitez pas à les poser !</p>
            <div className="mt-5 bg-[#F8FFF6] p-5 pb-10 rounded-lg flex flex-col items-center font-consolas space-y-5 text-sm md:text-xl lg:text-base">
                    <div className="flex flex-col items-center w-[70%] bg-inherit">
                        <label htmlFor="email" className="bg-inherit">Votre mail:</label>
                        <input 
                            type="email"
                            id="email" 
                            placeholder="Ex:(test@gmail.com)" 
                            className="bg-white p-2 w-[25rem] h-[2.5rem] rounded-lg outline-none border-2 border-[--tertiary-color]"
                            {...register('email', {
                                required: "L'email est requis",
                                minLength: { value: 8, message: "Vous devez au moins depasser 8 caractère" }
                            })} 
                        />
                        <div className="bg-inherit text-red-600">{errors.email && <>{errors.email.message}</>}</div>
                    </div>
                    <div className="flex flex-col items-center w-[70%] bg-inherit">
                        <label htmlFor="email" className="bg-inherit">Titre:</label>
                        <input 
                            type="title"
                            id="title" 
                            placeholder="Ex:(Demande de collaboration)" 
                            className="bg-white p-2 w-[25rem] h-[2.5rem] rounded-lg outline-none border-2 border-[--tertiary-color]"
                            {...register('title', {
                                required: "Le titre est requis",
                                minLength: { value: 2, message: "Vous devez au moins depasser 8 caractère" }
                            })} 
                        />
                        <div className="bg-inherit text-red-600">{errors.title && <>{errors.title.message}</>}</div>
                    </div>
                    <div className="flex flex-col items-center w-[70%] bg-inherit">
                        <label htmlFor="email" className="bg-inherit">Votre message:</label>
                        <textarea 
                            id="message" 
                            rows={5} 
                            placeholder="Ex:(Bonjour, j'aimerais bien collaborer avec vous, je trouve votre modèle très performant et intéressant)" 
                            className="bg-white w-full p-2 rounded-lg outline-none border-2 border-[--tertiary-color]"
                            {...register('message', {
                                required: "Le champ message est requis",
                                maxLength: {value: 100, message: "Vous ne devez pas dépasser 100 caractère"}
                            })}
                        ></textarea>
                        <div className="bg-inherit text-red-600">{errors.message && <>{errors.message.message}</>}</div>
                    </div>
                    <Button value="Envoyer" restClass={''}/>
            </div>
            </form>
        </>
    );
}

export default ContactPage;