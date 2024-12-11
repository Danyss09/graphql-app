// Import dependencies
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const swaggerUi = require('swagger-ui-express');

// Define the GraphQL schema
const schema = buildSchema(`
  type Query {
    message: String
  }
`);

// Define the resolvers
const root = {
  message: () => {
    return 'DISTRIBUTED PROGRAMMING: Hi world, my name is Daniela Caceres';
  },
};

// Create the Express server
const app = express();

// Set up the /graphql endpoint
app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true, // Enable GraphiQL interface
  })
);

// Define the Swagger documentation
const swaggerDocument = {
  swagger: "2.0",
  info: {
    version: "1.0.0",
    title: "GraphQL API Documentation",
    description: "Sample API documentation for a GraphQL server",
  },
  paths: {
    "/graphql": {
      post: {
        summary: "Execute GraphQL queries",
        description: "Endpoint to interact with the GraphQL API",
        consumes: ["application/json"],
        produces: ["application/json"],
        parameters: [
          {
            in: "body",
            name: "query",
            required: true,
            schema: {
              type: "object",
              properties: {
                query: {
                  type: "string",
                  example: "{ message }", // Valid query example
                },
              },
            },
          },
        ],
        responses: {
          "200": {
            description: "Successful response",
            schema: {
              type: "object",
              properties: {
                data: {
                  type: "object",
                  example: {
                    message: "DISTRIBUTED PROGRAMMING: Hi world, my name is Daniela Caceres",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

// Set up Swagger UI at /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Start the server
app.listen(4000, () => {
  console.log('🚀 GraphQL server ready at http://localhost:4000/graphql');
  console.log('📄 Swagger documentation available at http://localhost:4000/api-docs');
});
