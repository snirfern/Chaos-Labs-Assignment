import DeFiService from "../../src/services/defi/defiService";
import { DeFiRepository } from "../../src/repositories/defiRepository";
import { IDeFiMetrics } from "../../src/models/interface";

describe("DeFiService", () => {
    let repoMock: jest.Mocked<DeFiRepository>;
    let service: DeFiService;

    beforeEach(() => {
        repoMock = {
            getDeFiMetrics: jest.fn(),
            getTVLOverTime: jest.fn(),
            getDailyVolumeByProtocol: jest.fn(),
            getActiveUsersByChain: jest.fn(),
        } as unknown as jest.Mocked<DeFiRepository>;

        service = new DeFiService(repoMock);
    });

    it("should return defi metrics from the repository", async () => {
        const mockData: IDeFiMetrics[] = [
            {
                timestamp: new Date(),
                protocol: "Aave",
                chain: "Ethereum",
                total_value_locked_usd: 123,
                daily_volume_usd: 10,
                active_users: 100,
                token: "USDC",
            },
        ];

        repoMock.getDeFiMetrics.mockResolvedValue(mockData);

        const result = await service.getMetrics();
        expect(repoMock.getDeFiMetrics).toHaveBeenCalled();
        expect(result).toEqual(mockData);
    });

    it("should return TVL over time", async () => {
        const tvl = [{ day: "2024-01-01", total_tvl: 1000 }];
        repoMock.getTVLOverTime.mockResolvedValue(tvl);

        const result = await service.getTVLOverTime();
        expect(repoMock.getTVLOverTime).toHaveBeenCalled();
        expect(result).toEqual(tvl);
    });

    it("should return daily volume by protocol", async () => {
        const volume = [{ day: "2024-01-01", protocol: "Uniswap", total_volume: 500 }];
        repoMock.getDailyVolumeByProtocol.mockResolvedValue(volume);

        const result = await service.getDailyVolumeByProtocol();
        expect(repoMock.getDailyVolumeByProtocol).toHaveBeenCalled();
        expect(result).toEqual(volume);
    });

    it("should return active users by chain", async () => {
        const users = [{ day: "2024-01-01", chain: "Polygon", total_active_users: 250 }];
        repoMock.getActiveUsersByChain.mockResolvedValue(users);

        const result = await service.getActiveUsersByChain();
        expect(repoMock.getActiveUsersByChain).toHaveBeenCalled();
        expect(result).toEqual(users);
    });
});
