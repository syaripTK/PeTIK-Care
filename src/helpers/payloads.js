const resSukses = (res, code, status, message, data) => {
    return res.status(code).json({
        status, message, data
    })
};

const resGagal = (res, code, status, message) => {
    return res.status(code).json({
        status, message
    })
}

module.exports = {
    resSukses,
    resGagal
}