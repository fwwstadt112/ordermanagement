"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Package } from 'lucide-react'
import OrderList from "./components/order-list"
import AddOrderDialog from "./components/add-order-dialog"
import EditOrderDialog from "./components/edit-order-dialog"

export default function Home() {
  const [isAddOrderOpen, setIsAddOrderOpen] = useState(false)
  const [isEditOrderOpen, setIsEditOrderOpen] = useState(false)
  const [editingOrder, setEditingOrder] = useState(null)
  const [orders, setOrders] = useState([
    { id: 1, number: "A001", description: "Flyer Druck", customer: "Firma A", quantity: 1000, deliveryDate: "2023-12-15", status: 2 },
    { id: 2, number: "A002", description: "Visitenkarten", customer: "Firma B", quantity: 500, deliveryDate: "2023-12-20", status: 4 },
    { id: 3, number: "A003", description: "Broschüren", customer: "Firma C", quantity: 200, deliveryDate: "2023-12-25", status: 6 },
  ])
  const [sortBy, setSortBy] = useState("number")

  const addOrder = (newOrder) => {
    setOrders([...orders, { ...newOrder, id: orders.length + 1, status: 0 }])
  }

  const editOrder = (updatedOrder) => {
    setOrders(orders.map(order => order.id === updatedOrder.id ? updatedOrder : order))
    setIsEditOrderOpen(false)
  }

  const deleteOrder = (orderId) => {
    setOrders(orders.filter(order => order.id !== orderId))
  }

  const openEditDialog = (order) => {
    setEditingOrder(order)
    setIsEditOrderOpen(true)
  }

  const sortedOrders = [...orders].sort((a, b) => {
    if (sortBy === "quantity") {
      return a[sortBy] - b[sortBy]
    }
    if (sortBy === "deliveryDate") {
      return new Date(a[sortBy]) - new Date(b[sortBy])
    }
    return a[sortBy].localeCompare(b[sortBy])
  })

  return (
    <div className="container mx-auto p-4">
      <header className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <Package className="h-8 w-8 mr-2" />
          <h1 className="text-2xl font-bold">Auftragsübersicht</h1>
        </div>
        <Button onClick={() => setIsAddOrderOpen(true)}>Auftrag hinzufügen</Button>
      </header>
      
      <div className="flex mb-4 space-x-4">
        <Input placeholder="Suche..." className="max-w-sm" />
        <Select onValueChange={setSortBy} defaultValue={sortBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sortieren nach" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="number">Auftragsnummer</SelectItem>
            <SelectItem value="description">Auftragsbezeichnung</SelectItem>
            <SelectItem value="customer">Kunde</SelectItem>
            <SelectItem value="quantity">Menge</SelectItem>
            <SelectItem value="deliveryDate">Liefertermin</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <OrderList 
        orders={sortedOrders} 
        setOrders={setOrders} 
        onEdit={openEditDialog}
        onDelete={deleteOrder}
      />
      <AddOrderDialog isOpen={isAddOrderOpen} setIsOpen={setIsAddOrderOpen} addOrder={addOrder} />
      <EditOrderDialog 
        isOpen={isEditOrderOpen} 
        setIsOpen={setIsEditOrderOpen} 
        editOrder={editOrder} 
        order={editingOrder} 
      />
    </div>
  )
}

