"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const defiService_1 = __importDefault(require("../../src/services/defi/defiService"));
describe("DeFiService", () => {
    let service;
    let repoMock;
    beforeEach(() => {
        repoMock = {
            getDeFiMetrics: jest.fn(),
            getTVLOverTime: jest.fn(),
            getDailyVolumeByProtocol: jest.fn(),
            getActiveUsersByChain: jest.fn(),
        };
        service = new defiService_1.default(repoMock);
    });
    it("getMetrics returns expected data", async () => {
        const data = [
            {
                timestamp: new Date("2025-01-01T00:00:00Z"),
                protocol: "Uniswap",
                chain: "Ethereum",
                total_value_locked_usd: 123456.78,
                daily_volume_usd: 98765.43,
                active_users: 1000,
                token: "UNI",
            },
        ];
        repoMock.getDeFiMetrics.mockResolvedValue(data);
        const result = await service.getMetrics();
        expect(repoMock.getDeFiMetrics).toHaveBeenCalled();
        expect(result).toEqual(data);
    });
    it("getTVLOverTime returns expected data", async () => {
        const data = [
            { day: "2025-01-01", total_tvl: 500000 },
        ];
        repoMock.getTVLOverTime.mockResolvedValue(data);
        const result = await service.getTVLOverTime();
        expect(repoMock.getTVLOverTime).toHaveBeenCalled();
        expect(result).toEqual(data);
    });
    it("getDailyVolumeByProtocol returns expected data", async () => {
        const data = [
            { day: "2025-01-01", protocol: "Uniswap", total_volume: 100000 },
        ];
        repoMock.getDailyVolumeByProtocol.mockResolvedValue(data);
        const result = await service.getDailyVolumeByProtocol();
        expect(repoMock.getDailyVolumeByProtocol).toHaveBeenCalled();
        expect(result).toEqual(data);
    });
    it("getActiveUsersByChain returns expected data", async () => {
        const data = [
            { day: "2025-01-01", chain: "Ethereum", total_active_users: 1500 },
        ];
        repoMock.getActiveUsersByChain.mockResolvedValue(data);
        const result = await service.getActiveUsersByChain();
        expect(repoMock.getActiveUsersByChain).toHaveBeenCalled();
        expect(result).toEqual(data);
    });
});
//# sourceMappingURL=DeFiService.test.js.map