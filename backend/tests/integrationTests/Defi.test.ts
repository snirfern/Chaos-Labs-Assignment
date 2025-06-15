import request from 'supertest';
import {Express} from "express";
import {initApp} from "../../src";

let app: Express;

beforeAll(async () => {
    app = await initApp()
});

describe('GraphQL Integration Tests', () => {
    it('should fetch DeFi metrics', async () => {
        const query = `
      query {
        getDeFiMetrics {
          timestamp
          protocol
          chain
          total_value_locked_usd
          daily_volume_usd
          active_users
          token
        }
      }
    `;

        const response = await request(app)
            .post('/graphql')
            .send({query})
            .expect(200);

        expect(response.body.errors).toBeUndefined();
        expect(Array.isArray(response.body.data.getDeFiMetrics)).toBe(true);

        if (response.body.data.getDeFiMetrics.length > 0) {
            const item = response.body.data.getDeFiMetrics[0];
            expect(item).toHaveProperty('timestamp');
            expect(item).toHaveProperty('protocol');
            expect(item).toHaveProperty('chain');
            expect(item).toHaveProperty('total_value_locked_usd');
            expect(item).toHaveProperty('daily_volume_usd');
            expect(item).toHaveProperty('active_users');
            expect(item).toHaveProperty('token');
        }
    });

    it('should fetch TVL over time', async () => {
        const query = `
      query {
        getTVLOverTime {
          day
          total_tvl
        }
      }
    `;

        const response = await request(app)
            .post('/graphql')
            .send({query})
            .expect(200);

        expect(response.body.errors).toBeUndefined();
        expect(Array.isArray(response.body.data.getTVLOverTime)).toBe(true);

        if (response.body.data.getTVLOverTime.length > 0) {
            const item = response.body.data.getTVLOverTime[0];
            expect(item).toHaveProperty('day');
            expect(item).toHaveProperty('total_tvl');
        }
    });

    it('should fetch Daily Volume By Protocol', async () => {
        const query = `
      query {
        getDailyVolumeByProtocol {
          day
          protocol
          total_volume
        }
      }
    `;

        const response = await request(app)
            .post('/graphql')
            .send({query})
            .expect(200);

        expect(response.body.errors).toBeUndefined();
        expect(Array.isArray(response.body.data.getDailyVolumeByProtocol)).toBe(true);

        if (response.body.data.getDailyVolumeByProtocol.length > 0) {
            const item = response.body.data.getDailyVolumeByProtocol[0];
            expect(item).toHaveProperty('day');
            expect(item).toHaveProperty('protocol');
            expect(item).toHaveProperty('total_volume');
        }
    });

    it('should fetch Active Users By Chain', async () => {
        const query = `
      query {
        getActiveUsersByChain {
          day
          chain
          total_active_users
        }
      }
    `;

        const response = await request(app)
            .post('/graphql')
            .send({query})
            .expect(200);

        expect(response.body.errors).toBeUndefined();
        expect(Array.isArray(response.body.data.getActiveUsersByChain)).toBe(true);

        if (response.body.data.getActiveUsersByChain.length > 0) {
            const item = response.body.data.getActiveUsersByChain[0];
            expect(item).toHaveProperty('day');
            expect(item).toHaveProperty('chain');
            expect(item).toHaveProperty('total_active_users');
        }
    });
});
