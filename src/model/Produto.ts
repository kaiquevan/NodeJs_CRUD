import mongoose, { Document, Model, Schema} from 'mongoose';

export class ProdutoAttributes  {
    id?: string;
    preco:number;
    nome: string;
    descricao:string;
    create_at: Date;
    update_at?: Date;
}

export type ProdutoDocument = Document & ProdutoAttributes;
type ProdutoModel = Model<ProdutoDocument>;

const ProdutoSchema = new Schema(
    {
        preco:{
            type: Number,
            required: true
        },
        nome:{
            type: String,
            required: true
        },
        descricao:{
            type: String,
            required: true
        },
        create_at:{
            type: Date,
            required: true
        },
        update_at:{
            type: Date,
            required: false
        }

    }
)


export default mongoose.model<ProdutoDocument, ProdutoModel>('Produto', ProdutoSchema);