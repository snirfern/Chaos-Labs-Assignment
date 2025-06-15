import {gql} from 'graphql-tag';

export const GET_ACTIVE_USERS_BY_CHAIN = gql`
  query {
    getActiveUsersByChain {
      day
      chain
      total_active_users
    }
  }
`;

export const GET_DAILY_VOLUME_BY_PROTOCOL = gql`
  query {
    getDailyVolumeByProtocol {
      day
      protocol
      total_volume
    }
  }
`;

export const GET_TVL_OVER_TIME = gql`
  query {
    getTVLOverTime {
      day
      total_tvl
    }
  }
`;
