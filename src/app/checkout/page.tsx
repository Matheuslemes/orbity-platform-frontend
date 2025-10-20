"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { mockProducts } from "@/lib/mock-datas"
import { CreditCard, Smartphone, Barcode, MapPin, Truck, Rocket, Check } from "lucide-react"

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedAddress, setSelectedAddress] = useState("1")
  const [selectedShipping, setSelectedShipping] = useState("express")
  const [paymentMethod, setPaymentMethod] = useState("card")

  const cartItems = [
    { product: mockProducts[0], quantity: 1 },
    { product: mockProducts[4], quantity: 2 },
  ]

  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price.current * item.quantity, 0)
  const discount = subtotal * 0.1
  const shipping = selectedShipping === "express" ? 0 : 0
  const total = subtotal - discount + shipping

  const steps = ["Endereço", "Entrega", "Pagamento", "Revisão"]

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Finalizar Compra</h1>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between max-w-3xl mx-auto">
            {steps.map((step, index) => (
              <div key={step} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                      index <= currentStep ? "glow-primary" : ""
                    }`}
                    style={{
                      backgroundColor: index <= currentStep ? "var(--primary)" : "var(--surface)",
                      color: index <= currentStep ? "var(--bg)" : "var(--muted)",
                    }}
                  >
                    {index < currentStep ? <Check className="h-5 w-5" /> : index + 1}
                  </div>
                  <span className="text-xs mt-2 text-center">{step}</span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className="h-0.5 flex-1 mx-2"
                    style={{ backgroundColor: index < currentStep ? "var(--primary)" : "var(--border)" }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs value={steps[currentStep]} className="w-full">
              <TabsList className="hidden">
                {steps.map((step) => (
                  <TabsTrigger key={step} value={step}>
                    {step}
                  </TabsTrigger>
                ))}
              </TabsList>

              {/* Address Step */}
              <TabsContent value="Endereço" className="space-y-4">
                <div
                  className="p-6 rounded-lg border"
                  style={{ backgroundColor: "var(--bg-elev)", borderColor: "var(--border)" }}
                >
                  <h2 className="text-xl font-bold mb-4">Endereço de Entrega</h2>
                  <RadioGroup value={selectedAddress} onValueChange={setSelectedAddress} className="space-y-3">
                    <div
                      className="flex items-start gap-3 p-4 rounded-lg border cursor-pointer"
                      style={{
                        backgroundColor: selectedAddress === "1" ? "var(--surface)" : "transparent",
                        borderColor: selectedAddress === "1" ? "var(--primary)" : "var(--border)",
                      }}
                    >
                      <RadioGroupItem value="1" id="address-1" />
                      <Label htmlFor="address-1" className="flex-1 cursor-pointer">
                        <p className="font-semibold mb-1">Casa</p>
                        <p className="text-sm text-muted-foreground">
                          Rua das Estrelas, 123
                          <br />
                          São Paulo, SP - 01234-567
                        </p>
                      </Label>
                    </div>
                    <div
                      className="flex items-start gap-3 p-4 rounded-lg border cursor-pointer"
                      style={{
                        backgroundColor: selectedAddress === "2" ? "var(--surface)" : "transparent",
                        borderColor: selectedAddress === "2" ? "var(--primary)" : "var(--border)",
                      }}
                    >
                      <RadioGroupItem value="2" id="address-2" />
                      <Label htmlFor="address-2" className="flex-1 cursor-pointer">
                        <p className="font-semibold mb-1">Trabalho</p>
                        <p className="text-sm text-muted-foreground">
                          Av. Paulista, 1000
                          <br />
                          São Paulo, SP - 01310-100
                        </p>
                      </Label>
                    </div>
                  </RadioGroup>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full mt-4 bg-transparent">
                        <MapPin className="mr-2 h-4 w-4" />
                        Adicionar novo endereço
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Novo Endereço</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 mt-4">
                        <div className="space-y-2">
                          <Label htmlFor="cep">CEP</Label>
                          <Input id="cep" placeholder="00000-000" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="street">Rua</Label>
                          <Input id="street" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="number">Número</Label>
                            <Input id="number" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="complement">Complemento</Label>
                            <Input id="complement" />
                          </div>
                        </div>
                        <Button className="w-full" style={{ backgroundColor: "var(--primary)", color: "var(--bg)" }}>
                          Salvar endereço
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
                <Button
                  onClick={() => setCurrentStep(1)}
                  size="lg"
                  className="w-full"
                  style={{ backgroundColor: "var(--primary)", color: "var(--bg)" }}
                >
                  Continuar para Entrega
                </Button>
              </TabsContent>

              {/* Shipping Step */}
              <TabsContent value="Entrega" className="space-y-4">
                <div
                  className="p-6 rounded-lg border"
                  style={{ backgroundColor: "var(--bg-elev)", borderColor: "var(--border)" }}
                >
                  <h2 className="text-xl font-bold mb-4">Método de Entrega</h2>
                  <RadioGroup value={selectedShipping} onValueChange={setSelectedShipping} className="space-y-3">
                    <div
                      className="flex items-center justify-between p-4 rounded-lg border cursor-pointer"
                      style={{
                        backgroundColor: selectedShipping === "express" ? "var(--surface)" : "transparent",
                        borderColor: selectedShipping === "express" ? "var(--primary)" : "var(--border)",
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value="express" id="shipping-express" />
                        <Label htmlFor="shipping-express" className="cursor-pointer">
                          <div className="flex items-center gap-2 mb-1">
                            <Rocket className="h-4 w-4" style={{ color: "var(--primary)" }} />
                            <span className="font-semibold">Entrega Expressa</span>
                          </div>
                          <p className="text-sm text-muted-foreground">Receba em até 24h</p>
                        </Label>
                      </div>
                      <span className="font-bold" style={{ color: "var(--success)" }}>
                        Grátis
                      </span>
                    </div>
                    <div
                      className="flex items-center justify-between p-4 rounded-lg border cursor-pointer"
                      style={{
                        backgroundColor: selectedShipping === "standard" ? "var(--surface)" : "transparent",
                        borderColor: selectedShipping === "standard" ? "var(--primary)" : "var(--border)",
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value="standard" id="shipping-standard" />
                        <Label htmlFor="shipping-standard" className="cursor-pointer">
                          <div className="flex items-center gap-2 mb-1">
                            <Truck className="h-4 w-4" />
                            <span className="font-semibold">Entrega Padrão</span>
                          </div>
                          <p className="text-sm text-muted-foreground">Receba em 3-5 dias úteis</p>
                        </Label>
                      </div>
                      <span className="font-bold" style={{ color: "var(--success)" }}>
                        Grátis
                      </span>
                    </div>
                  </RadioGroup>
                </div>
                <div className="flex gap-3">
                  <Button
                    onClick={() => setCurrentStep(0)}
                    variant="outline"
                    size="lg"
                    className="flex-1 bg-transparent"
                  >
                    Voltar
                  </Button>
                  <Button
                    onClick={() => setCurrentStep(2)}
                    size="lg"
                    className="flex-1"
                    style={{ backgroundColor: "var(--primary)", color: "var(--bg)" }}
                  >
                    Continuar para Pagamento
                  </Button>
                </div>
              </TabsContent>

              {/* Payment Step */}
              <TabsContent value="Pagamento" className="space-y-4">
                <div
                  className="p-6 rounded-lg border"
                  style={{ backgroundColor: "var(--bg-elev)", borderColor: "var(--border)" }}
                >
                  <h2 className="text-xl font-bold mb-4">Método de Pagamento</h2>
                  <Tabs value={paymentMethod} onValueChange={setPaymentMethod}>
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="card">
                        <CreditCard className="h-4 w-4 mr-2" />
                        Cartão
                      </TabsTrigger>
                      <TabsTrigger value="pix">
                        <Smartphone className="h-4 w-4 mr-2" />
                        Pix
                      </TabsTrigger>
                      <TabsTrigger value="boleto">
                        <Barcode className="h-4 w-4 mr-2" />
                        Boleto
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="card" className="space-y-4 mt-4">
                      <div className="space-y-2">
                        <Label htmlFor="card-number">Número do Cartão</Label>
                        <Input id="card-number" placeholder="0000 0000 0000 0000" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="card-name">Nome no Cartão</Label>
                        <Input id="card-name" placeholder="Nome como está no cartão" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="card-expiry">Validade</Label>
                          <Input id="card-expiry" placeholder="MM/AA" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="card-cvv">CVV</Label>
                          <Input id="card-cvv" placeholder="000" />
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="pix" className="mt-4">
                      <div
                        className="p-6 rounded-lg border text-center"
                        style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
                      >
                        <Smartphone className="h-12 w-12 mx-auto mb-4" style={{ color: "var(--primary)" }} />
                        <p className="text-sm text-muted-foreground">
                          Após finalizar o pedido, você receberá o QR Code para pagamento via Pix
                        </p>
                      </div>
                    </TabsContent>

                    <TabsContent value="boleto" className="mt-4">
                      <div
                        className="p-6 rounded-lg border text-center"
                        style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
                      >
                        <Barcode className="h-12 w-12 mx-auto mb-4" style={{ color: "var(--primary)" }} />
                        <p className="text-sm text-muted-foreground">
                          O boleto será gerado após a confirmação do pedido e enviado por e-mail
                        </p>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
                <div className="flex gap-3">
                  <Button
                    onClick={() => setCurrentStep(1)}
                    variant="outline"
                    size="lg"
                    className="flex-1 bg-transparent"
                  >
                    Voltar
                  </Button>
                  <Button
                    onClick={() => setCurrentStep(3)}
                    size="lg"
                    className="flex-1"
                    style={{ backgroundColor: "var(--primary)", color: "var(--bg)" }}
                  >
                    Revisar Pedido
                  </Button>
                </div>
              </TabsContent>

              {/* Review Step */}
              <TabsContent value="Revisão" className="space-y-4">
                <div
                  className="p-6 rounded-lg border space-y-6"
                  style={{ backgroundColor: "var(--bg-elev)", borderColor: "var(--border)" }}
                >
                  <div>
                    <h3 className="font-semibold mb-2">Endereço de Entrega</h3>
                    <p className="text-sm text-muted-foreground">
                      Rua das Estrelas, 123
                      <br />
                      São Paulo, SP - 01234-567
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Método de Entrega</h3>
                    <p className="text-sm text-muted-foreground">Entrega Expressa - Receba em até 24h</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Pagamento</h3>
                    <p className="text-sm text-muted-foreground">
                      {paymentMethod === "card" ? "Cartão de Crédito" : paymentMethod === "pix" ? "Pix" : "Boleto"}
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button
                    onClick={() => setCurrentStep(2)}
                    variant="outline"
                    size="lg"
                    className="flex-1 bg-transparent"
                  >
                    Voltar
                  </Button>
                  <Button
                    size="lg"
                    className="flex-1 glow-primary"
                    style={{ backgroundColor: "var(--primary)", color: "var(--bg)" }}
                  >
                    Finalizar Pedido
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div
              className="sticky top-20 p-6 rounded-lg border space-y-6"
              style={{ backgroundColor: "var(--bg-elev)", borderColor: "var(--border)" }}
            >
              <h2 className="text-xl font-bold">Resumo do Pedido</h2>

              {/* Items */}
              <div className="space-y-3">
                {cartItems.map((item) => (
                  <div key={item.product.id} className="flex gap-3">
                    <div className="relative w-16 h-16 flex-shrink-0 rounded-md overflow-hidden">
                      <Image
                        src={item.product.images[0] || "/placeholder.svg"}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium line-clamp-2">{item.product.name}</p>
                      <p className="text-xs text-muted-foreground">Qtd: {item.quantity}</p>
                    </div>
                    <span className="text-sm font-semibold tabular-nums">
                      R$ {(item.product.price.current * item.quantity).toFixed(2).replace(".", ",")}
                    </span>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-3 pt-4 border-t" style={{ borderColor: "var(--border)" }}>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="tabular-nums">R$ {subtotal.toFixed(2).replace(".", ",")}</span>
                </div>
                <div className="flex justify-between text-sm" style={{ color: "var(--success)" }}>
                  <span>Desconto</span>
                  <span className="tabular-nums">-R$ {discount.toFixed(2).replace(".", ",")}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Frete</span>
                  <span className="tabular-nums" style={{ color: "var(--success)" }}>
                    Grátis
                  </span>
                </div>
                <div
                  className="flex justify-between text-lg font-bold pt-3 border-t"
                  style={{ borderColor: "var(--border)" }}
                >
                  <span>Total</span>
                  <span className="tabular-nums" style={{ color: "var(--primary)" }}>
                    R$ {total.toFixed(2).replace(".", ",")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
