"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Printer, FileSpreadsheet, Box, Truck, Package, ChevronDown, ChevronUp, Edit, Trash2 } from 'lucide-react'
import { Button } from "@/components/ui/button"

const orderStatuses = [
  { name: "Neu", icon: FileSpreadsheet },
  { name: "Druckvorstufe", icon: FileSpreadsheet },
  { name: "Druckplatten", icon: FileSpreadsheet },
  { name: "Gedruckt", icon: Printer },
  { name: "Weiterverarbeitung", icon: Box },
  { name: "Verpackt", icon: Package },
  { name: "Ausgeliefert", icon: Truck },
]

export default function OrderList({ orders, setOrders, onEdit, onDelete }) {
  const [expandedOrder, setExpandedOrder] = useState<number | null>(null)

  const getStatusColor = (status: number) => {
    const colors = ["bg-blue-100", "bg-blue-200", "bg-blue-300", "bg-green-100", "bg-green-200", "bg-green-300", "bg-green-400"]
    return colors[status] || ""
  }

  const updateOrderStatus = (orderId: number, newStatus: number) => {
    setOrders(orders.map(order => 
      order.id === orderId 
        ? { ...order, status: order.status === newStatus ? newStatus - 1 : newStatus } 
        : order
    ))
  }

  const toggleExpand = (orderId: number) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId)
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Auftragsnummer</TableHead>
          <TableHead>Auftragsbezeichnung</TableHead>
          <TableHead>Kunde</TableHead>
          <TableHead>Menge</TableHead>
          <TableHead>Liefertermin</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Aktionen</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <>
            <TableRow key={order.id} className={getStatusColor(order.status)}>
              <TableCell>{order.number}</TableCell>
              <TableCell>{order.description}</TableCell>
              <TableCell>{order.customer}</TableCell>
              <TableCell>{order.quantity}</TableCell>
              <TableCell>{order.deliveryDate}</TableCell>
              <TableCell>
                <div className="flex space-x-1">
                  {orderStatuses.slice(0, order.status + 1).map((status, index) => (
                    <status.icon key={index} className="h-5 w-5" />
                  ))}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm" onClick={() => toggleExpand(order.id)}>
                    {expandedOrder === order.id ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => onEdit(order)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => onDelete(order.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
            {expandedOrder === order.id && (
              <TableRow>
                <TableCell colSpan={7}>
                  <div className="flex justify-between items-center p-4">
                    {orderStatuses.map((status, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={index <= order.status}
                            onChange={() => updateOrderStatus(order.id, index)}
                            className="form-checkbox h-5 w-5 text-blue-600"
                          />
                          <span>{status.name}</span>
                        </label>
                        <status.icon className="h-6 w-6 mt-2" />
                      </div>
                    ))}
                  </div>
                </TableCell>
              </TableRow>
            )}
          </>
        ))}
      </TableBody>
    </Table>
  )
}

