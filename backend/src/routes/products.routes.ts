import { Router } from "express";
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from "../controller/products.controller";

const productsRoutes = Router();

productsRoutes.route('/')
   .get(getProducts)
   .post(createProduct)

productsRoutes.route('/:productId')
    .get(getProduct)
    .put(updateProduct)
    .delete(deleteProduct)


export default productsRoutes; 