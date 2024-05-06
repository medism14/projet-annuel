"use client"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import {
    faCloudArrowUp
} from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";
import axios from "axios";
import { useAppSelector } from "@/redux/hooks";


const AnalysePage = () => {

    const importRef: any = useRef(null);
    const inputFileRef: any = useRef(null);

    const [modalStatus, setModalStatus] = useState(false);

    const [loading, setIsLoading] = useState(false);
    
    const [predictedClass, setPredictedClass] = useState("");
    const [probability, setProbability] = useState("");
    const [actualImage, setActualImage] = useState("");

    let userState = useAppSelector(state => state.AppState.userState);

    // const [predictedClass, setPredictedClass] = useState("Shrimp");
    // const [probability, setProbability] = useState("80%");
    // const [actualImage, setActualImage] = useState("Shrimp1.png");

    const handleImageChange = async (event: any) => {
        setIsLoading(true);
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];

            if (!file.type.startsWith("image/")) {
                console.error("File is not supported");
                alert("Vous devez uploader une image");
                return
            }   

            const reader = new FileReader();
            reader.onloadend = async () => {
                let base64Data: any = reader.result;
                base64Data = base64Data.toString();
                try {
                    
                    let userId = localStorage.getItem('userId');
                    if (!userId) {
                        userId = null;
                    }

                    const dataBody = {
                        fileName: file.name, 
                        base64: base64Data,
                        userId: userId,
                    }

                    const response = await axios.post('http://localhost:3001/api/users/upload', dataBody);
                    let data = await response.data;

                    let fileName = data.fileName;
                    let predictedType = data.predictedClass;
                    let predictedProba = data.predictedProba;

                    predictedProba = predictedProba * 100 + '%';

                    setIsLoading(false);
                    setModalStatus(true);
                    setPredictedClass(predictedType);
                    setProbability(predictedProba);
                    setActualImage(fileName);

                } catch (error) {
                    console.error('Error uploading file:', error);
                }
            }
            reader.readAsDataURL(file)
        }
    }

    const handleImport = (event: any) => {
        let inputFile = inputFileRef.current;

        inputFile.click();
    }

    const handleCloseModal = () => {
        setModalStatus(false);
    }

    return (
        <>
            <div className="flex flex-col items-center text-center">
                {loading && (
                    <div>
                        <img src="/loading.svg" alt=""  className="lg:mb-[50px] lg:w-[150px] lg:h-[150px] md:mb-[50px] md:w-[150px] md:h-[150px] mb-[50px] w-[100px] h-[100px]" />
                    </div>
                )} 
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
            {modalStatus && (
                <div className="absolute inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-[--primary-color] flex flex-col mt-[-10%] lg:w-[50%] md:w-[70%] w-[90%]">
                        {/* Header */}
                        <div className="bg-[--secondary-color] px-10 py-5 rounded-t-lg flex justify-between space-x-5">
                            <div className="bg-inherit"></div>
                            <p className="bg-inherit lg:text-3xl md:text-3xl font-bold">Prédiciton de l'image</p>
                            <div className="bg-inherit flex justify-center items-center"><FontAwesomeIcon icon={faClose} className="bg-inherit lg:text-4xl md:text-4xl font-bold cursor-pointer" onClick={handleCloseModal}/></div>
                        </div>

                        {/* Body */}
                        <div className="bg-[--accent-color] flex flex-col px-7 py-4 text-gray-100">
                            <div className="bg-inherit text-center lg:text-lg md:text-xl"><span className="font-bold bg-inherit">Type du poisson prédit:</span> {predictedClass}</div>
                            <div className="bg-inherit text-center lg:text-lg md:text-xl mb-[30px]"><span className="font-bold bg-inherit">Probabilité de réussite:</span> {probability}</div>
                            <div className="flex justify-center space-x-5 bg-inherit">
                                {predictedClass != "Indéterminé" && (
                                    <div className="flex flex-col bg-inherit justify-center items-center flex-1 object-contain">
                                        <p className="bg-inherit text-gray-100 lg:text-lg md:text-xl">Image original</p>
                                        {/* <p className="bg-inherit text-gray-100 lg:text-lg md:text-xl font-bolds underline">{originalClass}</p> */}
                                        <img src={`/Images/Categorie/${predictedClass}.jpg`} alt="" className="" />
                                    </div>
                                )}
                                <div className="flex flex-col bg-inherit justify-center items-center flex-1 object-contain">
                                    <p className="bg-inherit text-gray-100 lg:text-lg md:text-xl">Image entré</p>
                                    {/* <p className="bg-inherit text-gray-100 lg:text-lg md:text-xl font-bolds underline">{predictedClass}</p> */}
                                    <img src={`/Images/Test/${actualImage}`} alt="" className="" />
                                </div>
                            </div>
                        </div>
                        
                        
                        {/* Footer */}
                        <div className="bg-[--secondary-color] px-10 py-5 rounded-b-lg">
                            
                        </div>
                    </div>
                </div>
            )}
            
        </>
    );
}

export default AnalysePage;