const authCheck = (req, res, next) => {
    console.log("I am on auth check.");
    next();
}

module.exports = authCheck;