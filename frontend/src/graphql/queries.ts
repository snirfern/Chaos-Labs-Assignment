import { gql } from 'graphql-tag';

export const GET_ACTIVE_USERS_BY_CHAIN = gql`
  query GetActiveUsersByChain($from: DateTime, $to: DateTime) {
    getActiveUsersByChain(from: $from, to: $to) {
      day
      chain
      total_active_users
    }
  }
`;

export const GET_DAILY_VOLUME_BY_PROTOCOL = gql`
  query GetDailyVolumeByProtocol($from: DateTime, $to: DateTime) {
    getDailyVolumeByProtocol(from: $from, to: $to) {
      day
      protocol
      total_volume
    }
  }
`;

export const GET_TVL_OVER_TIME = gql`
  query GetTVLOverTime($from: DateTime, $to: DateTime) {
    getTVLOverTime(from: $from, to: $to) {
      day
      total_tvl
    }
  }
`;
