import express from "express";
import userRoutes from "./userRoutes";
import { authRoutes } from "./authRoutes";
import { productRoutes } from "./productRoutes";
import { categoryRoutes } from "./categoryRoutes";

const router= express.Router();

router.use('/user', userRoutes);
router.use('/user', authRoutes);
router.use('/product', productRoutes);
router.use('/category', categoryRoutes);

export default router;