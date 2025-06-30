import express from "express";
import userRoutes from "./userRoutes.js";
import { authRoutes } from "./authRoutes.js";
import { productRoutes } from "./productRoutes.js";
import { categoryRoutes } from "./categoryRoutes.js";

const router= express.Router();

router.use('/user', userRoutes);
router.use('/user', authRoutes);
router.use('/product', productRoutes);
router.use('/category', categoryRoutes);

export default router;