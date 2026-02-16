require('dotenv').config({ path: '.env' })
const { defineConfig } = require('cypress');
const { MongoClient } = require('mongodb');

module.exports = defineConfig({
  projectId: "wh92as",
  env:{
    baseApi: process.env.API_URL
  },

  e2e: {
    baseUrl: process.env.WEB_URL,
    viewportWidth: 1920,
    viewportHeight: 1080,


    async setupNodeEvents(on, config) {

      on('task', {

        async 'db:connect'() {
          const client = new MongoClient(
            process.env.MONGO_URI
          );

          await client.connect();
          global._mongoClient = client;
          return null;
        },

        async 'db:deleteMany'(filter) {
          try {
            const db = global._mongoClient.db(process.env.DATABASE);
            const colecao = db.collection('agendamentos');

            const resultado = await colecao.deleteMany(filter);

            return resultado;
          } catch (error) {
            throw error;
          }
        },

        async 'db:dropCollection'({ collection, failSilently = false }) {
          const db = global._mongoClient.db('rockshaver');

          try {
            const result = await db.collection(collection).drop();
            return result;
          } catch (error) {

            if (error.codeName === 'NamespaceNotFound') {
              if (failSilently) return null;
              throw error;
            }

            throw error;
          }
        },

        async 'db:find'({ collection, filter }) {
          const db = global._mongoClient.db('rockshaver');
          return db.collection(collection).find(filter).toArray();
        },

        async 'db:delete'({ collection, filter }) {
          const db = global._mongoClient.db('rockshaver');
          const result = await db
            .collection(collection)
            .deleteMany(filter);

          return result.deletedCount;
        },

        async 'db:disconnect'() {
          await global._mongoClient.close();
          return null;
        }

      });

      return config;
    }
  }
});
