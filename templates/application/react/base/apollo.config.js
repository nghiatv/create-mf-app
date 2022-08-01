module.exports = {
    client: {
      service: {
        name: "sandbox",
        localSchemaFile: "./src/apollo/graphql-schema.json",
      },
      includes: ['./src/apollo/**/*.ts'],
      excludes: ['./src/apollo/**/local.*.ts'],
    },
  };