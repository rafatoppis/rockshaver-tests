const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config()


module.exports = {

  env: {
    
  },
  e2e: {
    baseUrl: process.env.API_URL,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },

    async setupNodeEvents(on, config) {

      on('task', {

        generateObjectId(){
          return new ObjectId().toString()
        },

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
          return db.collection(collection).findOne(filter);
        },

        convertToObjectId(idString) {
          return new ObjectId(idString).toString() // converte string
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
  },
};
