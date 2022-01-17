import { ProdutoDocument } from "../model/Produto";

interface ISalvarProdutoDTO{
    descricao: string;
    nome: string;
    preco: number;
}


interface IProdutoRepository{
    salvar({nome, descricao,  preco}: ISalvarProdutoDTO): Promise<ProdutoDocument>;
    obterTodos(): Promise<ProdutoDocument[]>;
    obterPorId(id:string): Promise<ProdutoDocument>;
    obterPorNome(nome:string): Promise<Boolean>;
    deletar(id:string): Promise<ProdutoDocument>;
    alterar(id:string, nome:string,  descricao: string,  preco:number): Promise<ProdutoDocument>;
}

export{IProdutoRepository, ISalvarProdutoDTO}