"use client"
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDoorOpen } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setUserState } from "@/redux/features/AppState";

const Auth = () => {

    const [auth, setAuth] = useState(false);
    const [loading, setLoading] = useState(true);

    let userState = useAppSelector(state => state.AppState.userState);

    const dispatch = useAppDispatch();

    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        localStorage.setItem("logged", "false");
        dispatch(setUserState(!userState));
        router.push('/');
    }

    
    useEffect(() => {
        let accessToken = localStorage.getItem('accessToken');

        const checkAccessToken = async (accessToken: any) => {  

            if (accessToken) {
                try {
                    let response = await axios.get(`http://localhost:3001/api/users/?token=${accessToken}`);
    
                    let data = await response.data;
    
                    if (data.message == "good") {
                        localStorage.setItem("logged", "true");
                    } else {
                        localStorage.setItem("logged", "false");
                    }
                } catch (error) {
                    console.error(error);
                }
            } else {
                localStorage.setItem("logged", "false");
            }
        }
        
        checkAccessToken(accessToken);

        if (localStorage.getItem("logged") == "true") {
            setAuth(true);
        } else {
            setAuth(false);
        }

        setLoading(false);

    }, [userState])

    if (loading) {
        return null
    }

    if (auth) {
        return (
            <div onClick={handleLogout} className="flex space-x-3 text-lg md:text-4xl lg:text-2xl cursor-pointer">
                <FontAwesomeIcon icon={faDoorOpen} />
            </div>
        );
    }
    
    return (
        <div className="flex space-x-3">
            <Link href="/login" 
                className={`
                text-[0.6rem] px-2 py-1
                md:text-lg md:px-2 md:py-1
                lg:text-base lg:px-3 lg:py-1
                bg-[--primary-color] text-[--secondary-color] rounded-xl
            `}>Se connecter</Link>

            <Link href="/register" 
                className={`
                text-[0.6rem] px-2 py-1
                md:text-lg md:px-2 md:py-1
                lg:text-base lg:px-3 lg:py-1
                bg-[--primary-color] text-[--secondary-color] rounded-xl
            `}>S'inscrire</Link>
        </div>
    );
}

export default Auth;