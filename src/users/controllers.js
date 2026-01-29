const { tampilOrang, tambahUser, cariId, ubahUser, hapusUser } = require("./services.js");
const { resSukses, resGagal } = require("../helpers/payloads.js");

const getAllUsers = async (req, res) => {
    try {
        const user = await tampilOrang();
       return resSukses(res, 200,  "Data User", user)
    } catch (error) {
        return resGagal(res, 500, error.message);
    }
};

const createUser = async (req, res) => {
    try {
        const user = await tambahUser(req.body);
        return resSukses(res, 201, "Data berhasil ditambahkan", user);
    } catch (error) {
        return resGagal(res, 500, error.message);
    }
};

const getUserById = async (req, res) => {
    try {
        const user = await cariId(req.params.id);
        if (!user) {
            return resGagal(res, 404, "User not found");
        }
        return resSukses(res, 200, "Data User", user);
    } catch (error) {
        return resGagal(res, 500, error.message);
    }
};

const updateUser = async (req, res) => {
    try {
        const [updated] = await ubahUser(req.params.id, req.body);
        if (!updated) {
            return resGagal(res, 404, "User not found");
        }
        const updatedUser = await cariId(req.params.id);
        return resSukses(res, 200, "Data User berhasil diubah", updatedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const deleted = await hapusUser(req.params.id);
        if (!deleted) {
            return resGagal(res, 404, "User not found");
        }
        return resSukses(res, 200, "Data berhasil dihapus", { deleted: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser
};
