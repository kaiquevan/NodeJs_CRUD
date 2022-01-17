import {Request, Response} from 'express';
import { ProdutoService } from "../services/ProdutoService";
import { ProdutosRepository } from "../repositories/ProdutosRepository";

const produtosRepository = new ProdutosRepository();

class ProdutosController{

    //Salvar
    async salvar(request: Request, response: Response): Promise<Response>{
        const{nome,  descricao, preco} = request.body;
        
        const produtoService = new ProdutoService(produtosRepository);
        
        const produto = await produtoService.salvar({nome,descricao,preco})
        
        return response.status(201).json({
            message:"Salvo com sucesso",
            produto: produto
        });
    }

    //Alterar

    async alterar(request: Request, response: Response): Promise<Response>{
        const { id, nome, descricao, preco } = request.body;

        const produtoService = new ProdutoService(produtosRepository);
        const produtoAlterado = await produtoService.alterar({ id, nome, descricao, preco });
    
        return response.json({
            message:  "Alterado com sucesso!",
            produto: produtoAlterado
        });
    }
    
    //Deletar
    
    async deletar(request: Request, response: Response): Promise<Response>{
        const { id } = request.query;
        const produtoService = new ProdutoService(produtosRepository);
        const produtoDeletado = await produtoService.deletar(id as string);
    
        return response.status(200).json({
            message: "Deletado com sucesso",
            produto: produtoDeletado
        });
    
    }

    //Obter Todos
    
    async obterTodos(request: Request, response: Response): Promise<Response>{
        const produtoService = new ProdutoService(produtosRepository);
        const listaProtudos = await produtoService.obterTodos();
    
        return response.json(listaProtudos);
    }

    //Obter por ID

    async obterPorId(request: Request, response: Response): Promise<Response>{
        const { id } = request.query;
        const produtoService = new ProdutoService(produtosRepository);
        const produto = await produtoService.obterPorId(id as string);
    
        return response.json(produto);

    }


}

export  { ProdutosController };