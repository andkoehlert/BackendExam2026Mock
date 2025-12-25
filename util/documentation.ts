import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import { Application } from 'express';

/**
 * Setup Swagger documentation
 * @param app 
 */
export function setupDocs(app: Application) {

    // swagger definition
    const swaggerDefinition = {
        openapi: '3.0.0',
        info: {
            title: 'Title',
            version: '1.0.0',
            description: 'Description',
        },
        servers: [
            {
                url: 'http://localhost:4000/api/',
                description: 'Local development server',
            },
            {
              url: 'https://strategifrontend.onrender.com/',
              description: 'Local development server',
          }
        ],
        components: {
            securitySchemes: {
                ApiKeyAuth: {
                    type: 'apiKey',
                    in: 'header',
                    name: 'auth-token',
                },
            },
            schemas: {
               
                User: {
                    type: 'object',
                    properties: {
                        name: { type: 'string' },
                        email: { type: 'string' },
                        password: { type: 'string' },
                      
                    },
                    
                },
               
               


            },
        }
    }

    // swagger options
    const options = {
        swaggerDefinition,
        apis: ['**/*.ts']
    }

    // swagger spec
    const swaggerSpec = swaggerJSDoc(options);

    // create docs route
    app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec)); }