import React, { createContext, useContext, useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'

const Context = createContext()

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false)
  const [cartItems, setCartItems] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)
  const [totalQuantity, setTotalQuantity] = useState(0)
  const [qty, setQty] = useState(1)

  let foundProduct
  let index

  const onAdd = (product, qty) => {
    const checkProdcutInCart = cartItems.find(
      (item) => item._id === product._id
    )

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

  const onRemove = (product) => {
    foundProduct = cartItems.find((item) => item._id === product._id)
    const newCartItem = cartItems.filter((item) => item._id !== product._id)

    setTotalPrice((prev) => prev - foundProduct.price * foundProduct.quantity)
    setTotalQuantity((curr) => curr - foundProduct.quantity)
    setCartItems(newCartItem)
  }

  const toggleCartItemQuantity = (id, value) => {
    foundProduct = cartItems.find((item) => item._id === id)
    index = cartItems.findIndex((product) => product._id === id)
    const newCartItems = cartItems.filter((item) => item._id !== id)

    const newCardItems = cartItems

    if (value === 'inc') {
      setCartItems([
        ...newCartItems,
        { ...foundProduct, quantity: foundProduct.quantity + 1 }
      ])
      newCardItems.map(
        (item) => item._id === id && (item.quantity = foundProduct.quantity + 1)
      )
      setCartItems([...newCardItems])
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price)
      setTotalQuantity((prevTotalQuantity) => prevTotalQuantity + 1)
    } else if (value === 'dec') {
      if (foundProduct.quantity > 1) {
        setCartItems([
          ...newCartItems,
          { ...foundProduct, quantity: foundProduct.quantity - 1 }
        ])
        newCardItems.map(
          (item) =>
            item._id === id && (item.quantity = foundProduct.quantity - 1)
        )
        setCartItems([...newCardItems])
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price)
        setTotalQuantity((prevTotalQuantity) => prevTotalQuantity - 1)
      }
    }
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
        onAdd,
        setShowCart,
        toggleCartItemQuantity,
        onRemove,
        setCartItems,
        setTotalPrice,
        setTotalQuantity
      }}>
      {children}
    </Context.Provider>
  )
}

export const useStateContext = () => useContext(Context)
