// Mock data for Orbity Tech Storefront

export interface Product {
  id: string
  slug: string
  name: string
  brand: string
  images: string[]
  highlights: string[]
  price: {
    current: number
    original?: number
  }
  rating: {
    average: number
    count: number
  }
  badges: ("NEW" | "SALE" | "REFURB" | "LIMITED")[]
  specs: {
    cpu?: string
    gpu?: string
    ram?: string
    storage?: string
    display?: string
    ports?: string[]
    wireless?: string[]
    battery?: string
    weight?: string
    os?: string
  }
  category: string
}

export interface Order {
  id: string
  date: string
  status: "confirmed" | "processing" | "shipped" | "delivered"
  total: number
  items: {
    product: Product
    quantity: number
    price: number
  }[]
  address: {
    street: string
    city: string
    state: string
    zip: string
  }
  payment: {
    method: string
    last4?: string
  }
  timeline: {
    status: string
    date: string
    completed: boolean
  }[]
}

export const mockProducts: Product[] = [
  {
    id: "1",
    slug: "laptop-creator-pro-14",
    name: 'Creator Pro 14" - Laptop Premium para Criadores',
    brand: "TechNova",
    images: ["/modern-laptop-with-sleek-design.jpg", "/laptop-side-view.jpg", "/laptop-keyboard-closeup.jpg"],
    highlights: ["Intel i7-1360P", "16GB DDR5", "RTX 4050", "512GB NVMe", '14" 120Hz', "TB4"],
    price: {
      current: 7499.9,
      original: 8999.9,
    },
    rating: {
      average: 4.6,
      count: 128,
    },
    badges: ["NEW", "SALE"],
    specs: {
      cpu: "Intel Core i7-1360P (12 núcleos, até 5.0GHz)",
      gpu: "NVIDIA RTX 4050 6GB GDDR6",
      ram: "16GB DDR5 5200MHz (expansível até 32GB)",
      storage: "512GB NVMe PCIe 4.0 SSD",
      display: '14" 1920×1200 IPS 120Hz, 100% sRGB',
      ports: ["2× USB-C Thunderbolt 4", "USB-A 3.2", "HDMI 2.1", "Audio 3.5mm"],
      wireless: ["Wi-Fi 6E", "Bluetooth 5.3"],
      battery: "70Wh (até 10h de uso)",
      weight: "1.35kg",
      os: "Windows 11 Pro",
    },
    category: "Laptops",
  },
  {
    id: "2",
    slug: "gaming-beast-rtx-4070",
    name: "Gaming Beast RTX 4070 - Desktop Gamer Extremo",
    brand: "PowerRig",
    images: ["/gaming-desktop-pc-with-rgb-lights.jpg", "/gaming-pc-interior-components.jpg"],
    highlights: ["Ryzen 7 7800X3D", "32GB DDR5", "RTX 4070 12GB", "1TB NVMe Gen4", "RGB Sync"],
    price: {
      current: 9999.9,
    },
    rating: {
      average: 4.8,
      count: 89,
    },
    badges: ["NEW"],
    specs: {
      cpu: "AMD Ryzen 7 7800X3D (8 núcleos, até 5.0GHz)",
      gpu: "NVIDIA RTX 4070 12GB GDDR6X",
      ram: "32GB DDR5 6000MHz (2×16GB)",
      storage: "1TB NVMe PCIe Gen4 SSD",
      os: "Windows 11 Home",
    },
    category: "Desktops",
  },
  {
    id: "3",
    slug: "ultrabook-slim-13",
    name: 'Ultrabook Slim 13" - Portabilidade Máxima',
    brand: "AeroTech",
    images: ["/thin-ultrabook-laptop-silver.jpg", "/ultrabook-profile-view.jpg"],
    highlights: ["Intel i5-1335U", "16GB LPDDR5", "512GB NVMe", '13.3" OLED', "980g"],
    price: {
      current: 5499.9,
      original: 6299.9,
    },
    rating: {
      average: 4.5,
      count: 203,
    },
    badges: ["SALE"],
    specs: {
      cpu: "Intel Core i5-1335U (10 núcleos, até 4.6GHz)",
      ram: "16GB LPDDR5 (soldada)",
      storage: "512GB NVMe PCIe 4.0 SSD",
      display: '13.3" 2560×1600 OLED 60Hz, 100% DCI-P3',
      ports: ["2× USB-C TB4", "Audio 3.5mm"],
      wireless: ["Wi-Fi 6E", "Bluetooth 5.2"],
      battery: "54Wh (até 12h de uso)",
      weight: "980g",
      os: "Windows 11 Home",
    },
    category: "Laptops",
  },
  {
    id: "4",
    slug: "monitor-4k-27-144hz",
    name: 'Monitor 4K 27" 144Hz - Gaming & Criação',
    brand: "ViewMax",
    images: ["/4k-gaming-monitor-with-thin-bezels.jpg"],
    highlights: ['27" 4K IPS', "144Hz", "HDR400", "1ms", "USB-C 65W"],
    price: {
      current: 2799.9,
    },
    rating: {
      average: 4.7,
      count: 156,
    },
    badges: ["NEW"],
    specs: {
      display: '27" 3840×2160 IPS 144Hz, HDR400, 99% Adobe RGB',
      ports: ["HDMI 2.1", "DisplayPort 1.4", "USB-C 65W", "4× USB-A Hub"],
    },
    category: "Monitores",
  },
  {
    id: "5",
    slug: "mechanical-keyboard-rgb",
    name: "Teclado Mecânico RGB - Switch Tátil",
    brand: "KeyMaster",
    images: ["/mechanical-keyboard-with-rgb-backlight.jpg"],
    highlights: ["Switch Tátil", "RGB Per-Key", "Hot-Swap", "USB-C", "Alumínio"],
    price: {
      current: 699.9,
      original: 899.9,
    },
    rating: {
      average: 4.6,
      count: 412,
    },
    badges: ["SALE"],
    specs: {},
    category: "Periféricos",
  },
  {
    id: "6",
    slug: "wireless-mouse-pro",
    name: "Mouse Wireless Pro - Sensor 26K DPI",
    brand: "ClickPro",
    images: ["/wireless-gaming-mouse-black.jpg"],
    highlights: ["26K DPI", "Wireless 2.4GHz", "80h Bateria", "8 Botões", "59g"],
    price: {
      current: 449.9,
    },
    rating: {
      average: 4.8,
      count: 324,
    },
    badges: ["NEW"],
    specs: {},
    category: "Periféricos",
  },
  {
    id: "7",
    slug: "ssd-nvme-2tb-gen4",
    name: "SSD NVMe 2TB Gen4 - 7400MB/s",
    brand: "SpeedDrive",
    images: ["/nvme-ssd-with-heatsink.jpg"],
    highlights: ["2TB", "PCIe Gen4", "7400MB/s leitura", "6800MB/s escrita", "Heatsink"],
    price: {
      current: 899.9,
      original: 1199.9,
    },
    rating: {
      average: 4.7,
      count: 267,
    },
    badges: ["SALE"],
    specs: {
      storage: "2TB NVMe PCIe Gen4 x4",
    },
    category: "Componentes",
  },
  {
    id: "8",
    slug: "headset-wireless-anc",
    name: "Headset Wireless ANC - Audio Premium",
    brand: "SoundWave",
    images: ["/noise-cancelling-headphones.png"],
    highlights: ["ANC Ativo", "Bluetooth 5.3", "40h Bateria", "Hi-Res Audio", "USB-C"],
    price: {
      current: 1299.9,
    },
    rating: {
      average: 4.5,
      count: 189,
    },
    badges: ["NEW"],
    specs: {},
    category: "Áudio",
  },
]

