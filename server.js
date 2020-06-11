import express from "express";
import cors from "cors";
import routerContrato from "./routes/contratos-routes";
import fileUpload from "express-fileupload"


const app = express();

app.use(cors());
app.use(fileUpload());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api', routerContrato);

app.listen(3000).on('listening', () => {
    console.log('app running :)');
});

export default app;