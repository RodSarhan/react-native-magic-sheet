import type { useBottomSheetDynamicSnapPoints } from '@gorhom/bottom-sheet';
import { createContext, useContext } from 'react';

export const BottomSheetLayoutContext = createContext<ReturnType<
  typeof useBottomSheetDynamicSnapPoints
> | null>(null);

export const useBottomSheetLayoutContext = () =>
  useContext(BottomSheetLayoutContext);
