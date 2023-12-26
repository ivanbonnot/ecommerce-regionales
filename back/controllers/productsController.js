const { getProductsDTO, getProductByIdDTO, deleteProductDTO, addNewProductDTO, updateProductDTO } = require('../DTO/productsDTO')


const addNewProductController = (productToAdd) => addNewProductDTO(productToAdd)

const getProductsController = () => getProductsDTO()

const getProductByIdController = (id) => getProductByIdDTO(id)

const updateProductController = (id, productToUpdate) => updateProductDTO(id, productToUpdate)

const deleteProductController = (id) => deleteProductDTO(id)


module.exports = { addNewProductController, getProductsController, getProductByIdController, deleteProductController, updateProductController }