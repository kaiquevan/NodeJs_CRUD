import { ProdutoAttributes } from "../model/Produto";
import { IProdutoRepository } from "../repositories/IProdutoRepository";
import { AppError } from '../erros/AppError';


interface IRequest{
    id?: string;
    nome: string;
    descricao:string;
    preco:number;

}

class ProdutoService{

    constructor(private produtosRepository: IProdutoRepository ){ }

        async salvar({nome, descricao, preco}: IRequest):Promise<ProdutoAttributes> {

            const produtoExiste = await this.produtosRepository.obterPorNome(nome);

                if(produtoExiste){
                    throw new AppError("Produto já existe!");
                }

            return await this.produtosRepository.salvar({nome, descricao, preco});
        }


        async alterar({id, nome,descricao,preco}: IRequest): Promise<ProdutoAttributes>{
            return await this.produtosRepository.alterar(id,nome,descricao,preco);
        }

        async deletar( id: string):Promise<ProdutoAttributes>{
            const produtoDeletado = await this.produtosRepository.deletar(id);
            if(!produtoDeletado){
                throw new AppError("Produto não encontrado!")
            }
            return produtoDeletado ;
        }

        async obterTodos(): Promise<ProdutoAttributes[]>{
            return await this.produtosRepository.obterTodos();   
        }

        async obterPorId(id:string): Promise<ProdutoAttributes>{
            return await this.produtosRepository.obterPorId(id);
            
        }
        
        

}


export {ProdutoService};