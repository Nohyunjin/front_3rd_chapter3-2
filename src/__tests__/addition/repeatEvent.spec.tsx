import { act, renderHook } from '@testing-library/react';
import { useRepeatEvent } from '../../hooks/useRepeatEvent';

describe('useRepeatEvent', () => {
  describe('초기 상태', () => {
    it('기본적으로 반복이 비활성화되어 있어야 한다', () => {
      const { result } = renderHook(() => useRepeatEvent());

      expect(result.current.isRepeating).toBe(false);
    });

    it('반복 관련 초기값이 올바르게 설정되어 있어야 한다', () => {
      const { result } = renderHook(() => useRepeatEvent());

      expect(result.current.repeatType).toBe('daily');
      expect(result.current.repeatInterval).toBe(1);
      expect(result.current.repeatEndDate).toBe('');
    });
  });

  describe('반복 설정 변경', () => {
    it('반복 활성화 상태를 변경할 수 있다', () => {
      const { result } = renderHook(() => useRepeatEvent());

      act(() => {
        result.current.setIsRepeating(true);
      });

      expect(result.current.isRepeating).toBe(true);
    });

    it('반복 유형을 변경할 수 있다', () => {
      const { result } = renderHook(() => useRepeatEvent());

      act(() => {
        result.current.setRepeatType('monthly');
      });

      expect(result.current.repeatType).toBe('monthly');
    });
  });

  describe('특수 날짜 처리', () => {
    it('윤년 2월 29일에 매월 반복 설정 시 경고 메시지를 반환해야 한다', () => {
      const { result } = renderHook(() => useRepeatEvent());

      act(() => {
        result.current.setEventDate(new Date('2024-02-29'));
        result.current.setRepeatType('monthly');
      });

      expect(result.current.warning).toBe('윤년의 2월 29일은 매월 마지막 날로 처리됩니다');
    });

    it('31일에 매월 반복 설정 시 경고 메시지를 반환해야 한다', () => {
      const { result } = renderHook(() => useRepeatEvent());

      act(() => {
        result.current.setEventDate(new Date('2024-01-31'));
        result.current.setRepeatType('monthly');
      });

      expect(result.current.warning).toBe('31일은 해당 월의 마지막 날로 처리됩니다');
    });
  });
});
