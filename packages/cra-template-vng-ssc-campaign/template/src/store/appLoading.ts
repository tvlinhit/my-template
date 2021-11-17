import create, { GetState, SetState } from 'zustand';

type AppLoadingState = {
  isLoading: boolean;
  setLoading: (value: boolean) => void;
};

const useAppLoading = create<AppLoadingState>((set: SetState<AppLoadingState>, get: GetState<AppLoadingState>) => ({
  isLoading: false,
  setLoading: (value: boolean): void => {
    set({ isLoading: value });
  },
}));
export default useAppLoading;
