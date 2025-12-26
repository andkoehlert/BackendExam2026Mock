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
            title: 'Lawyer Dashboard API',
            version: '1.0.0',
            description: 'API for managing lawyer performance data',
        },
        servers: [
            {
                url: 'http://localhost:4000/api/',
                description: 'Local development server',
            },
            {
              url: 'https://mongo-api-2025.onrender.com/api/',
              description: 'Production server',
            }
        ],
        components: {
            securitySchemes: {
                BearerAuth: {  // Changed from ApiKeyAuth
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                    description: 'Enter JWT token',
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
                MonthData: {
                    type: 'object',
                    required: ['month', 'monthNumber', 'afregnet', 'ditMaal'],
                    properties: {
                        month: { type: 'string', example: 'January' },
                        monthNumber: { type: 'number', example: 1 },
                        afregnet: { type: 'number', example: 1200 },
                        ditMaal: { type: 'number', example: 1500 },
                    },
                },
                YearMonthlyData: {
                    type: 'object',
                    required: ['year', 'months'],
                    properties: {
                        year: { type: 'number', example: 2024 },
                        months: {
                            type: 'array',
                            items: { $ref: '#/components/schemas/MonthData' },
                        },
                    },
                },
            },
        },
        security: [  // Apply globally
            {
                BearerAuth: [],
            },
        ],
    }

    // swagger options
    const options = {
        swaggerDefinition,
        apis: ['**/*.ts']
    }

    // swagger spec
    const swaggerSpec = swaggerJSDoc(options);

    // create docs route
    app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}