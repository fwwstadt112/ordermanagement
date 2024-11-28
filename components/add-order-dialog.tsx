import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function AddOrderDialog({ isOpen, setIsOpen, addOrder }) {
  const [newOrder, setNewOrder] = useState({
    number: "",
    description: "",
    customer: "",
    quantity: "",
    deliveryDate: ""
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    addOrder(newOrder)
    setIsOpen(false)
    setNewOrder({ number: "", description: "", customer: "", quantity: "", deliveryDate: "" })
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setNewOrder(prev => ({ ...prev, [name]: value }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Neuen Auftrag hinzufügen</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="number" className="text-right">
                Auftragsnummer
              </Label>
              <Input id="number" name="number" value={newOrder.number} onChange={handleChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Bezeichnung
              </Label>
              <Input id="description" name="description" value={newOrder.description} onChange={handleChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="customer" className="text-right">
                Kunde
              </Label>
              <Input id="customer" name="customer" value={newOrder.customer} onChange={handleChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="quantity" className="text-right">
                Menge
              </Label>
              <Input id="quantity" name="quantity" type="number" value={newOrder.quantity} onChange={handleChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="deliveryDate" className="text-right">
                Liefertermin
              </Label>
              <Input id="deliveryDate" name="deliveryDate" type="date" value={newOrder.deliveryDate} onChange={handleChange} className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Auftrag hinzufügen</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

