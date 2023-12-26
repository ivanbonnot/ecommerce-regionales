const { Router } = require("express");
const {
  addProductController,
  getProductsController,
  getProductByIdController,
  deleteNoteController,
} = require("../../controllers/productsController");

const productsRouter = Router();
const { passport, isDeletedJWT } = require('../../middleware/auth')
const logger = require('../../log/log4js');
const moment = require('moment');


productsRouter.get("/products", async (req, res) => {
  try {
    const products = await getProductsController();
    res.json({ products });

  } catch (error) {
    logger.error(`Error en la solicitud de products: ${error}`);
    return res.status(500).json({ result: "error" });
  }
});


productsRouter.get("/products/:id", isDeletedJWT, passport.authenticate('jwt', { session: false }), async (req, res) => {
  const { method, url } = req
  const { id } = req.params;

  try {
    const productById = await getProductByIdController(id);
    console.log(productById)
    if (productById) {
      res.json(productById);
    } else {
      logger.error(`Ruta: ${url}, método: ${method}. No existe la product:${id}`);
      return res.status(403).json({ result: "error" });
    }

  } catch (error) {
    logger.error(`Error en la solicitud de product por id: ${error}`);
    return res.status(500).json({ result: "error" });
  }
});


productsRouter.post("/products", isDeletedJWT, passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {

    const { timestamp, title, thumbnail, description, stock, date, code, price } = req.body;

    const dateISO8601 = moment(date, 'MMMM Do YYYY, h:mm:ss a').format();

    const newProduct = {
      timestamp,
      title,
      thumbnail,
      description,
      stock,
      date: dateISO8601,
      code,
      price,
    };

    await addProductController(newProduct);
    res.json(newProduct);

  } catch (error) {
    logger.error(`Error al crear product: ${error}`);
    return res.status(500).json({ result: "error" });
  }
});




productsRouter.delete("/products/:id", isDeletedJWT, passport.authenticate('jwt', { session: false }), async (req, res) => {
  const { method, url } = req
  const { id } = req.params;

  try {
    const productById = await getProductByIdController(id);

    if (productById) {
      await deleteNoteController(id);
      res.status(200).json({ deleted: true });
    } else {
      logger.error(`Ruta: ${url}, método: ${method}. No existe la product:${id}`);
      return res.status(403).json({ result: "error" });
    }


  } catch (error) {
    logger.error(`Error al borrar la product: ${error}`);
    return res.status(500).json({ result: "error" });
  }
});



module.exports = productsRouter;
