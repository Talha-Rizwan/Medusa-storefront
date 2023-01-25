import { MEDUSA_BACKEND_URL, medusaClient } from "@lib/config"
import React, { useEffect, useState } from "react"
import {
  useCart,
  useCreateLineItem,
  useDeleteLineItem,
  useUpdateLineItem,
} from "medusa-react"

import { Region } from "@medusajs/medusa"
import axios from "axios"
import { handleError } from "@lib/util/handle-error"
import { useCartDropdown } from "./cart-dropdown-context"

interface VariantInfoProps {
  onSuccess: any
  variantId: string
  quantity: number
}

interface LineInfoProps {
  lineId: string
  quantity: number
}

interface StoreContext {
  countryCode: string | undefined
  setRegion: (regionId: string, countryCode: string) => void
  addItem: (item: VariantInfoProps) => void
  updateItem: (item: LineInfoProps) => void
  deleteItem: (lineId: string) => void
  resetCart: () => void
}

const StoreContext = React.createContext<StoreContext | null>(null)

export const useStore = () => {
  const context = React.useContext(StoreContext)
  if (context === null) {
    throw new Error("useStore must be used within a StoreProvider")
  }
  return context
}

interface StoreProps {
  children: React.ReactNode
}

const IS_SERVER = typeof window === "undefined"
const CART_KEY = "medusa_cart_id"

