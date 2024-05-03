"use client"
import Button from "@/components/ReusableComponents/Button";
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { registerSubmit } from '@/lib/action';
import axios from "axios";
import emailjs from 'emailjs-com';


const ContactPage = () => {

    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [mailSended, setMailSended] = useState(false);

    const sendMail = async (data: any) => {
        let { firstName, title, message } = data;
        emailjs.init("ylvtH6e-Xx1ZLwDbg");

        var params = {
            senderName: firstName,
            to: "medismael14@gmail.com",
            subject: `Ciana - ${title}`,
            message: message
        };

        var serviceID = "service_9jfsnds";
        var templateID = "template_ad3temq";

        await emailjs.send(serviceID, templateID, params).catch();
    }

    const formSubmit = async (data: any) => {
        reset()

        sendMail(data);
        setMailSended(true);

        setTimeout(() => {
            setMailSended(false);
        }, 4000)
      };

    return (
        <>
            {mailSended && (
                <div className="w-full text-green-700 flex justify-center text-center font-bold mb-[2rem]">Le mail a bien été envoyé</div>
            )}
            <h1 className="md:text-4xl lg:text-3xl font-bold text-center">Contactez nous</h1>
            <p className="md:text-lg  lg:text-base text-center">Si vous avez des questions ou des demandes qui pourraient susciter votre intérêt, n'hésitez pas à les poser !</p>
            <form action="" onSubmit={handleSubmit(formSubmit)} className="m-0 p-0">
            <div className="mt-5 bg-[#F8FFF6] p-5 pb-10 rounded-lg flex flex-col items-center font-consolas space-y-5 text-sm md:text-xl lg:text-base">
                    <div className="flex flex-col items-center w-[70%] bg-inherit">
                        <label htmlFor="email" className="bg-inherit">Votre prenom:</label>
                        <input 
                            type="text"
                            id="firstName" 
                            placeholder="Ex:(Franck Vincent)" 
                            className="bg-white p-2 w-[25rem] h-[2.5rem] rounded-lg outline-none border-2 border-[--tertiary-color]"
                            {...register('firstName', {
                                required: "Le prenom est requis",
                                minLength: { value: 3, message: "Vous devez au moins depasser 8 caractère" }
                            })} 
                        />
                        <div className="bg-inherit text-red-600">{errors.firstName && <>{errors.firstName.message}</>}</div>
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