const mockGetMetrics = jest.fn().mockResolvedValue({some: 'metrics'});
const mockGetTVLOverTime = jest.fn().mockResolvedValue([{time: 1, value: 100}]);
const mockGetDailyVolumeByProtocol = jest.fn().mockResolvedValue([{protocol: 'A', volume: 200}]);
const mockGetActiveUsersByChain = jest.fn().mockResolvedValue([{chain: 'X', users: 50}]);

jest.mock('../../src/repositories/defiRepository', () => {
    return {
        DeFiRepository: jest.fn().mockImplementation(() => {
            return {};
        }),
    };
});

jest.mock('../../src/services/defi/defiService', () => {
    return jest.fn().mockImplementation(() => {
        return {
            getMetrics: mockGetMetrics,
            getTVLOverTime: mockGetTVLOverTime,
            getDailyVolumeByProtocol: mockGetDailyVolumeByProtocol,
            getActiveUsersByChain: mockGetActiveUsersByChain,
        };
    });
});

import {queryResolvers} from '../../src/controllers/Resolvers/queryResolvers';

describe('queryResolvers', () => {
    it('getDeFiMetrics calls service and returns data', async () => {
        const result = await queryResolvers.getDeFiMetrics();
        expect(mockGetMetrics).toHaveBeenCalledTimes(1);
        expect(result).toEqual({some: 'metrics'});
    });

    it('getTVLOverTime calls service and returns data', async () => {
        const result = await queryResolvers.getTVLOverTime();
        expect(mockGetTVLOverTime).toHaveBeenCalledTimes(1);
        expect(result).toEqual([{time: 1, value: 100}]);
    });

    it('getDailyVolumeByProtocol calls service and returns data', async () => {
        const result = await queryResolvers.getDailyVolumeByProtocol();
        expect(mockGetDailyVolumeByProtocol).toHaveBeenCalledTimes(1);
        expect(result).toEqual([{protocol: 'A', volume: 200}]);
    });

    it('getActiveUsersByChain calls service and returns data', async () => {
        const result = await queryResolvers.getActiveUsersByChain();
        expect(mockGetActiveUsersByChain).toHaveBeenCalledTimes(1);
        expect(result).toEqual([{chain: 'X', users: 50}]);
    });
});
