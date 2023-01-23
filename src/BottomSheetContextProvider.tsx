import { useBottomSheetDynamicSnapPoints } from '@gorhom/bottom-sheet';
import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
} from 'react';

export const BottomSheetLayoutContext = createContext<ReturnType<
  typeof useBottomSheetDynamicSnapPoints
> | null>(null);

export const MagicSheetSnapPointsProvider: React.FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  const initialSnapPoints = useMemo(() => ['CONTENT_HEIGHT'], []);
  const dynamicSnapPointsValues =
    useBottomSheetDynamicSnapPoints(initialSnapPoints);
  return (
    <BottomSheetLayoutContext.Provider value={dynamicSnapPointsValues}>
      {children}
    </BottomSheetLayoutContext.Provider>
  );
};

export const useBottomSheetLayoutContext = () =>
  useContext(BottomSheetLayoutContext);
