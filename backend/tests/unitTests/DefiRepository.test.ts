import { DeFiDal } from '../../src/dal/deFiDal';
import {DeFiRepository} from "../../src/repositories/defiRepository";

jest.mock('../../src/dal/deFiDal');

describe('DeFiRepository', () => {
    let repo: DeFiRepository;
    let mockDeFiDalInstance: jest.Mocked<DeFiDal>;

    beforeEach(() => {
        mockDeFiDalInstance = new DeFiDal() as jest.Mocked<DeFiDal>;
        (DeFiDal as jest.Mock).mockImplementation(() => mockDeFiDalInstance);
        repo = new DeFiRepository();
    });

    it('getDeFiMetrics calls getDeFiMetrics from DAL and returns data directly', async () => {
        const mockData = [{ metric: 'abc', value: 123 }];
        mockDeFiDalInstance.getDeFiMetrics.mockResolvedValue(mockData);

        const result = await repo.getDeFiMetrics();

        expect(mockDeFiDalInstance.getDeFiMetrics).toHaveBeenCalledTimes(1);
        expect(result).toEqual(mockData);
    });

    it('getTVLOverTime calls queryTVLOverTime and converts total_tvl to number', async () => {
        const rawData = [
            { day: '2023-01-01', total_tvl: '123.45' },
            { day: '2023-01-02', total_tvl: '678.90' },
        ];
        mockDeFiDalInstance.queryTVLOverTime.mockResolvedValue(rawData);

        const result = await repo.getTVLOverTime();

        expect(mockDeFiDalInstance.queryTVLOverTime).toHaveBeenCalledTimes(1);
        expect(result).toEqual([
            { day: '2023-01-01', total_tvl: 123.45 },
            { day: '2023-01-02', total_tvl: 678.9 },
        ]);
    });

    it('getDailyVolumeByProtocol calls queryDailyVolumeByProtocol and converts total_volume to number', async () => {
        const rawData = [
            { day: '2023-01-01', protocol: 'Aave', total_volume: '1000' },
            { day: '2023-01-02', protocol: 'Compound', total_volume: '2000' },
        ];
        mockDeFiDalInstance.queryDailyVolumeByProtocol.mockResolvedValue(rawData);

        const result = await repo.getDailyVolumeByProtocol();

        expect(mockDeFiDalInstance.queryDailyVolumeByProtocol).toHaveBeenCalledTimes(1);
        expect(result).toEqual([
            { day: '2023-01-01', protocol: 'Aave', total_volume: 1000 },
            { day: '2023-01-02', protocol: 'Compound', total_volume: 2000 },
        ]);
    });

    it('getActiveUsersByChain calls queryActiveUsersByChain and converts total_active_users to number', async () => {
        const rawData = [
            { day: '2023-01-01', chain: 'Ethereum', total_active_users: '500' },
            { day: '2023-01-02', chain: 'Polygon', total_active_users: '300' },
        ];
        mockDeFiDalInstance.queryActiveUsersByChain.mockResolvedValue(rawData);

        const result = await repo.getActiveUsersByChain();

        expect(mockDeFiDalInstance.queryActiveUsersByChain).toHaveBeenCalledTimes(1);
        expect(result).toEqual([
            { day: '2023-01-01', chain: 'Ethereum', total_active_users: 500 },
            { day: '2023-01-02', chain: 'Polygon', total_active_users: 300 },
        ]);
    });
});
