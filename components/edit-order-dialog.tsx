import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function EditOrderDialog({ isOpen, setIsOpen, editOrder, order }) {
  const [editedOrder, setEditedOrder] = useState(order || {})

  useEffect(() => {
    if (order) {
      setEditedOrder(order)
    }
  }, [order])

  const handleSubmit = (e) => {
    e.preventDefault()
    editOrder(editedOrder)
    setIsOpen(false)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setEditedOrder(prev => ({ ...prev, [name]: value }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Auftrag bearbeiten</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="number" className="text-right">
                Auftragsnummer
              </Label>
              <Input id="number" name="number" value={editedOrder.number} onChange={handleChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Bezeichnung
              </Label>
              <Input id="description" name="description" value={editedOrder.description} onChange={handleChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="customer" className="text-right">
                Kunde
              </Label>
              <Input id="customer" name="customer" value={editedOrder.customer} onChange={handleChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="quantity" className="text-right">
                Menge
              </Label>
              <Input id="quantity" name="quantity" type="number" value={editedOrder.quantity} onChange={handleChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="deliveryDate" className="text-right">
                Liefertermin
              </Label>
              <Input id="deliveryDate" name="deliveryDate" type="date" value={editedOrder.deliveryDate} onChange={handleChange} className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Änderungen speichern</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

