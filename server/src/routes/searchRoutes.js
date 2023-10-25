import express from 'express';
const router = express.Router();
import searchController from '../controllers/searchController.js';

router.get('/suggestion/:searchText', searchController.searchSuggestions);

export default router;
