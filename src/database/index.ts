import mongoose, { Mongoose} from "mongoose";


    export const connect = async(): Promise<Mongoose> =>
     await mongoose.connect("mongodb+srv://kaiquevan:meuappnodecurso@cluster0.kbcq8.mongodb.net/meuappnodecurso?retryWrites=true&w=majority", {
        autoIndex: true,
        autoCreate: true
        });

