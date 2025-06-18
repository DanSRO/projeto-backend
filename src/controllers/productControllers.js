import { Products } from "../models/Products.js";

export const getAllProducts = async (req, res) => {
    try{
        let {limit = 30, page = 2, fields, match, category_ids, price_range, ... otherFilters } = req.query;
        limit=parseInt(limit);
        page=parseInt(page);

        const where = {};

        if(match){
            where[Op.or]=[
                {name:{[Op.ilike]:`%${match}`}},
                {description:{[Op.ilike]:`%${match}`}}
            ];
        }

        if(category_ids){
            const ids = category_ids.split(',').map(id=>parseInt(id));
            where.category_ids = {[Op.overlap]:ids};
        }

        if(price_range){
            const [min, max] = price_range.split('-').map(v => parseFloat(v));
            where.price = { [Op.between]: [min, max] };
          }
      
          // 🎯 Filtros por option[x]=valor1,valor2...
          for (const key in optionsFilters) {
            if (key.startsWith('option[')) {
              const optionId = key.match(/option\\[(\\d+)\\]/)[1];
              const values = optionsFilters[key].split(',');
      
              // Exemplo de estrutura, adapte conforme seu modelo:
              where[`options.option_${optionId}`] = { [Op.in]: values };
            }
          }
      
          // 📑 Quais campos retornar
          let attributes;
          if (fields) {
            attributes = fields.split(',').map(f => f.trim());
          }
      
          const queryOptions = {
            where,
            attributes,
            include: ['images', 'options'], // garanta que associations estejam corretas
            distinct: true
          };
      
          // Paginação
          if (limit !== -1) {
            queryOptions.limit = limit;
            queryOptions.offset = (page - 1) * limit;
          }

        const products = await products.findAll(queryOptions);
        const total = await Products.count({where});
        if(!products){
            return res.status(404).json({error:'Produtos não encontrados.'});        
        }
    
        res.status(200).json({
            data:products,
            total,
            limit,
            page
        });
    }catch(error){
        return res.status(500).json({error:'Erro ao buscar produtos.'});
    }
}

export const getProductById = async(req, res) => {
    const {id} = req.params;
    try{
        const product = await Products.findByPk(id);
        if(!product){
            return res.status(404).json({error:'Produto não encontrado.'});
        }
        res.status(200).json(product);
    }catch(error){
        return res.status(500).json({error:'Erro ao buscar produto.'});
    }
}

export const createProduct = async (req, res) => {
    const {enable, name, slug, use_in_menu, stock, description, price, price_with_discount } = req.body;
    if(!enable || !name || !slug || !use_in_menu || !stock || !description || !price || !price_with_discount){
        return res.status(400).json({erro:'Todos os campos são obrigatórios.'});
    }
    try{
        const newProduct = await Products.create({enable, name, slug, use_in_menu, stock, description, price, price_with_discount});
        res.status(201).json({
            id:newProduct.id,
            enable:newProduct.enable,
            name:newProduct.name,
            slug:newProduct.slug,
            use_in_menu:newProduct.use_in_menu,
            stock:newProduct.stock,
            description:newProduct.description,
            price:newProduct.price,
            price_with_discount:newProduct.price_with_discount
        })
    }catch(error){
        console.log('');
        res.status(500).json({erro:'Erro ao criar produto.'});
    }
}

export const updateProduct = async (req, res) => {
    const {id} = req.params;
    const dados = req.body;
    try{
        const product = await Products.findByPk(id);
        if(!product){
            return res.status(404).json({error:'Produto não encontrado.'});
        }
        await product.update(dados);
        res.jon({message:'Produto atualizado com sucesso.'});
    }catch(error){
        return res.status(500).json({error:'Erro ao atualizar o produto.'});
    }
}

export const deleteProduct = async  (req, res) => {
    const {id} = req.params;

    try{
        const product = await Products.findByPk(id);
        if(!product){
            return res.status(400).json({error:'Produto não encontrado.'})
        }
        await product.destroy();
        res.status(204).send();
    }catch(error){
        return res.status(500).json({error:'Erro ao excluir o produto.'});
    }
}