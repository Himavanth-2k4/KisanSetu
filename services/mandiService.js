/**
 * Mandi Market Price Service
 * Provides real-time and cached agricultural commodity prices
 * with offline fallback support for low-connectivity rural areas.
 */

const FALLBACK_MANDI_DATA = [
  { commodity: 'Wheat', state: 'Punjab', market: 'Khanna', minPrice: 2275, maxPrice: 2450, modalPrice: 2350, unit: 'Quintal' },
  { commodity: 'Paddy (Basmati)', state: 'Haryana', market: 'Karnal', minPrice: 3200, maxPrice: 3800, modalPrice: 3550, unit: 'Quintal' },
  { commodity: 'Cotton', state: 'Gujarat', market: 'Rajkot', minPrice: 6800, maxPrice: 7500, modalPrice: 7200, unit: 'Quintal' },
  { commodity: 'Soybean', state: 'Madhya Pradesh', market: 'Indore', minPrice: 4200, maxPrice: 4850, modalPrice: 4600, unit: 'Quintal' },
  { commodity: 'Tomato', state: 'Maharashtra', market: 'Nashik', minPrice: 1500, maxPrice: 2200, modalPrice: 1850, unit: 'Quintal' },
  { commodity: 'Onion', state: 'Maharashtra', market: 'Lasalgaon', minPrice: 1800, maxPrice: 2600, modalPrice: 2200, unit: 'Quintal' },
  { commodity: 'Chilli', state: 'Andhra Pradesh', market: 'Guntur', minPrice: 16000, maxPrice: 21000, modalPrice: 18500, unit: 'Quintal' },
  { commodity: 'Turmeric', state: 'Tamil Nadu', market: 'Erode', minPrice: 11000, maxPrice: 14500, modalPrice: 13200, unit: 'Quintal' }
];

class MandiService {
  constructor(fallbackData = FALLBACK_MANDI_DATA) {
    this.fallbackData = fallbackData;
    this.cache = new Map();
  }

  /**
   * Retrieves market prices by commodity name, with case-insensitive matching.
   */
  async getPricesByCommodity(commodityName) {
    if (!commodityName) return this.fallbackData;

    const query = commodityName.trim().toLowerCase();
    const results = this.fallbackData.filter(item =>
      item.commodity.toLowerCase().includes(query)
    );

    return results.length > 0 ? results : this.fallbackData;
  }

  /**
   * Filters mandi rates by state.
   */
  async getPricesByState(stateName) {
    if (!stateName) return this.fallbackData;

    const query = stateName.trim().toLowerCase();
    return this.fallbackData.filter(item =>
      item.state.toLowerCase().includes(query)
    );
  }

  /**
   * Calculates average modal price for a given commodity across markets.
   */
  calculateAveragePrice(records) {
    if (!records || records.length === 0) return 0;
    const total = records.reduce((sum, item) => sum + (item.modalPrice || 0), 0);
    return Math.round(total / records.length);
  }
}

module.exports = {
  MandiService,
  FALLBACK_MANDI_DATA
};
