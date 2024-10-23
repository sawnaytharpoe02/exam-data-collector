import { create } from "zustand";

interface CustomerStoreState {
  selectedCustomerIds: string[];
  toggleCustomerSelection: (id: string, isSelected: boolean) => void;
  toggleAllCustomerSelection: (ids: string[], isSelected: boolean) => void;
}

export const useCustomerStore = create<CustomerStoreState>((set) => ({
  selectedCustomerIds: [],
  toggleCustomerSelection: (id: string, isSelected: boolean) =>
    set((state) => ({
      selectedCustomerIds: isSelected
        ? [...state.selectedCustomerIds, id]
        : state.selectedCustomerIds.filter(
            (customerId: string) => customerId !== id
          ),
    })),

  toggleAllCustomerSelection(ids: string[], isSelected: boolean) {
    set(() => ({
      selectedCustomerIds: isSelected ? ids : [],
    }));
  },
}));
