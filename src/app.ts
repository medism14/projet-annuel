import Fastify, {FastifyRequest, FastifyReply} from "fastify";
import userRoutes from "./modules/user/user.route";
import {userSchemas} from "./modules/user/user.schema"
import fjwt from "@fastify/jwt";
import cors from '@fastify/cors'

export const server = Fastify({
    bodyLimit: 15 * 1024 * 1024, // 15MB
  });

server.register(cors, { 
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true
  })

  
server.register(fjwt,{
secret: "yaaassssmmmiinneee",
});



server.decorate("authenticate", async(request: FastifyRequest, reply: FastifyReply)=>{

try{
    await request.jwtVerify();
}
catch(e){

    return reply.send(e);
}


});

server.get('/test', async function(){

    return{status: "OK"};
})

async function main(){

    for (const schema of userSchemas){
        server.addSchema(schema);
    }
server.register(userRoutes, {prefix: "api/users"})

    try {
        await server.listen(3001,'0.0.0.0');

        console.log(`Serveur pret sur http://localhost:3001`);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}
main();