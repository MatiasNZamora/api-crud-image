import { Request, Response } from "express";
import articulo from '../models/articulo.model';
import path from "path";
import fs from 'fs-extra';


// RUTA DE GET ARTICULOS
export async function getArticle( req: Request, res: Response ):Promise<Response> {
    // me busca los articulos que tengo en la base de datos y los almacena en la variable articulos
    const articulos = await articulo.find();
    // los retorna en json
    return res.json(articulos);
};

// RUTA PARA TRAER ARTICULOS BY ID
export async function getArticleById( req: Request, res: Response ):Promise<Response> {
    // desestructuramos desde request params el id
    const { id } = req.params;
    
    // A travez del modelo de articulo voy a buscar por ID y lo almaceno en una variable llamada articulo por id.
    const articuloById = await articulo.findById(id);

    // retorno la gilada
    return res.json(articuloById);
};

// RUTA PARA CREAR ARTICULOS
export async function createArticle( req: Request, res: Response ):Promise<Response> {

    // desestructuro desde la request body el titulo, descripcion 
    const { title, description } = req.body;
    console.log(req.file?.path);

    // en base a lo desestructurado creo un objeto que tiene sus caracteristicas traidas y le agrego
    // desde la request el file Path que es una propiedad que ya viene en la request
    const newArticle = {
        title: title,
        description: description,
        imagePath: req.file?.path
    };

    // creo una instancia de mi objeto newArticle en funcion del modelo articulo y lo almaceno en una variable llamada articulo
    const article = new articulo(newArticle);

    // lo guardo en la base de datos
    await article.save()

    // retorno el mensaje y el articulo.
    return res.json({
        message: 'Article successfully saved',
        article
    });

};

// RUTA PARA BORRAR UN ARTICULO
export async function deleteArticleById( req: Request, res: Response ):Promise<Response> {
    
    // A travez del modelo de articulo voy a buscar por ID y lo almaceno en una variable llamada articulo por id.
    const { id } = req.params;

    // busco el articulo por id y lo borro. Lo almaceno para mostrarlo en la reques para ver claramente que borre. 
    const articuloBorrado = await articulo.findByIdAndDelete(id);
    
    // si la foto existe remuevela
    if(articuloBorrado){
        //fs unlink requiere la direccion de la imagen que ya lo teniamos con path.resolve
        await fs.unlink(path.resolve(articuloBorrado.imagePath));
    };
    
    return res.json({
        message: 'Articulo removido',
        articuloBorrado
    });

    // este delete solo elimina la informacion mas no el archivo espesificado en la carpeta uploads.
    // para ello usamos la informacion de la imagen que es image path. instalamos otro modulo que va a ser fs para hacer el borrado ya que 
    // file sistem trabaja con los artivos pero como este usa callbacks usamos otro modulo que fs-extra y sus types que si soporta promesas.


};

// en el caso de actualizar la imagen pienso que en vez de usar una funcion 
// de put podriamos borrar la imagen con el delete y generar una nueva.