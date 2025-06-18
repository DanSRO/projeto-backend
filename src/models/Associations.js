import { Products } from "./Products.js";
import { Categories } from "./Categories.js";
import { ProductsImages } from "./Products-Images.js";
import { ProductsOptions } from "./Products-Options.js";
import { ProductsCategories } from "./Products-Categories.js";

export const Associations = () =>{

    // Products ↔ Images
    Products.hasMany(ProductsImages, { foreignKey: 'product_id', as:'images' });
    ProductsImages.belongsTo(Products, { foreignKey: 'product_id' });
    
    // Products ↔ Options
    Products.hasMany(ProductsOptions, { foreignKey: 'product_id', as:'options' });
    ProductsOptions.belongsTo(Products, { foreignKey: 'product_id' });

    // Products ↔ Categories (N:M)
    Products.belongsToMany(Categories, {
        through: ProductsCategories,
        foreignKey: 'product_id',
        otherKey: 'categorie_id'
    });
    Categories.belongsToMany(Products, {
        through: ProductsCategories,
        foreignKey: 'categorie_id',
        otherKey: 'product_id'
    });
}