export const StoreProvider = ({ children }: StoreProps) => {
  const { cart, setCart, createCart, updateCart } = useCart()
  const [countryCode, setCountryCode] = useState<string | undefined>(undefined)
  const { timedOpen } = useCartDropdown()
  const addLineItem = useCreateLineItem(cart?.id!)
  const removeLineItem = useDeleteLineItem(cart?.id!)
  const adjustLineItem = useUpdateLineItem(cart?.id!)

  const storeRegion = (regionId: string, countryCode: string) => {
    if (!IS_SERVER) {
      localStorage.setItem(
        "medusa_region",
        JSON.stringify({ regionId, countryCode })
      )

      setCountryCode(countryCode)
    }
  }

  useEffect(() => {
    if (!IS_SERVER) {
      const storedRegion = localStorage.getItem("medusa_region")
      if (storedRegion) {
        const { countryCode } = JSON.parse(storedRegion)
        setCountryCode(countryCode)
      }
    }
  }, [])

  const getRegion = () => {
    if (!IS_SERVER) {
      const region = localStorage.getItem("medusa_region")
      if (region) {
        return JSON.parse(region) as { regionId: string; countryCode: string }
      }
    }
    return null
  }

  const setRegion = async (regionId: string, countryCode: string) => {
    await updateCart.mutateAsync(
      {
        region_id: regionId,
      },
      {
        onSuccess: ({ cart }) => {
          setCart(cart)
          storeCart(cart.id)
          storeRegion(regionId, countryCode)
        },
        onError: (error) => {
          if (process.env.NODE_ENV === "development") {
            console.error(error)
          }
        },
      }
    )
  }

  const ensureRegion = (region: Region) => {
    if (!IS_SERVER) {
      const { regionId, countryCode } = getRegion() || {
        regionId: region.id,
        countryCode: region.countries[0].iso_2,
      }

      if (regionId !== region.id) {
        setRegion(region.id, countryCode)
      }

      storeRegion(region.id, countryCode)
      setCountryCode(countryCode)
    }
  }

  const storeCart = (id: string) => {
    if (!IS_SERVER) {
      localStorage.setItem(CART_KEY, id)
    }
  }

  const getCart = () => {
    if (!IS_SERVER) {
      return localStorage.getItem(CART_KEY)
    }
    return null
  }

  const deleteCart = () => {
    if (!IS_SERVER) {
      localStorage.removeItem(CART_KEY)
    }
  }

  const createNewCart = async (regionId?: string) => {
    const cartData: {
      region_id?: string,
      sales_channel_id?: string
    } = { region_id: regionId }

    if (process.env.NEXT_PUBLIC_SALES_CHANNEL_ID) {
      //check if customer is b2b
      const { data } = await axios.get(`${MEDUSA_BACKEND_URL}/store/customers/is-b2b`, {
        withCredentials: true
      })

      if (data.is_b2b) {
        cartData.sales_channel_id = process.env.NEXT_PUBLIC_SALES_CHANNEL_ID
      }
    }

    await createCart.mutateAsync(
      cartData,
      {
        onSuccess: ({ cart }) => {
          setCart(cart)
          storeCart(cart.id)
          ensureRegion(cart.region)
        },
        onError: (error) => {
          if (process.env.NODE_ENV === "development") {
            console.error(error)
          }
        },
      }
    )
  }

  const resetCart = async () => {
    deleteCart()

    const savedRegion = getRegion()

    const cartData: {
      region_id?: string,
      sales_channel_id?: string
    } = { region_id: savedRegion?.regionId }

    if (process.env.NEXT_PUBLIC_SALES_CHANNEL_ID) {
      //check if customer is b2b
      const { data } = await axios.get(`${MEDUSA_BACKEND_URL}/store/customers/is-b2b`, {
        withCredentials: true
      })

      if (data.is_b2b) {
        cartData.sales_channel_id = process.env.NEXT_PUBLIC_SALES_CHANNEL_ID
      }
    }

    createCart.mutate(
      cartData,
      {
        onSuccess: ({ cart }) => {
          setCart(cart)
          storeCart(cart.id)
          ensureRegion(cart.region)
        },
        onError: (error) => {
          if (process.env.NODE_ENV === "development") {
            console.error(error)
          }
        },
      }
    )
  }

  useEffect(() => {
    const ensureCart = async () => {
      const cartId = getCart()
      const region = getRegion()

      if (cartId) {
        const cartRes = await medusaClient.carts
          .retrieve(cartId)
          .then(async ({ cart }) => {
            if (process.env.NEXT_PUBLIC_SALES_CHANNEL_ID && cart.sales_channel_id !== process.env.NEXT_PUBLIC_SALES_CHANNEL_ID) {
              //check if b2b customer
              const { data } = await axios.get(`${MEDUSA_BACKEND_URL}/store/customers/is-b2b`, {
                withCredentials: true
              })
              if (data.is_b2b) {
                //update cart's sales channel
                const response = await medusaClient.carts.update(cart.id, {
                  sales_channel_id: process.env.NEXT_PUBLIC_SALES_CHANNEL_ID
                })

                return response.cart
              }
            }
            return cart
          })
          .catch(async (_) => {
            return null
          })

        if (!cartRes || cartRes.completed_at) {
          deleteCart()
          await createNewCart(region?.regionId)
          return
        }

        setCart(cartRes)
        ensureRegion(cartRes.region)
      } else {
        await createNewCart(region?.regionId)
      }
    }

    if (!IS_SERVER && !cart?.id) {
      ensureCart()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const addItem = ({
    variantId,
    quantity,
    onSuccess,
  }: {
    variantId: string
    quantity: number
    onSuccess: any
  }) => {
    return addLineItem.mutate(      {
        variant_id: variantId,
        quantity: quantity,
      },
      {
        onSuccess: ({ cart }) => {
          setCart(cart);
          storeCart(cart.id);
          onSuccess(cart);
          timedOpen();
        },
        onError: (error) => {
          handleError(error);
        },
      }
    )
  }

  const deleteItem = (lineId: string) => {
    removeLineItem.mutate(
      {
        lineId,
      },
      {
        onSuccess: ({ cart }) => {
          setCart(cart)
          storeCart(cart.id)
        },
        onError: (error) => {
          handleError(error)
        },
      }
    )
  }

  const updateItem = ({
    lineId,
    quantity,
  }: {
    lineId: string
    quantity: number
  }) => {
    adjustLineItem.mutate(
      {
        lineId,
        quantity,
      },
      {
        onSuccess: ({ cart }) => {
          setCart(cart)
          storeCart(cart.id)
        },
        onError: (error) => {
          handleError(error)
        },
      }
    )
  }

  return (
    <StoreContext.Provider
      value={{
        countryCode,
        setRegion,
        addItem,
        deleteItem,
        updateItem,
        resetCart,
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}