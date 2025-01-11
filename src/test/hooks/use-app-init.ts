import { renderHook } from '@testing-library/react-hooks';
import { useAppDispatch } from '@/store/hooks';
import useAppInit from '@/hooks/use-app-init';
import { fetchGlobalOffers, validateUser } from '@/store/actions';

// Мокаем useAppDispatch и действия
jest.mock('@/store/hooks', () => ({
  useAppDispatch: jest.fn(),
}));

jest.mock('@/store/actions', () => ({
  fetchGlobalOffers: jest.fn(),
  validateUser: jest.fn(),
}));

describe('useAppInit', () => {
  it('должен вызывать действия validateUser и fetchGlobalOffers при инициализации', () => {
    // Мокаем возвращаемое значение dispatch
    const dispatch = jest.fn();
    useAppDispatch.mockReturnValue(dispatch);

    renderHook(() => useAppInit());

    expect(dispatch).toHaveBeenCalledWith(validateUser());
    expect(dispatch).toHaveBeenCalledWith(fetchGlobalOffers());
  });
});
