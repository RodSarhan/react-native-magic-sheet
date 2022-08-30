import React, {
  useState,
  useImperativeHandle,
  useCallback,
  useRef,
  useMemo,
  useEffect,
} from 'react';
import { BackHandler, StyleSheet } from 'react-native';
import { magicSheetRef } from './MagicSheetHandlers';
import type {
  NewSheetProps,
  SheetContent,
  TMagicSheet,
} from './MagicSheetHandlers';
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';

type ResolveFunction = (props?: any) => void;

/**
 * @description A magic portal that should stay on the top of the app component hierarchy for the sheet to be displayed.
 */
export const MagicSheetPortal: React.FC = () => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [config, setConfig] = useState<NewSheetProps>({});
  const [sheetContent, setSheetContent] = useState<SheetContent>(() => <></>);
  const lastPromiseDidResolve = useRef(true);

  const resolveRef = useRef<ResolveFunction>(() => {});

  const snapPoints = useMemo(() => ['50%'], []);

  const hide = useCallback<TMagicSheet['hide']>(async (props) => {
    bottomSheetRef.current?.dismiss();
    resolveRef.current(props);
  }, []);

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    []
  );

  useImperativeHandle(magicSheetRef, () => ({
    hide: hide,
    show: async (
      newContent: SheetContent,
      newProps: Partial<NewSheetProps> = {}
    ) => {
      if (!lastPromiseDidResolve.current) {
        resolveRef.current(undefined);
      }
      setSheetContent(newContent);
      setConfig(newProps);
      lastPromiseDidResolve.current = false;
      bottomSheetRef.current?.present();
      return new Promise((resolve) => {
        resolveRef.current = (value) => {
          resolve(value);
          lastPromiseDidResolve.current = true;
        };
      });
    },
  }));

  useEffect(() => {
    if (isVisible) {
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        () => {
          bottomSheetRef.current?.dismiss();
          return true;
        }
      );
      return () => {
        backHandler.remove();
      };
    } else {
      return () => {};
    }
  }, [isVisible]);

  return (
    <BottomSheetModal
      backgroundStyle={{ backgroundColor: 'white' }}
      ref={bottomSheetRef}
      index={0}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
      keyboardBlurBehavior="restore"
      {...config}
      onDismiss={() => {
        if (!lastPromiseDidResolve.current) {
          resolveRef.current();
        }
        setIsVisible(false);
      }}
      onChange={(index) => {
        if (index === 0) {
          setIsVisible(true);
        }
        if (index === -1) {
          setIsVisible(false);
        }
      }}
      style={[styles.container, config?.style]}
    >
      {sheetContent}
    </BottomSheetModal>
  );
};

export const styles = StyleSheet.create({
  container: {
    margin: 0,
  },
});
