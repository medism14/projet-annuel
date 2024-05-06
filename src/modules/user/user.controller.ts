import { FastifyReply, FastifyRequest } from "fastify";
import { CreateUser, findUserByEmail, findUsers, deleteUserById, updateUserById, createImage  } from "./user.service";
import { CreateUserInput, LoginInput, UpdateUserInput } from "./user.schema";
import { verifyPassword } from "../../utils/hash";
import { PrismaClient } from '@prisma/client';
import { server } from "../../app";
import jwt from "jsonwebtoken";
import { spawn } from 'child_process';

import Fastify from 'fastify'
import multipart from '@fastify/multipart'

export const app = Fastify({
    logger: true
  })

app.register(multipart);


export async function UploadFile (request: FastifyRequest<{ Body: { fileName: string, base64: string, userId: any } }>, reply: FastifyReply) {
    try {
        if (!request.body.fileName) {
            reply.code(400).send({ message: "Aucun chemin de fichier fourni" });
            return;
        }
        
        const fileName = request.body.fileName;
        const userId = request.body.userId;
        const base64Img = request.body.base64;
        const filePath = `C:/Users/Etudiant/Desktop/Personnel/Université/M1/S2/Projet web/code/frontend/public/Images/Test/${fileName}`;
        const encodedFilePath = Buffer.from(filePath).toString('utf-8');

        let predictedClass = '';
        let predictedProba = '';

        const python = spawn('python', ['-X', 'utf8', 'C:/Users/Etudiant/Desktop/Personnel/Université/M1/S2/Projet web/code/model.py', filePath]);

        // Créer une promesse pour écouter la fin de l'exécution du script Python

        const pythonPromise = new Promise<void>((resolve, reject) => {
            python.on('exit', (code) => {
                if (code === 0) {
                    resolve();
                } else {
                    reply.code(500).send({ message: "Une erreur est survenue" });
                    reject()
                }
            })
        })

        let dataResult = '';

        python.stdout.on('data', (data) => {
            // Accumulate the data
            dataResult += data.toString();
        });

        python.stdout.on('end', () => {

            let matches = dataResult.match(/\|(.+?)\|/g);

            if (matches) {
                predictedClass = matches[0].replace(/\|/g, '').replace(/\s/g, '');
                predictedProba = matches[1].replace(/\|/g, '').replace(/\s/g, '');
            }

            reply.code(200).send({ fileName: fileName, predictedClass: predictedClass, predictedProba: predictedProba });
        });

        python.stderr.on('data', (data) => {
            console.error("Python stderr:", data.toString());
        });

        let currentDateTime = new Date();
        
        await pythonPromise;

        
        const body = {
            base64Img,
            currentDateTime,
            predictedClass,
            predictedProba,
            userId
        }
        
        try {
            await createImage(body);
        } catch (error) {
            console.error(error);
        }

    } catch (error) {
        console.error('Une erreur est survenue :', error);
        reply.code(500).send({ message: "Une erreur est survenue lors de l'upload du fichier" });
    }
}

//register user
export async function registerUserHandler(
request: FastifyRequest<{
Body: CreateUserInput;

}>,
reply: FastifyReply)
{
    const body = request.body

    try {
        
        const user = await CreateUser(body);
        return reply.code(201).send(user);
    
    } catch (error) {
        console.log(error);
        return reply.code(500).send(error);
    }
}

    //login 
    export async function loginHandler(request: FastifyRequest<{
    Body: LoginInput
    }>, reply: FastifyReply){

        const body = request.body

        //find a user by email
        const user = await findUserByEmail(body.email)
        
        if (!user){
            return reply.code(401).send({
                message: "INVALID email or password",
            })
        }
        
        
        //verify password
        const correctPassword = verifyPassword({
            candidatePassword: body.password,
            salt: user.salt,
            hash: user.password
        })
        
        if (correctPassword){
            const {password, salt, ...rest}= user;

            reply.code(200).send({ accessToken: server.jwt.sign(rest), userId: user.id });
        }
        
        return reply.code(401).send({
            message: "INVALID email or password",});
        }
        
    //list users
    export async function getUsersHandler(){
        const users = await findUsers();

        return users;
}




//delete user
export async function deleteUsersHandler(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    const { id } = request.params;
    
    try {
        await deleteUserById(id);
        reply.code(200).send({ message: "User deleted successfully" });
    } catch (error) {
        reply.code(500).send({ message: "Failed to delete user" });
    }
}

//verify token

export async function decodetoken(request: FastifyRequest<{ Querystring: { token: string } }>, reply: FastifyReply) {
    const { token } = request.query;
    const SECRET_KEY = "yaaassssmmmiinneee";

    try {
        const tokendecoded = jwt.verify(token, SECRET_KEY);
        reply.code(200).send({ message: "good", decodedToken: tokendecoded });
    } catch (error:any) {
        reply.code(200).send({ result: "bad", error: error.message });
    }
}


//update user by id :

export async function updateUserHandler(request: FastifyRequest<{ Params: { id: string }, Body: UpdateUserInput }>, reply: FastifyReply) {
    const { id } = request.params;
    const { name, email } = request.body;
    
    try {
        const updatedUser = await updateUserById(id, { name, email });
        reply.code(200).send(updatedUser);
    } catch (error) {
        reply.code(500).send({ message: "Faileeeed to update user" });
    }
}


