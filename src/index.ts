import dotenv from 'dotenv'
import { httpServer } from './app'
import connectDB from './db';

dotenv.config({
    path: "./.env"
})


const startServer = () => {
    httpServer.listen(process.env.PORT || 8080, ()=>{
        console.info(
            `Visit the documentation at: http://localhost:${process.env.PORT || 8080 }`
        );
    });
};

   connectDB().then(
        ()=> {
            startServer()
        }
    ).catch(err => {
        console.error("Mongo db connect error: ", err)
    })
