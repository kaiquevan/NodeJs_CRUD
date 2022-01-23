import {request, response, Router} from "express";
import { ProdutosController } from "../controllers/ProdutoController";

const produtosRoutes = Router();
const produtosController =  new ProdutosController();

// Salvar produto

produtosRoutes.post("/produtos", produtosController.salvar);

// Alterar
produtosRoutes.put("/produtos", produtosController.alterar);

//Deletar

produtosRoutes.delete("/produtos", produtosController.deletar);

//Obter todos produtos

produtosRoutes.get("/produtos", produtosController.obterTodos);

//Obter produto por ID
 
produtosRoutes.get("/produtoporid", produtosController.obterPorId);

//teste
export{produtosRoutes};