import { renderHook } from '@testing-library/react-hooks';
import useMap from '@/hooks/use-map';
import { City } from '@/types/city';

// Мокаем зависимости от leaflet
jest.mock('leaflet', () => ({
  Map: jest.fn().mockImplementation(() => ({
    addLayer: jest.fn(),
    panTo: jest.fn(),
  })),
  TileLayer: jest.fn().mockImplementation(() => {}),
  LatLng: jest.fn(),
}));

describe('useMap', () => {
  const mockCity: City = {
    location: {
      latitude: 52.379189,
      longitude: 4.90093,
      zoom: 10,
    },
    name: 'Amsterdam',
  };

  const mapRef = { current: document.createElement('div') };

  it('должен инициализировать карту при первом рендере', () => {
    const { result } = renderHook(() => useMap(mapRef, mockCity));

    expect(result.current).not.toBeNull();
    expect(result.current?.addLayer).toHaveBeenCalled();
  });

  it('должен обновлять позицию карты при изменении города', () => {
    const { result, rerender } = renderHook(
      ({ mapRef, city }) => useMap(mapRef, city),
      {
        initialProps: { mapRef, city: mockCity },
      }
    );

    // Обновляем город
    const updatedCity = { ...mockCity, location: { ...mockCity.location, latitude: 48.8566, longitude: 2.3522 } };
    rerender({ mapRef, city: updatedCity });

    // Проверяем, что панорама карты обновляется
    expect(result.current?.panTo).toHaveBeenCalledWith(expect.objectContaining({ lat: 48.8566, lng: 2.3522 }));
  });

  it('должен возвращать null, если mapRef не инициализирован', () => {
    const mapRefEmpty = { current: null };
    const { result } = renderHook(() => useMap(mapRefEmpty, mockCity));

    expect(result.current).toBeNull();
  });
});
