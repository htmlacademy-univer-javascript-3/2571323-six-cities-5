import { renderHook } from '@testing-library/react-hooks';
import { useRef } from 'react';
import { City } from '@/types/city/city';
import useMap from './use-map'; 

describe('useMap', () => {
  it('должен корректно инициализировать карту', () => {
    const mapRef = useRef(null);
    const city: City = {
      lat: 40.7128,
      lng: -74.0060,
      zoom: 10,
    };

    const { result } = renderHook(() => useMap(mapRef, city));

    // Проверяем, что хук возвращает экземпляр карты
    expect(result.current).not.toBeNull();
  });

  it('должен обновлять позицию карты при изменении данных о городе', () => {
    const mapRef = useRef(null);
    let city: City = {
      lat: 40.7128,
      lng: -74.0060,
      zoom: 10,
    };

    const { result, rerender } = renderHook(() => useMap(mapRef, city));

    // Сначала проверим, что карта инициализирована
    expect(result.current).not.toBeNull();

    // Обновим данные города
    city = {
      lat: 34.0522,
      lng: -118.2437,
      zoom: 12,
    };

    rerender();

    // После изменения города проверим, что карта была обновлена
    expect(result.current?.getCenter().lat).toBe(city.lat);
    expect(result.current?.getCenter().lng).toBe(city.lng);
  });
});
