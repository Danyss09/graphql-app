// Importar dependencias
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

// Definir el esquema de GraphQL
const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// Implementar los resolvers
const root = {
  hello: () => {
    return '¡Hola, Mundo!';
  },
};

// Crear el servidor Express
const app = express();
app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true, // Habilita el entorno de prueba GraphiQL
  })
);

// Iniciar el servidor
app.listen(4000, () => {
  console.log('🚀 Servidor GraphQL listo en http://localhost:4000/graphql');
});
