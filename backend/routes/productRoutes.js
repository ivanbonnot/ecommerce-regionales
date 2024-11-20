const { Router } = require("express");
const {
    addNewProductController,
    getAllProductsController,
    getProductByIdController,
    deleteNoteController
} = require("../../controllers/notesController");

const productRoutes = Router();
const { passport, isDeletedJWT } = require('../../middleware/auth')
const logger = require('../../log/log4js');
const moment = require('moment');

productRoutes.get("/notes", isDeletedJWT, passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const notes = await getAllProductsController();
        res.json({ notes });

    } catch (error) {
        logger.error(`Error en la solicitud de notes: ${error}`);
        return res.status(500).json({ result: "error" });
    }
});


productRoutes.get("/notes/:id", isDeletedJWT, passport.authenticate('jwt', { session: false }), async (req, res) => {
    const { method, url } = req
    const { id } = req.params;

    try {
        const noteById = await getProductByIdController(id);
        console.log(noteById)
        if (noteById) {
            res.json(noteById);
        } else {
            logger.error(`Ruta: ${url}, método: ${method}. No existe la nota:${id}`);
            return res.status(403).json({ result: "error" });
        }

    } catch (error) {
        logger.error(`Error en la solicitud de nota por id: ${error}`);
        return res.status(500).json({ result: "error" });
    }
});


productRoutes.post("/notes", isDeletedJWT, passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {

        const { idProduct, name, price, description, date, imageUrl, stock, category } = req.body;

        //const fecha = moment().format("MMMM Do YYYY, h:mm:ss a");
        const fechaISO8601 = moment(fecha, 'MMMM Do YYYY, h:mm:ss a').format();

        const product = {
            idProduct,
            name,
            price,
            description,
            date: fechaISO8601,
            imageUrl,
            stock,
            category
        };

        await addNewProductController(product);
        res.json(product);

    } catch (error) {
        logger.error(`Error al crear nota: ${error}`);
        return res.status(500).json({ result: "error" });
    }
});



productRoutes.delete("/notes/:id", isDeletedJWT, passport.authenticate('jwt', { session: false }), async (req, res) => {
    const { method, url } = req
    const { id } = req.params;

    try {
        const noteById = await getProductByIdController(id);

        if (noteById) {
            await deleteNoteController(id);
            res.status(200).json({ deleted: true });
        } else {
            logger.error(`Ruta: ${url}, método: ${method}. No existe la nota:${id}`);
            return res.status(403).json({ result: "error" });
        }


    } catch (error) {
        logger.error(`Error al borrar la nota: ${error}`);
        return res.status(500).json({ result: "error" });
    }
});



module.exports = productRoutes;