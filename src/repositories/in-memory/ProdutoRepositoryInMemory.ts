import Produto, {ProdutoDocument, ProdutoAttributes } from "../../model/Produto";
import { IProdutoRepository, ISalvarProdutoDTO } from "../IProdutoRepository";


class ProdutoRepositoryInMemory implements IProdutoRepository{
    produtos : ProdutoAttributes[]=[];
 

    async salvar({ nome, descricao, preco }: ISalvarProdutoDTO): Promise<ProdutoAttributes> {
        const produto= new ProdutoAttributes();

        Object.assign(produto, {
            nome,
            descricao,
            preco,
            id:"shaus4saushau44"
        });
        this.produtos.push(produto);
        return produto;
    }

    async obterTodos(): Promise<ProdutoAttributes[]> {
        return this.produtos;
    }

    async obterPorId(id: string): Promise<ProdutoAttributes> {
        return this.produtos.find((produto) => produto.id === id);
    }

    async obterPorNome(nome: string): Promise<Boolean> {
        const produto = this.produtos.find((produto) => produto.nome === nome);
        return produto != null;
    }

    async deletar(id: string): Promise<ProdutoAttributes> {
        const produto = this.produtos.find((produto) => produto.id === id);

        this.produtos.slice(this.produtos.indexOf(produto),1);
        return produto;
    }

    async alterar(id: string, nome: string, descricao: string, preco: number): Promise<ProdutoAttributes> {
        const produto = this.produtos.find((produto) => produto.id === id);
        Object.assign(produto, {
            nome,
            descricao,
            preco,
            id:"shaus4saushau44"
        });
        return produto;
    }
    
}

export{ProdutoRepositoryInMemory};