// src/App.tsx
import { useState } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export default function App() {
  const [open, setOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white p-6 flex justify-center">
      <div className="max-w-5xl w-full grid md:grid-cols-2 gap-6">
        {/* Chap tomoni */}
        <div>
          <button className="mb-4">
            <span className="text-red-500 text-2xl">←</span>
          </button>
          <h1 className="text-3xl font-bold">Sistam</h1>
          <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm ml-2">Tabletkalar</span>

          <p className="mt-4 text-gray-600 text-sm leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc sit amet...
          </p>

          <Accordion type="single" collapsible className="mt-6">
            <AccordionItem value="tarkibi">
              <AccordionTrigger>Tarkibi</AccordionTrigger>
              <AccordionContent>
                Mahsulot tarkibi haqida ma’lumot...
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="qollanilishi">
              <AccordionTrigger>Qo‘llanilish ma’lumotlari</AccordionTrigger>
              <AccordionContent>
                <Button variant="outline" size="sm" onClick={() => setOpen(true)}>Ko‘rish</Button>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* O'ng tomoni */}
        <div className="flex flex-col items-center">
          <img src="/sistam.png" alt="Sistam" className="w-64 rounded-md shadow-md" />
          <div className="flex space-x-2 mt-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-10 h-10 bg-gray-200 rounded-md" />
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Qo‘llanilishi</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-gray-600">
            Bu mahsulotdan foydalanish bo‘yicha ma’lumot...
          </p>
        </DialogContent>
      </Dialog>
    </div>
  )
}
