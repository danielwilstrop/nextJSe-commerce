import React, { createContext, useContext, useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'

const Context = createContext()

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false)
  const [cartItems, setCartItems] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)
  const [totalQuantity, setTotalQuantity] = useState(0)
  const [qty, setQty] = useState(1)

  const onAdd = (product, qty) => {
    const checkProdcutInCart = cartItems.find((item) => item.id === product.id)

    setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * qty)
    setTotalQuantity((prevTotalQuantity) => prevTotalQuantity + qty)

    if (checkProdcutInCart) {
      const updatedCartItems = cartItems.map((item) => {
        if (item._id === product._id)
          return {
            ...item,
            qty: item.quantity + qty
          }
      })
      setCartItems(updatedCartItems)
    } else {
      product.quantity = qty
      setCartItems([...cartItems, { ...product }])
    }
    toast.success(`${qty} ${product.name} added to cart`)
  }

  const increaseQty = () => {
    setQty((prevQty) => prevQty + 1)
  }

  const decreaseQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1
      return prevQty - 1
    })
  }

  return (
    <Context.Provider
      value={{
        showCart,
        cartItems,
        totalPrice,
        totalQuantity,
        qty,
        increaseQty,
        decreaseQty,
        onAdd
      }}>
      {children}
    </Context.Provider>
  )
}

export const useStateContext = () => useContext(Context)
