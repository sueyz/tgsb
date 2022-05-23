import * as pulumi from "@pulumi/pulumi";
import * as digitalocean from "@pulumi/digitalocean";

// Our stack-specific configuration.
const config = new pulumi.Config();
const repo = config.require("repo");
const branch = config.require("branch");

// The DigitalOcean region to deploy into.
const region = digitalocean.Region.SGP1;


// Our MongoDB cluster (currently just one node).
const cluster = new digitalocean.DatabaseCluster("cluster", {
  engine: "mongodb",
  version: "4",
  region,
  size: digitalocean.DatabaseSlug.DB_1VPCU1GB,
  nodeCount: 1,
});

// The database we'll use for our grocery list.
const db = new digitalocean.DatabaseDb("db", {
  name: "tgsb",
  clusterId: cluster.id,
});


// The App Platform spec that defines our grocery list.
const app = new digitalocean.App("app", {
  spec: {
      name: "tgsb",
      region: region,

      // The React front end.
      staticSites: [
          {
              name: "frontend",
              github: {
                  repo,
                  branch,
                  deployOnPush: true,
              },
              sourceDir: "/frontend",
              buildCommand: "yarn install",
              outputDir: "/dist",
          }
      ],

      // The Express back end.
      services: [
          {
              name: "backend",
              github: {
                  repo,
                  branch,
                  deployOnPush: true,
              },
              sourceDir: "/backend",
              buildCommand: "yarn install",
              runCommand: "yarn start",
              httpPort: 8000,
              routes: [
                  {
                      path: "/api",
                      preservePathPrefix: true,
                  },
              ],
              instanceSizeSlug: "basic-xxs",
              instanceCount: 1,

              // To connect to MongoDB, the service needs a DATABASE_URL, which
              // is conveniently exposed as an environment variable thanks to its
              // membership in this app spec (below). The CA_CERT value enables
              // a secure connection between API service and database.
              envs: [
                  {
                      key: "MONGO_URI",
                      scope: "RUN_AND_BUILD_TIME",
                      value: "${db.MONGO_URI}",
                  }
              ],
          },
      ],

      // Include the MongoDB cluster as an integrated App Platform component.
      databases: [
          {
              // The name `db` defines the prefix of the tokens used (above) to
              // read the environment variables exposed by the database cluster.
              name: "db",

              // MongoDB clusters are only available in "production" mode.
              // https://docs.digitalocean.com/products/app-platform/concepts/database/
              production: true,

              // A reference to the `DatabaseCluster` we declared above.
              clusterName: cluster.name,

              // The engine value must be uppercase, so we transform it with JS.
              engine: cluster.engine.apply(engine => engine.toUpperCase()),
          }
      ]
  },
});


// Adding a database firewall setting grants access solely to our app.
const trustedSource = new digitalocean.DatabaseFirewall("trusted-source", {
  clusterId: cluster.id,
  rules: [
      {
          type: "app",
          value: app.id,
      },
  ],
});

// The DigitalOcean-assigned URL for our app.
export const { liveUrl } = app;