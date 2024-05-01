import { FastifyInstance } from "fastify";
import {decodetoken,loginHandler, registerUserHandler, getUsersHandler, deleteUsersHandler, updateUserHandler, UploadFile} from './user.controller'
import { $ref } from "./user.schema";
import { string } from "zod";
async function userRoutes(server: FastifyInstance){

//register route
server.post('/',{

    schema: {
        body: $ref('createUserSchema'),
        response:{
            201: $ref('createUserResponseSchema')
        }

    }
}, registerUserHandler);


//login route
server.post('/login', {

    schema:{
        body: $ref('loginSchema'),
        response:{
            200:$ref('loginResponseSchema')
        }
    }
}, loginHandler)


 // Route pour vérifier le token
server.get('/', {
    schema: {
        querystring: {
            token: { type: 'string' }
        },
        response: {
            200: {
                type: 'object',
                properties: {
                    message: { type: 'string' }
                }
            }
        }
    }
}, decodetoken);


 






//Find users route
server.get('/findUsers', getUsersHandler)


//delete user route
server.delete('/:id', {
    schema: {
        params: {
            type: 'object',
            properties: {
                id: { type: 'string' }
            }
        },
        response: {
            200: {
                type: 'object',
                properties: {
                    message: { type: 'string' }
                }
            }
        }
    }
}, deleteUsersHandler)

server.post('/upload', {
    schema: {
        body: {
            fileName: { type: 'string' }
        },
        response: {
            200: {
                type: 'object',
                properties: {
                    message: { type: 'string' }
                }
            }
        }
    }
}, UploadFile)

// route

//update user route
server.put('/:id', {
    schema: {
        params: {
            type: 'object',
            properties: {
                id: { type: 'string' }
            }
        },
        body: $ref('updateUserSchema'),
        response: {
            200: $ref('createUserResponseSchema')
        }
    }
}, updateUserHandler);

}

export default userRoutes;