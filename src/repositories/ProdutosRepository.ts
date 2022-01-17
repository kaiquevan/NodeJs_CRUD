import Produto, { ProdutoDocument, ProdutoAttributes } from "../model/Produto";
import { IProdutoRepository, ISalvarProdutoDTO } from "./IProdutoRepository";



class ProdutosRepository implements IProdutoRepository{

    constructor(){
    }
    
    

    async salvar({nome, descricao,  preco}: ISalvarProdutoDTO): Promise<ProdutoDocument> {

        const produto: ProdutoAttributes = {
            create_at: new Date(),
            descricao: descricao,
            nome: nome,
            preco: preco,
            update_at:null
        } 
       return await Produto.create(produto);
    }

    async obterTodos(): Promise<ProdutoDocument[]> {
        return await Produto.find({});
    }

    async obterPorId(id:string): Promise<ProdutoDocument> {
        return await Produto.findById(id);
    }

    async obterPorNome(nome:string): Promise<Boolean> {
        const produto =await Produto.findOne({nome: nome});
        return produto != null;
    }
    async deletar(id: string): Promise<ProdutoDocument> {
        return await Produto.findByIdAndDelete(id);
    }
    async alterar(id: string, nome: string, descricao: string, preco: number) {
        return await Produto.findByIdAndUpdate(
            {"_id":id},
            {
                nome:nome,
                descricao: descricao,
                preco: preco,
                update_at: new Date()
            },
            { new:true}
            );
    }

}
export {ProdutosRepository}