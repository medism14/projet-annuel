"use client"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCloudArrowUp
} from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";
import axios from "axios";

const AnalysePage = () => {

    const importRef: any = useRef(null);
    const inputFileRef: any = useRef(null);

    const [fileValue, setFileValue] = useState(null);

    const handleImageChange = async (event: any) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];

            if (!file.type.startsWith("image/")) {
                console.error("File is not supported");
                alert("Vous devez uploader une image");
                return
            }   

        try {
            let fileName = file.name;

            let data = {
                fileName: fileName
            }

            let response = await axios.post(`http://localhost:3001/api/users/upload`, data);
            console.log(response);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
        }
    }

    const handleImport = (event: any) => {
        let inputFile = inputFileRef.current;

        inputFile.click();
    }

    return (
        <div className="flex flex-col items-center text-center">
            <h1 className="text-lg md:text-6xl lg:text-4xl font-bold">Uploader votre fichier</h1>
            <p className="text-xs md:text-xl lg:text-lg">Determiner la présence de poissons dans une image numérique</p>
            <div ref={importRef} onClick={handleImport} className="
                w-[60%] text-sm          
                md:w-[40%] md:text-xl          
                lg:w-[30%] lg:text-base
                mt-5 flex flex-col bg-[--primary-color] items-center rounded-lg text-[--secondary-color] p-3 cursor-pointer">
                <input onChange={handleImageChange} ref={inputFileRef} type="file" name="fichier" className={`hidden`} accept=".jpg, .jpeg, .png" />
                <h1 className="bg-inherit">Importer votre fichier</h1>
                <FontAwesomeIcon icon={faCloudArrowUp} className="w-12 h-12 bg-inherit" />
            </div>
        </div>
    );
}

export default AnalysePage;