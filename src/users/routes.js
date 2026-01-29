const express = require('express');
const router = express.Router();
const { getAllUsers, createUser, getUserById, updateUser, deleteUser } = require('./controllers.js');

router.get('/', getAllUsers);
router.post('/tambah/', createUser);
router.get('/cari/:id', getUserById);
router.put('/ubah/:id', updateUser);
router.delete('/hapus/:id', deleteUser);

module.exports = router;