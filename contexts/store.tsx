'use client'

import { Cart, Store, StoreAction } from '@/lib/types'
import { Dispatch, createContext, useContext, useReducer } from 'react'

const initialStore: Store = {
  allProducts: [],
  cart: {}
}

const StoreContext = createContext<Store>(initialStore)

const StoreDispatchContext = createContext<Dispatch<StoreAction>>(() => {})

type StoreProviderProps = {
  children: React.ReactNode
}

export function StoreProvider({ children }: StoreProviderProps) {
  const [store, dispatch] = useReducer(storeReducer, initialStore)

  return (
    <StoreContext.Provider value={store}>
      <StoreDispatchContext.Provider value={dispatch}>
        {children}
      </StoreDispatchContext.Provider>
    </StoreContext.Provider>
  )
}

export function useStore() {
  return useContext(StoreContext)
}

export function useStoreDispatch() {
  return useContext(StoreDispatchContext)
}

function storeReducer(store: Store, action: StoreAction) {
  switch (action.type) {
    case 'fetched_products': {
      return {
        ...store,
        allProducts: action.value
      }
    }
    case 'added_to_cart': {
      let nextCart = { ...store.cart }

      return {
        ...store,
        cart: {
          ...store.cart,
          [action.value]: action.items
        }
      }
    }
    case 'removed_from_cart': {
      let nextCart = { ...store.cart }
      delete nextCart[action.value]

      return {
        ...store,
        cart: nextCart
      }
    }
    default: {
      throw Error('Unknown action')
    }
  }
}