export const mockOrders: Order[] = [
  {
    id: "ORB-2025-001234",
    date: "2025-01-08",
    status: "shipped",
    total: 7499.9,
    items: [
      {
        product: mockProducts[0],
        quantity: 1,
        price: 7499.9,
      },
    ],
    address: {
      street: "Rua das Estrelas, 123",
      city: "São Paulo",
      state: "SP",
      zip: "01234-567",
    },
    payment: {
      method: "Cartão de Crédito",
      last4: "4242",
    },
    timeline: [
      { status: "Pedido confirmado", date: "2025-01-08 14:30", completed: true },
      { status: "Em separação", date: "2025-01-08 16:45", completed: true },
      { status: "Enviado", date: "2025-01-09 09:20", completed: true },
      { status: "Em trânsito", date: "2025-01-09 14:00", completed: false },
      { status: "Entregue", date: "", completed: false },
    ],
  },
]

export const categories = [
  { name: "Laptops", icon: "Laptop", slug: "laptops" },
  { name: "Desktops", icon: "Pc", slug: "desktops" },
  { name: "Smartphones", icon: "Smartphone", slug: "smartphones" },
  { name: "Áudio", icon: "Headphones", slug: "audio" },
  { name: "Periféricos", icon: "Keyboard", slug: "perifericos" },
  { name: "Componentes", icon: "Cpu", slug: "componentes" },
  { name: "Monitores", icon: "Monitor", slug: "monitores" },
  { name: "Redes", icon: "Wifi", slug: "redes" },
]
