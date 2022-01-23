import { convertToObject } from 'typescript';
import { AppError } from '../erros/AppError';
import {ProdutoRepositoryInMemory} from '../repositories/in-memory/ProdutoRepositoryInMemory';
import {ProdutoService} from '../services/ProdutoService';

let produtosRepository: ProdutoRepositoryInMemory;
let produtosService: ProdutoService;




describe("Produto service tests",() =>{
    beforeEach(() =>{
        produtosRepository = new ProdutoRepositoryInMemory();
        produtosService = new ProdutoService(produtosRepository);
    });

    it("Deve salvar o produto corretamente", async ()=>{
        const produto = {
            nome: "teste",
            descricao: "produto teste",
            preco: 9
        };
        const produtoInserido = await produtosService.salvar({
            nome: produto.nome,
            descricao: produto.descricao,
            preco: produto.preco
        });


        expect(produtoInserido).toHaveProperty('nome','teste');
        expect(produtoInserido).toHaveProperty('descricao','produto teste');
        expect(produtoInserido).toHaveProperty('preco',9);

    });

    it("Deve obter o produto por id corretamente", async ()=>{

        //o salvar dentro do teste de buscar por ID é pq o jest limpa assim que finaliza.

        const produto = {
            nome: "teste",
            descricao: "produto teste",
            preco: 9
        };
        const produtoInserido = await produtosService.salvar({
            nome: produto.nome,
            descricao: produto.descricao,
            preco: produto.preco
        });

        const produtoParaObterId = await produtosService.obterPorId("shaus4saushau44");
        
        expect(produtoParaObterId).toHaveProperty('id', 'shaus4saushau44');

    });

    it("Deve obter todos os produtos corretamente", async ()=>{
        const produtoParaInserir1 = {
            nome: "teste",
            descricao: "produto teste",
            preco: 9
        };
        const produtoParaInserir2 = {
            nome: "teste 2",
            descricao: "produto teste 2",
            preco: 10
        };

        await produtosService.salvar({
            nome: produtoParaInserir1.nome,
            descricao: produtoParaInserir1.descricao,
            preco: produtoParaInserir1.preco
        });
        await produtosService.salvar({
            nome: produtoParaInserir2.nome,
            descricao: produtoParaInserir2.descricao,
            preco: produtoParaInserir2.preco
        });

        const listaProduto = await produtosService.obterTodos();

        expect(listaProduto.length).toBe(2);

    });

    it("Deve verificar se o produto existe", async ()=>{
        const produtoParaInserir = {
            nome: "teste",
            descricao: "produto teste",
            preco: 9
        };

        await produtosService.salvar({
            nome: produtoParaInserir.nome,
            descricao: produtoParaInserir.descricao,
            preco: produtoParaInserir.preco
        });


        const produtoExiste = await produtosRepository.obterPorNome(produtoParaInserir.nome);

        expect(produtoExiste).toBeTruthy();

    });

    it("Deve rertornar false se o produto não existe", async ()=>{
        const produtoParaInserir = {
            nome: "teste",
            descricao: "produto teste",
            preco: 9
        };

        await produtosService.salvar({
            nome: produtoParaInserir.nome,
            descricao: produtoParaInserir.descricao,
            preco: produtoParaInserir.preco
        });


        const produtoExiste = await produtosRepository.obterPorNome("teste falso");

        expect(produtoExiste).toBeFalsy();

    });

    it("Deve rertornar o erro 'produto já existe!'", async ()=>{
        const produtoParaInserirErro = {
            nome: "teste",
            descricao: "produto teste",
            preco: 9
        };

        await produtosService.salvar({
            nome: produtoParaInserirErro.nome,
            descricao: produtoParaInserirErro.descricao,
            preco: produtoParaInserirErro.preco
        });

        await expect(
            produtosService.salvar({
                nome: produtoParaInserirErro.nome,
                descricao: produtoParaInserirErro.descricao,
                preco: produtoParaInserirErro.preco
             })).rejects.toEqual(new AppError("Produto ja existe!"));

    });

    it("Deve alterar as propriedades do produto corretamente", async ()=>{
        const produto = {
            nome: "teste",
            descricao: "produto teste",
            preco: 9
        };

        await produtosService.salvar({
            nome: produto.nome,
            descricao: produto.descricao,
            preco: produto.preco
        });

        const produtoAlterado = await produtosService.alterar({
            id: "shaus4saushau44",
            descricao: "produto novo",
            nome: "produto",
            preco: 10
        });
        
        expect(produtoAlterado).toHaveProperty('nome','produto');
        expect(produtoAlterado).toHaveProperty('descricao','produto novo');
        expect(produtoAlterado).toHaveProperty('preco',10);
    });
    
    it("Deve excluir o produto corretamente", async ()=>{
        const produto = {
            nome: "teste",
            descricao: "produto teste",
            preco: 9
        };

        await produtosService.salvar({
            nome: produto.nome,
            descricao: produto.descricao,
            preco: produto.preco
        });

        const produtoAlterado = await produtosService.deletar("shaus4saushau44");
        const listaProduto = await produtosService.obterTodos();
        
        expect(produtoAlterado).toHaveProperty('id','shaus4saushau44');
        expect(listaProduto.length).toBe(0);
    });

});