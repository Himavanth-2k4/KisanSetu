const { MandiService, FALLBACK_MANDI_DATA } = require('../services/mandiService');

describe('MandiService', () => {
  let service;

  beforeEach(() => {
    service = new MandiService();
  });

  test('should return all fallback data when no commodity query is given', async () => {
    const data = await service.getPricesByCommodity('');
    expect(data.length).toBe(FALLBACK_MANDI_DATA.length);
  });

  test('should accurately search commodity by partial name case-insensitively', async () => {
    const wheatResults = await service.getPricesByCommodity('wheat');
    expect(wheatResults.length).toBeGreaterThan(0);
    expect(wheatResults[0].commodity).toBe('Wheat');
    expect(wheatResults[0].modalPrice).toBeGreaterThan(0);
  });

  test('should filter prices by state', async () => {
    const punjabResults = await service.getPricesByState('punjab');
    expect(punjabResults.length).toBeGreaterThan(0);
    expect(punjabResults[0].state).toBe('Punjab');
  });

  test('should calculate average modal price correctly', () => {
    const sample = [
      { modalPrice: 2000 },
      { modalPrice: 3000 },
      { modalPrice: 4000 }
    ];
    const avg = service.calculateAveragePrice(sample);
    expect(avg).toBe(3000);
  });
});
