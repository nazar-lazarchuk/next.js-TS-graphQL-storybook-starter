import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { split } from 'apollo-link';
import { createHttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import fetch from 'isomorphic-unfetch';
import { withApollo, ApolloPageContext as AC } from 'next-with-apollo';

const isClient = process.browser;

const GRAPHQL_URL = process.env.NEXT_PUBLIC_API_URL || 'https://localhost:4000';
const GRAPHQL_WS = process.env.NEXT_PUBLIC_API_WS_URL || 'ws://localhost:4000';
const DISABLE_WS = process.env.NEXT_PUBLIC_DISABLE_WS && true;

const httpLink = createHttpLink({
  fetch,
  uri: GRAPHQL_URL,
});

const wsLink = (isClient && !DISABLE_WS) ? new WebSocketLink({
  uri: GRAPHQL_WS,
  options: {
    reconnect: true,
  },
}) : null;

const link = (isClient && !DISABLE_WS) ? split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition'
      && definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
) : httpLink;

export default withApollo(() => new ApolloClient({
  link,
  cache: new InMemoryCache(),
  ssrMode: true,
  connectToDevTools: true,
}));

export type ApolloPageContext = AC;
