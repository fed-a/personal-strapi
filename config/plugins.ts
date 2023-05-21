export default {
  graphql: {
    enabled: true,
    config: {
      apolloServer: {
        introspection: true,
      },
      defaultLimit: 10,
      maxLimit: 100,
      endpoint: "/graphql",
    },
  },
};
