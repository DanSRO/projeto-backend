import { Categories } from "../models/Categories.js";

export const getAllCategories = async (req, res) => {
    try{

        let { limit = 12, page = 1, fields, use_in_menu } = req.query;

        limit = parseInt(limit);
        page = parseInt(page);
    
        const options = {};
    
        // Filtro: use_in_menu
        if (use_in_menu !== undefined) {
          options.where = {
            use_in_menu: use_in_menu === 'true'
          };
        }
    
        // Selecionar campos específicos
        if (fields) {
          const attributes = fields.split(',').map(f => f.trim());
          options.attributes = attributes;
        }
    
        // Paginação
        if (limit !== -1) {
          options.limit = limit;
          options.offset = (page - 1) * limit;
        }
         
        const categories = await Categories.findAll(options);
        const total = await Categories.count(options.where ? {where:options.where} : {});
        if(!categories){
            return res.status(404).json({error:'Categorias não encontradas.'});        
        }
    
        res.status(200).json({
            data: categories,
            total,
            limit,
            page
        });
    }catch(error){
        return res.status(500).json({error:'Erro ao buscar categorias.'});
    }
}

export const getCategoryById = async(req, res) => {
    const {id} = req.params;
    try{
        const category = await Categories.findByPk(id);
        if(!category){
            return res.status(404).json({error:'Categoria não encontrada.'});
        }
        res.status(200).json(category);
    }catch(error){
        return res.status(500).json({error:'Erro ao buscar categoria.'});
    }
}

export const createCategory = async (req, res) => {
    const {name, slug, use_in_menu } = req.body;
    if(!name || !slug || !use_in_menu){
        return res.status(400).json({erro:'Todos os campos são obrigatórios.'});
    }
    try{
        const newCategory = await Categories.create({name, slug, use_in_menu});
        res.status(201).json({
            id:newCategory.id,
            name:newCategory.name,
            slug:newCategory.slug,
            use_in_menu:newCategory.use_in_menu
        })
    }catch(error){
        console.log('');
        res.status(500).json({erro:'Erro ao criar categiria.'});
    }
}

export const updateCategory = async (req, res) => {
    const {id} = req.params;
    const dados = req.body;
    try{
        const category = await Categories.findByPk(id);
        if(!category){
            return res.status(404).json({error:'Categoria não encontrada.'});
        }
        await category.update(dados);
        res.jon({message:'Categoria atualizada com sucesso.'});
    }catch(error){
        return res.status(500).json({error:'Erro ao atualizar a categoria.'});
    }
}

export const deleteCategory = async  (req, res) => {
    const {id} = req.params;

    try{
        const category = await Categories.findByPk(id);
        if(!category){
            return res.status(400).json({error:'Categoria não encontrada.'})
        }
        await category.destroy();
        res.status(204).send();
    }catch(error){
        return res.status(500).json({error:'Erro ao excluir a categoria.'});
    }
}