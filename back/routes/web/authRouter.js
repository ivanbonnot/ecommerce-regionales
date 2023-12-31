const { Router } = require('express')
const flash = require('connect-flash');
const passport = require('passport');
const logger = require("../../log/log4js")
const bcrypt = require('bcrypt');

const { newUserController, getUserController, updateUserController, checkUserController } = require('../../controllers/usersControler')
require('../../middleware/auth');
const { generateJwtToken, destroyJWT, isDeletedJWT } = require('../../middleware/auth')
const { isAdmin } = require('../../middleware/isAdmin')
const { registrationValidation } = require('../../middleware/userValidation')
const { validationResult } = require('express-validator');

const authWebRouter = Router()
authWebRouter.use(flash())


//__LOGIN__//

authWebRouter.get('/login', async (req, res) => {
    res.redirect('/')
})

authWebRouter.post('/login', passport.authenticate('login', { failureRedirect: '/login', failureFlash: true }), async (req, res) => {
    try {
        req.session.passport.user = req.user.username
        let userData = await getUserController(req.session.passport.user)
        userData = Object.assign({}, userData._doc, { token: generateJwtToken(req.session.passport.user) })
        res.status(200).json(userData)
    } catch (error) {
        handleServerError(res, error);
    }
});

authWebRouter.put('/changepassword',  passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const { username, password, newPassword } = req.body;
        const userCheckResult = await checkUserController(username, password);
        
        if (userCheckResult.result) {
           
            const saltRounds = 10;
            const newHashedPassword = await bcrypt.hash(newPassword, saltRounds);

            const userData = await getUserController(username);
            const id = userData._id; 

            const userUpdate = { password: newHashedPassword };
            const updatedUser = await updateUserController(id, userUpdate);

            res.status(200).json({ msg: 'Password changed successfully', user: updatedUser });
        } else {
            res.status(401).json({ msg: 'Incorrect username or password', result: false });
        }

    } catch (error) {
        handleServerError(res, error);
    }
});


//__REGISTER__//
// Ruta para registrar usuarios (admin)
authWebRouter.post('/admin/register', isAdmin, registrationValidation, async (req, res) => {
    try {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { username, password } = req.body;
        const user = await getUserController(username)

        if (user) {
            res.status(302).json({ message: 'El usuario ya existe' });
        } else {
            const newUser = {
                username,
                password
            };
            await newUserController(newUser)
            res.status(200).json({ message: 'Usuario registrado con éxito' });
        }
    } catch (error) {
        handleServerError(res, error);
    }
});


//__LOGOUT__//
authWebRouter.get('/logout', passport.authenticate('jwt', { session: false }), (req, res) => {
    try {
        const user = req.user.username
        if (user) {
            destroyJWT(req.headers.authorization)
        } else {
            res.redirect('/login')
        }
    } catch (error) {
        handleServerError(res, error);
    }
})


authWebRouter.get('/verify', isDeletedJWT, passport.authenticate('jwt', { session: false }), (req, res) => {
    try {
        res.status(200).json('Token valido');
    } catch (error) {
        handleServerError(res, error);
    }
})

// Función para manejar errores y enviar respuestas de error.
const handleServerError = (res, error) => {
    logger.error(error);
    res.status(500).json('Error interno del servidor');
}


module.exports = authWebRouter 
