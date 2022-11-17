const Router = require("express");
const router = Router();

const chatRoutes =  require("./chatRoutes")
const messagesRoutes =  require("./messagesRoutes")
const otherRoutes =  require("./otherRoutes")

// Importación graphql: 
const productController = require ("../GraphQL/product.controller");
const productSchema = require ("../GraphQL/product.schema");
const { graphqlHTTP } = require ("express-graphql");

router.use('/chat', chatRoutes);
router.use('/message', messagesRoutes);
router.use('/other', otherRoutes);


// Rutas graphql:

router.use(
    "/graphql",
    graphqlHTTP({
      schema: productSchema,
      rootValue: {
        getProduct: productController.getProduct,
        getProducts: productController.getProducts,
        createProduct: productController.createProduct,
        updateProduct: productController.updateProduct,
        deleteProduct: productController.deleteProduct,
      },
      graphiql: true,
    })
  );

module.exports = router;