import { ProdutoAttributes } from "../model/Produto";

interface ISalvarProdutoDTO{
    descricao: string;
    nome: string;
    preco: number;
}


interface IProdutoRepository{
    salvar({nome, descricao,  preco}: ISalvarProdutoDTO): Promise<ProdutoAttributes>;
    obterTodos(): Promise<ProdutoAttributes[]>;
    obterPorId(id:string): Promise<ProdutoAttributes>;
    obterPorNome(nome:string): Promise<Boolean>;
    deletar(id:string): Promise<ProdutoAttributes>;
    alterar(id:string, nome:string,  descricao: string,  preco:number): Promise<ProdutoAttributes>;
}

export{IProdutoRepository, ISalvarProdutoDTO}