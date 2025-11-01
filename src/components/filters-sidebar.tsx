"use client"

import { useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function FiltersSidebar() {
  const [priceRange, setPriceRange] = useState([0, 15000])

  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-4 font-semibold">Filtros</h3>
      </div>

      <Accordion type="multiple" defaultValue={["price", "brand", "cpu"]} className="w-full">
        {/* Price Range */}
        <AccordionItem value="price">
          <AccordionTrigger>Faixa de Preço</AccordionTrigger>
          {/* pt-2 dá respiro em cima; evita que o thumb/graduation pareça “cortado” */}
          <AccordionContent className="space-y-4 pt-2">
            {/* px-1 só afasta um pouco do contorno do card/accordion */}
            <div className="px-1">
              {/* py-2 aumenta o espaço vertical reservado ao slider, evitando sobreposição visual */}
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                max={15000}
                step={100}
                className="w-full py-2"
                aria-label="Faixa de preço"
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="tabular-nums">R$ {priceRange[0]}</span>
              <span className="tabular-nums">R$ {priceRange[1]}</span>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Brand */}
        <AccordionItem value="brand">
          <AccordionTrigger>Marca</AccordionTrigger>
          <AccordionContent className="space-y-3">
            {["TechNova", "PowerRig", "AeroTech", "ViewMax", "KeyMaster"].map((brand) => (
              <div key={brand} className="flex items-center space-x-2">
                <Checkbox id={`brand-${brand}`} />
                <Label htmlFor={`brand-${brand}`} className="cursor-pointer text-sm font-normal">
                  {brand}
                </Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>

        {/* CPU */}
        <AccordionItem value="cpu">
          <AccordionTrigger>Processador</AccordionTrigger>
          <AccordionContent className="space-y-3">
            {["Intel Core i5", "Intel Core i7", "Intel Core i9", "AMD Ryzen 5", "AMD Ryzen 7", "AMD Ryzen 9"].map(
              (cpu) => (
                <div key={cpu} className="flex items-center space-x-2">
                  <Checkbox id={`cpu-${cpu}`} />
                  <Label htmlFor={`cpu-${cpu}`} className="cursor-pointer text-sm font-normal">
                    {cpu}
                  </Label>
                </div>
              ),
            )}
          </AccordionContent>
        </AccordionItem>

        {/* GPU */}
        <AccordionItem value="gpu">
          <AccordionTrigger>Placa de Vídeo</AccordionTrigger>
          <AccordionContent className="space-y-3">
            {[
              "NVIDIA RTX 4090",
              "NVIDIA RTX 4080",
              "NVIDIA RTX 4070",
              "NVIDIA RTX 4060",
              "AMD Radeon RX 7900",
              "Integrada",
            ].map((gpu) => (
              <div key={gpu} className="flex items-center space-x-2">
                <Checkbox id={`gpu-${gpu}`} />
                <Label htmlFor={`gpu-${gpu}`} className="cursor-pointer text-sm font-normal">
                  {gpu}
                </Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>

        {/* RAM */}
        <AccordionItem value="ram">
          <AccordionTrigger>Memória RAM</AccordionTrigger>
          <AccordionContent className="space-y-3">
            {["8GB", "16GB", "32GB", "64GB"].map((ram) => (
              <div key={ram} className="flex items-center space-x-2">
                <Checkbox id={`ram-${ram}`} />
                <Label htmlFor={`ram-${ram}`} className="cursor-pointer text-sm font-normal">
                  {ram}
                </Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>

        {/* Storage */}
        <AccordionItem value="storage">
          <AccordionTrigger>Armazenamento</AccordionTrigger>
          <AccordionContent className="space-y-3">
            {["256GB", "512GB", "1TB", "2TB", "NVMe", "SATA"].map((storage) => (
              <div key={storage} className="flex items-center space-x-2">
                <Checkbox id={`storage-${storage}`} />
                <Label htmlFor={`storage-${storage}`} className="cursor-pointer text-sm font-normal">
                  {storage}
                </Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>

        {/* Display */}
        <AccordionItem value="display">
          <AccordionTrigger>Tela</AccordionTrigger>
          <AccordionContent className="space-y-3">
            {['13"', '14"', '15"', '16"', "60Hz", "120Hz", "144Hz", "240Hz"].map((display) => (
              <div key={display} className="flex items-center space-x-2">
                <Checkbox id={`display-${display}`} />
                <Label htmlFor={`display-${display}`} className="cursor-pointer text-sm font-normal">
                  {display}
                </Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>

        {/* Condition */}
        <AccordionItem value="condition">
          <AccordionTrigger>Estado</AccordionTrigger>
          <AccordionContent className="space-y-3">
            {["Novo", "Recondicionado"].map((condition) => (
              <div key={condition} className="flex items-center space-x-2">
                <Checkbox id={`condition-${condition}`} />
                <Label htmlFor={`condition-${condition}`} className="cursor-pointer text-sm font-normal">
                  {condition}
                </Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Button variant="outline" className="w-full bg-transparent">
        Limpar filtros
      </Button>
    </div>
  )
}
