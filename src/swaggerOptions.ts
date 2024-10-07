const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'API documentation using Swagger and TypeScript',
    },
  },
  // Paths ke file API untuk mengumpulkan anotasi
  apis: ['./src/routes/*.ts'], // Lokasi dimana dokumentasi API ditulis
};

export default swaggerOptions;
