import { gql } from 'graphql-tag';

export const typeDefs = gql`
  type DeFi {
    timestamp: String!
    protocol: String!
    chain: String!
    total_value_locked_usd: Float!
    daily_volume_usd: Float!
    active_users: Int!
    token: String!
  }

  type TVLOverTime {
    day: String!
    total_tvl: Float!
  }

  type DailyVolumeByProtocol {
    day: String!
    protocol: String!
    total_volume: Float!
  }

  type ActiveUsersByChain {
    day: String!
    chain: String!
    total_active_users: Int!
  }

  type Query {
    getDeFiMetrics: [DeFi!]!
    getTVLOverTime: [TVLOverTime!]!
    getDailyVolumeByProtocol: [DailyVolumeByProtocol!]!
    getActiveUsersByChain: [ActiveUsersByChain!]!
  }

  type Mutation {
    _empty: String
  }
`;
