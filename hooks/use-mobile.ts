import { useSyncExternalStore } from "react";

const MOBILE_BREAKPOINT = 768;
const MOBILE_MEDIA_QUERY = `(max-width: ${MOBILE_BREAKPOINT - 1}px)`;

const subscribeToMobileQuery = (onStoreChange: () => void) => {
  const mediaQueryList = window.matchMedia(MOBILE_MEDIA_QUERY);

  mediaQueryList.addEventListener("change", onStoreChange);

  return () => {
    mediaQueryList.removeEventListener("change", onStoreChange);
  };
};

const getMobileSnapshot = () => {
  return window.matchMedia(MOBILE_MEDIA_QUERY).matches;
};

const getServerSnapshot = () => {
  return false;
};

export const useIsMobile = () => {
  return useSyncExternalStore(
    subscribeToMobileQuery,
    getMobileSnapshot,
    getServerSnapshot
  );
};
