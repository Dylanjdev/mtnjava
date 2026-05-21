import { useEffect, useEffectEvent, useMemo, useRef, useState } from 'react'
import logo from './assets/logo.png'
import coffeeBeans from './assets/CoffeeBeans.png'
import coffeeSound from './assets/coffee.mp3'
import menuBackground from './assets/menubackground.webp'
import coffeeBeanVideo from './assets/coffebeanvid.mp4'
import './App.css'

const FLAVOR_PRICE = 0
const DEFAULT_SQUARE_MENU_ENDPOINT = 'http://localhost:8787/api/square/menu'
const DEFAULT_BACKEND_ORIGIN = 'http://localhost:8787'
const VA_STATE_TAX_RATE = 0.053
const SCOTT_COUNTY_TAX_RATE = 0.06
const ADMIN_AUDIO_STORAGE_KEY = 'mtnjava-admin-audio-src'
const ADMIN_AUDIO_LABEL_STORAGE_KEY = 'mtnjava-admin-audio-label'
const ADMIN_AUDIO_VOLUME_STORAGE_KEY = 'mtnjava-admin-audio-volume'

const getBackendOrigin = () => {
  const configuredEndpoint =
    import.meta.env.VITE_SQUARE_CHECKOUT_ENDPOINT ||
    import.meta.env.VITE_SQUARE_MENU_ENDPOINT ||
    DEFAULT_SQUARE_MENU_ENDPOINT

  try {
    return new URL(configuredEndpoint).origin
  } catch {
    return DEFAULT_BACKEND_ORIGIN
  }
}

const BACKEND_ORIGIN = getBackendOrigin()
const DEFAULT_ADMIN_ORDERS_ENDPOINT = `${BACKEND_ORIGIN}/api/admin/orders`
const DEFAULT_ADMIN_ORDER_STREAM_ENDPOINT = `${BACKEND_ORIGIN}/api/admin/orders/stream`
const DEFAULT_ADMIN_ORDER_TEST_ENDPOINT = `${BACKEND_ORIGIN}/api/admin/orders/test`

const regularFlavors = [
  'White Chocolate',
  'Caramel',
  'Vanilla',
  'Brown Sugar Cinnamon',
  'French Vanilla',
  'Mocha',
  'Lavender',
  'Peanut Butter',
  'Mint',
  'Apple',
  'Butter Pecan',
  'Shortbread',
  'Salted Caramel',
  'English Toffee',
  'Hazelnut',
  'Coconut',
  'Peppermint',
  'Irish Cream',
  'Toasted Marshmallow',
]

const sugarFreeFlavors = [
  'White Chocolate',
  'Irish Cream',
  'Peanut Butter',
  'French Vanilla',
  'Caramel',
  'Hazelnut',
  'Chocolate',
  'Lavender',
  'Smores',
  'Cinnamon Vanilla',
]

const fallbackMenuItems = [
  {
    id: 'hot-coffee',
    name: 'Coffee',
    category: 'Hot Coffee',
    sizes: [
      { label: '12oz', price: 2.95 },
      { label: '16oz', price: 3.25 },
      { label: '20oz', price: 3.55 },
    ],
  },
  {
    id: 'hot-latte',
    name: 'Latte',
    category: 'Hot Coffee',
    sizes: [
      { label: '12oz', price: 4.55 },
      { label: '16oz', price: 4.85 },
      { label: '20oz', price: 5.15 },
    ],
  },
  {
    id: 'hot-chai',
    name: 'Chai Latte',
    category: 'Hot Coffee',
    sizes: [
      { label: '12oz', price: 4.55 },
      { label: '16oz', price: 4.85 },
      { label: '20oz', price: 5.15 },
    ],
  },
  {
    id: 'hot-dirty-chai',
    name: 'Dirty Chai',
    category: 'Hot Coffee',
    sizes: [
      { label: '12oz', price: 4.85 },
      { label: '16oz', price: 5.15 },
      { label: '20oz', price: 5.45 },
    ],
  },
  {
    id: 'hot-cappuccino',
    name: 'Cappuccino',
    category: 'Hot Coffee',
    sizes: [
      { label: '12oz', price: 4.55 },
      { label: '16oz', price: 4.85 },
      { label: '20oz', price: 5.15 },
    ],
  },
  {
    id: 'hot-macchiato',
    name: 'Macchiato',
    category: 'Hot Coffee',
    sizes: [
      { label: '12oz', price: 4.55 },
      { label: '16oz', price: 4.85 },
      { label: '20oz', price: 5.15 },
    ],
  },
  {
    id: 'iced-coffee',
    name: 'Iced Coffee',
    category: 'Iced Coffee',
    sizes: [
      { label: '16oz', price: 3.25 },
      { label: '20oz', price: 3.55 },
      { label: '24oz', price: 3.85 },
    ],
  },
  {
    id: 'iced-latte',
    name: 'Iced Latte',
    category: 'Iced Coffee',
    sizes: [
      { label: '16oz', price: 5.25 },
      { label: '20oz', price: 5.55 },
      { label: '24oz', price: 5.85 },
    ],
  },
  {
    id: 'iced-cappuccino',
    name: 'Iced Cappuccino',
    category: 'Iced Coffee',
    sizes: [
      { label: '16oz', price: 5.25 },
      { label: '20oz', price: 5.55 },
      { label: '24oz', price: 5.85 },
    ],
  },
  {
    id: 'iced-macchiato',
    name: 'Macchiato',
    category: 'Iced Coffee',
    sizes: [
      { label: '16oz', price: 5.25 },
      { label: '20oz', price: 5.55 },
      { label: '24oz', price: 5.85 },
    ],
  },
  {
    id: 'hot-tea',
    name: 'Hot Tea',
    category: 'Non Coffee',
    sizes: [
      { label: '16oz', price: 3.25 },
      { label: '20oz', price: 3.55 },
      { label: '24oz', price: 3.85 },
    ],
  },
  {
    id: 'hot-chocolate',
    name: 'Hot Chocolate',
    category: 'Non Coffee',
    sizes: [
      { label: '16oz', price: 3.55 },
      { label: '20oz', price: 3.85 },
      { label: '24oz', price: 4.15 },
    ],
  },
  {
    id: 'matcha',
    name: 'Matcha',
    category: 'Non Coffee',
    sizes: [
      { label: '16oz', price: 4.85 },
      { label: '20oz', price: 5.15 },
      { label: '24oz', price: 5.45 },
    ],
  },
  {
    id: 'energy-drink',
    name: 'Energy Drink',
    category: 'Energy',
    sizes: [{ label: '16oz', price: 4.95 }],
  },
  {
    id: 'lemonade',
    name: 'Lemonade',
    category: 'Lemonade',
    sizes: [
      { label: '16oz', price: 3.95 },
      { label: '20oz', price: 4.25 },
      { label: '24oz', price: 4.55 },
    ],
  },
]

const ORDER_CATEGORY_DISPLAY = ['Most Popular', 'Hot Drinks', 'Cold Drinks', 'Non coffee']

const CATEGORY_ALIASES = {
  'Hot Coffee': 'Hot Drinks',
  'Hot Drinks': 'Hot Drinks',
  'Iced Coffee': 'Cold Drinks',
  'Cold Drinks': 'Cold Drinks',
  'Non Coffee': 'Non coffee',
  'Non coffee': 'Non coffee',
}

const MOST_POPULAR_ITEM_ORDER = ['Iced Latte', 'Iced Americano', 'Kick Starter', 'Coffee']

const CATEGORY_ITEM_ORDER = {
  'Hot Drinks': ['Coffee', 'Latte', 'Americano', 'Cappuccino', 'Espresso', 'Mocha'],
  'Cold Drinks': ['Iced Coffee', 'Iced Latte', 'Iced Americano', 'Iced Mocha', 'Macchiato'],
}

const normalizeCategoryName = (category) => CATEGORY_ALIASES[category] || category

const sortItemsByPreferredOrder = (items, preferredOrder) => {
  if (!Array.isArray(preferredOrder) || preferredOrder.length === 0) {
    return items
  }

  const orderMap = new Map(preferredOrder.map((name, index) => [name.toLowerCase(), index]))

  return [...items].sort((a, b) => {
    const aIndex = orderMap.get(a.name.toLowerCase())
    const bIndex = orderMap.get(b.name.toLowerCase())

    if (aIndex !== undefined && bIndex !== undefined) {
      return aIndex - bIndex
    }

    if (aIndex !== undefined) {
      return -1
    }

    if (bIndex !== undefined) {
      return 1
    }

    return a.name.localeCompare(b.name)
  })
}

const formatPrice = (value) => `$${value.toFixed(2)}`

const formatPriceRange = (sizes) => {
  if (!Array.isArray(sizes) || sizes.length === 0) {
    return ''
  }

  const values = sizes.map((size) => size.price)
  const minimum = Math.min(...values)
  const maximum = Math.max(...values)

  if (minimum === maximum) {
    return formatPrice(minimum)
  }

  return `${formatPrice(minimum)} - ${formatPrice(maximum)}`
}

const toCents = (value) => Math.round(value * 100)

const formatTimestamp = (value) => {
  if (!value) {
    return 'Just now'
  }

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(value))
}

function AdminDashboard() {
  const [orders, setOrders] = useState([])
  const [streamState, setStreamState] = useState('connecting')
  const [soundSource, setSoundSource] = useState(() => localStorage.getItem(ADMIN_AUDIO_STORAGE_KEY) || coffeeSound)
  const [soundLabel, setSoundLabel] = useState(() => {
    return localStorage.getItem(ADMIN_AUDIO_LABEL_STORAGE_KEY) || 'Coffee alert'
  })
  const [soundVolume, setSoundVolume] = useState(() => {
    const storedValue = Number(localStorage.getItem(ADMIN_AUDIO_VOLUME_STORAGE_KEY) || '1')
    return Number.isFinite(storedValue) ? Math.min(1, Math.max(0, storedValue)) : 1
  })
  const [alertsArmed, setAlertsArmed] = useState(false)
  const [adminMessage, setAdminMessage] = useState('Choose a sound, then click Enable Alerts.')
  const seenEventIdsRef = useRef(new Set())

  const playSoundSequence = useEffectEvent(async (repeatCount = 1) => {
    if (!soundSource) {
      setAdminMessage('Choose a sound file or paste a sound URL first.')
      return false
    }

    try {
      for (let index = 0; index < repeatCount; index += 1) {
        const audio = new Audio(soundSource)
        audio.volume = soundVolume
        await audio.play()
        await new Promise((resolve) => {
          audio.addEventListener('ended', resolve, { once: true })
          audio.addEventListener('error', resolve, { once: true })
        })
      }

      return true
    } catch {
      setAdminMessage('Audio was blocked by the browser. Click Enable Alerts again after interacting with the page.')
      return false
    }
  })

  const handleIncomingOrder = useEffectEvent(async (event) => {
    if (!event?.id || seenEventIdsRef.current.has(event.id)) {
      return
    }

    seenEventIdsRef.current.add(event.id)
    setOrders((current) => [event, ...current].slice(0, 25))

    if (!alertsArmed) {
      setAdminMessage(`New order ${event.orderRef || event.id} received. Click Enable Alerts to allow sound.`)
      return
    }

    const played = await playSoundSequence(1)
    if (played) {
      setAdminMessage(`Alert played once for order ${event.orderRef || event.id}.`)
    }
  })

  useEffect(() => {
    localStorage.setItem(ADMIN_AUDIO_STORAGE_KEY, soundSource)
    localStorage.setItem(ADMIN_AUDIO_LABEL_STORAGE_KEY, soundLabel)
    localStorage.setItem(ADMIN_AUDIO_VOLUME_STORAGE_KEY, String(soundVolume))
  }, [soundLabel, soundSource, soundVolume])

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const response = await fetch(DEFAULT_ADMIN_ORDERS_ENDPOINT)
        const data = await response.json()
        const items = Array.isArray(data?.items) ? data.items : []
        setOrders(items)
        items.forEach((item) => seenEventIdsRef.current.add(item.id))
      } catch {
        setAdminMessage('Could not load admin order history from the backend.')
      }
    }

    loadOrders()
  }, [])

  useEffect(() => {
    const eventSource = new EventSource(DEFAULT_ADMIN_ORDER_STREAM_ENDPOINT)

    const handleSnapshot = (event) => {
      setStreamState('connected')
      const data = JSON.parse(event.data)
      const items = Array.isArray(data?.items) ? data.items : []
      setOrders(items)
      items.forEach((item) => seenEventIdsRef.current.add(item.id))
    }

    const handleOrder = (event) => {
      setStreamState('connected')
      handleIncomingOrder(JSON.parse(event.data))
    }

    eventSource.addEventListener('snapshot', handleSnapshot)
    eventSource.addEventListener('order', handleOrder)
    eventSource.onerror = () => {
      setStreamState('reconnecting')
    }

    return () => {
      eventSource.removeEventListener('snapshot', handleSnapshot)
      eventSource.removeEventListener('order', handleOrder)
      eventSource.close()
    }
  }, [handleIncomingOrder])

  const handleSoundFileChange = (event) => {
    const file = event.target.files?.[0]
    if (!file) {
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setSoundSource(reader.result)
        setSoundLabel(file.name)
        setAdminMessage(`Loaded sound file ${file.name}.`) 
      }
    }
    reader.readAsDataURL(file)
  }

  const handleEnableAlerts = async () => {
    setAlertsArmed(true)
    const played = await playSoundSequence(1)
    if (played) {
      setAdminMessage('Alerts enabled. New orders will play your selected sound once.')
    }
  }

  const handlePreviewAlert = async () => {
    await playSoundSequence(1)
  }

  const handleUseDefaultSound = () => {
    setSoundSource(coffeeSound)
    setSoundLabel('Coffee alert')
  }

  const handleTestAlert = async () => {
    try {
      const response = await fetch(DEFAULT_ADMIN_ORDER_TEST_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      })

      if (!response.ok) {
        throw new Error('Test alert failed.')
      }

      if (!alertsArmed) {
        setAdminMessage('Test order sent. Alerts are not enabled, but a test sound is playing once now.')
      } else {
        setAdminMessage('Test order sent. The admin sound should play once.')
      }

      await playSoundSequence(1)
    } catch {
      setAdminMessage('Could not trigger a test order from the backend.')
    }
  }

  return (
    <div className="site admin-site">
      <header className="hero admin-hero">
        <nav className="topbar">
          <a className="brand" href={window.location.pathname}>
            <img src={logo} alt="Mountain Java Coffee Co." className="brand-logo" />
            <div>
              <p className="brand-name">Mountain Java Coffee Co.</p>
              <p className="brand-subtitle">Admin Alerts</p>
            </div>
          </a>
          <div className="nav-links is-open admin-nav-links">
            <a href={window.location.pathname}>Storefront</a>
          </div>
        </nav>

        <div className="hero-content admin-hero-content">
          <p className="eyebrow">Live Order Monitor</p>
          <h1>Admin Menu</h1>
          <p className="hero-text">
            Pick any sound file or URL, arm alerts once, and this screen will play it once whenever a new order notification arrives.
          </p>
        </div>
      </header>

      <main>
        <section className="section admin-section">
          <div className="admin-shell">
            <article className="order-panel admin-panel">
              <p className="menu-kicker">Alert Sound</p>
              <h2>Incoming Order Audio</h2>
              <p className="order-intro-copy">
                Stream: <strong>{streamState}</strong>
              </p>

              <div className="admin-config-grid">
                <label>
                  Sound URL
                  <input
                    value={soundSource.startsWith('data:') ? '' : soundSource}
                    onChange={(event) => {
                      setSoundSource(event.target.value)
                      setSoundLabel(event.target.value ? 'Custom URL' : '')
                    }}
                    placeholder="https://example.com/order-alert.mp3"
                  />
                </label>

                <label>
                  Upload audio file
                  <input type="file" accept="audio/*" onChange={handleSoundFileChange} />
                </label>

                <label>
                  Volume
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={soundVolume}
                    onChange={(event) => setSoundVolume(Number(event.target.value))}
                  />
                </label>
              </div>

              <p className="admin-sound-label">
                Current sound: {soundLabel || (soundSource ? 'Custom URL' : 'None selected')}
              </p>

              <div className="admin-action-row">
                <button type="button" className="cta" onClick={handleEnableAlerts}>
                  Enable Alerts
                </button>
                <button type="button" className="customize-cancel" onClick={handleUseDefaultSound}>
                  Use Coffee Alert
                </button>
                <button type="button" className="customize-cancel" onClick={handlePreviewAlert}>
                  Preview Sound
                </button>
                <button type="button" className="customize-cancel" onClick={handleTestAlert}>
                  Send Test Order
                </button>
              </div>

              <p className={`checkout-message ${alertsArmed ? 'success' : 'loading'}`}>{adminMessage}</p>
            </article>

            <article className="order-panel admin-panel">
              <p className="menu-kicker">Recent Orders</p>
              <h2>Live Queue</h2>

              {orders.length === 0 ? (
                <p className="empty-cart">No order notifications yet.</p>
              ) : (
                <div className="admin-order-list">
                  {orders.map((order) => (
                    <article key={order.id} className="admin-order-card">
                      <div className="admin-order-header">
                        <div>
                          <h3>Order {order.orderRef || order.id}</h3>
                          <p className="cart-meta">{formatTimestamp(order.createdAt)} • {order.status}</p>
                        </div>
                        <p className="admin-order-total">{formatPrice(order.totals?.total || 0)}</p>
                      </div>

                      <p className="cart-meta">
                        Pickup: {order.pickupTime || 'ASAP'}
                        {order.customer?.name ? ` • ${order.customer.name}` : ''}
                        {order.customer?.phone ? ` • ${order.customer.phone}` : ''}
                      </p>

                      <ul className="admin-order-items">
                        {order.items.map((item, index) => (
                          <li key={`${order.id}-${index}`}>
                            <span>
                              {item.quantity}x {item.name}
                              {item.size ? ` (${item.size})` : ''}
                            </span>
                            <span>{formatPrice(item.lineTotal || 0)}</span>
                          </li>
                        ))}
                      </ul>

                      {order.note ? <p className="cart-meta">Note: {order.note}</p> : null}
                    </article>
                  ))}
                </div>
              )}
            </article>
          </div>
        </section>
      </main>
    </div>
  )
}

function App() {
  const [isAdminMode] = useState(() => new URLSearchParams(window.location.search).get('admin') === '1')
  const contactVideoRef = useRef(null)
  const [squareMenuItems, setSquareMenuItems] = useState([])
  const [menuSource, setMenuSource] = useState('local')
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [mobileCartOpen, setMobileCartOpen] = useState(false)
  const [activeOrderCategory, setActiveOrderCategory] = useState('Most Popular')
  const [selectedSizesByItem, setSelectedSizesByItem] = useState({})
  const [customizingItem, setCustomizingItem] = useState(null)
  const [customizingSizeLabel, setCustomizingSizeLabel] = useState('')
  const [customizingQuantity, setCustomizingQuantity] = useState(1)
  const [customRegularFlavors, setCustomRegularFlavors] = useState([])
  const [customSugarFreeFlavors, setCustomSugarFreeFlavors] = useState([])
  const [customNotes, setCustomNotes] = useState('')
  const [customerName, setCustomerName] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  const [pickupTime, setPickupTime] = useState('ASAP')
  const [cart, setCart] = useState([])
  const [checkoutState, setCheckoutState] = useState('idle')
  const [checkoutMessage, setCheckoutMessage] = useState('')
  const isOverlayOpen = Boolean(customizingItem) || mobileCartOpen

  if (isAdminMode) {
    return <AdminDashboard />
  }

  const activeMenuItems = useMemo(() => {
    const sourceItems = squareMenuItems.length > 0 ? squareMenuItems : fallbackMenuItems

    return sourceItems.map((item) => {
      const normalizedCategory = normalizeCategoryName(item.category)
      return {
        ...item,
        category: normalizedCategory,
      }
    })
  }, [squareMenuItems])

  const mostPopularItems = useMemo(() => {
    const orderedPicks = sortItemsByPreferredOrder(activeMenuItems, MOST_POPULAR_ITEM_ORDER)
    return orderedPicks.slice(0, 4)
  }, [activeMenuItems])

  const menuByCategory = useMemo(() => {
    const grouped = new Map()
    for (const item of activeMenuItems) {
      if (!grouped.has(item.category)) {
        grouped.set(item.category, [])
      }
      grouped.get(item.category).push(item)
    }
    return grouped
  }, [activeMenuItems])

  const orderCategories = useMemo(() => {
    const categories = [{ name: 'Most Popular', items: mostPopularItems }]

    for (const name of ORDER_CATEGORY_DISPLAY) {
      if (name === 'Most Popular') continue
      const items = sortItemsByPreferredOrder(
        menuByCategory.get(name) || [],
        CATEGORY_ITEM_ORDER[name] || [],
      )
      if (items.length > 0) {
        categories.push({ name, items })
      }
    }

    return categories.filter((category) => category.items.length > 0)
  }, [menuByCategory, mostPopularItems])

  const selectedOrderCategory = useMemo(
    () =>
      orderCategories.find((category) => category.name === activeOrderCategory) ||
      orderCategories[0],
    [activeOrderCategory, orderCategories],
  )

  useEffect(() => {
    if (!selectedOrderCategory && orderCategories.length > 0) {
      setActiveOrderCategory(orderCategories[0].name)
      return
    }

    if (!orderCategories.some((category) => category.name === activeOrderCategory)) {
      setActiveOrderCategory(orderCategories[0]?.name || 'Most Popular')
    }
  }, [activeOrderCategory, orderCategories, selectedOrderCategory])

  useEffect(() => {
    const menuEndpoint = import.meta.env.VITE_SQUARE_MENU_ENDPOINT || DEFAULT_SQUARE_MENU_ENDPOINT

    const loadSquareMenu = async () => {
      try {
        const response = await fetch(menuEndpoint)
        const data = await response.json()
        if (!response.ok) {
          throw new Error(data?.message || 'Failed to load Square menu.')
        }

        if (Array.isArray(data?.items) && data.items.length > 0) {
          setSquareMenuItems(data.items)
          setMenuSource('square')
        }
      } catch {
        setMenuSource('local')
      }
    }

    loadSquareMenu()
  }, [])

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)
    const checkoutStatus = searchParams.get('checkout')

    if (!checkoutStatus) {
      return
    }

    if (checkoutStatus === 'cancelled') {
      setCheckoutState('error')
      setCheckoutMessage('Checkout was cancelled.')
      return
    }

    if (checkoutStatus === 'success') {
      setCheckoutState('success')
      setCheckoutMessage('Payment completed. Confirmed paid alerts will come from Square webhook delivery.')
    }
  }, [])

  const cartSubtotal = useMemo(
    () => cart.reduce((runningTotal, item) => runningTotal + item.lineTotal, 0),
    [cart],
  )

  const stateTax = useMemo(() => cartSubtotal * VA_STATE_TAX_RATE, [cartSubtotal])

  const countyTax = useMemo(() => cartSubtotal * SCOTT_COUNTY_TAX_RATE, [cartSubtotal])

  const cartTax = useMemo(() => stateTax + countyTax, [stateTax, countyTax])

  const cartTotal = useMemo(() => cartSubtotal + cartTax, [cartSubtotal, cartTax])

  const cartItemCount = useMemo(
    () => cart.reduce((runningTotal, item) => runningTotal + item.quantity, 0),
    [cart],
  )

  const customDrinkTotal = useMemo(() => {
    if (!customizingItem) {
      return 0
    }

    const size =
      customizingItem.sizes.find((itemSize) => itemSize.label === customizingSizeLabel) ||
      customizingItem.sizes[0]
    const flavorCount = customRegularFlavors.length + customSugarFreeFlavors.length
    const unitPrice = size.price + flavorCount * FLAVOR_PRICE

    return unitPrice * customizingQuantity
  }, [
    customRegularFlavors,
    customSugarFreeFlavors,
    customizingItem,
    customizingQuantity,
    customizingSizeLabel,
  ])

  useEffect(() => {
    const video = contactVideoRef.current
    if (!video) return

    video.muted = true
    video.setAttribute('muted', '')
    video.setAttribute('playsinline', '')
    video.setAttribute('webkit-playsinline', '')

    const tryPlay = () => {
      const playPromise = video.play()
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(() => {})
      }
    }

    const handleLoadedMetadata = () => {
      tryPlay()
    }

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        tryPlay()
      }
    }

    const handleTouchStart = () => {
      tryPlay()
    }

    video.addEventListener('loadedmetadata', handleLoadedMetadata)
    document.addEventListener('visibilitychange', handleVisibilityChange)
    document.addEventListener('touchstart', handleTouchStart, { passive: true })

    tryPlay()

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      document.removeEventListener('touchstart', handleTouchStart)
    }
  }, [])

  const setItemSize = (itemId, sizeLabel) => {
    setSelectedSizesByItem((current) => ({
      ...current,
      [itemId]: sizeLabel,
    }))
  }

  const toggleCustomFlavor = (flavor, type) => {
    if (type === 'regular') {
      setCustomRegularFlavors((current) =>
        current.includes(flavor)
          ? current.filter((item) => item !== flavor)
          : [...current, flavor],
      )
      return
    }

    setCustomSugarFreeFlavors((current) =>
      current.includes(flavor)
        ? current.filter((item) => item !== flavor)
        : [...current, flavor],
    )
  }

  const startCustomizeItem = (item) => {
    const selectedSizeLabel = selectedSizesByItem[item.id] || item.sizes[0].label
    setCustomizingItem(item)
    setCustomizingSizeLabel(selectedSizeLabel)
    setCustomizingQuantity(1)
    setCustomRegularFlavors([])
    setCustomSugarFreeFlavors([])
    setCustomNotes('')
  }

  const closeCustomizeModal = () => {
    setCustomizingItem(null)
    setCustomizingSizeLabel('')
    setCustomizingQuantity(1)
    setCustomRegularFlavors([])
    setCustomSugarFreeFlavors([])
    setCustomNotes('')
  }

  const confirmAddToCart = () => {
    if (!customizingItem) return

    const selectedSize =
      customizingItem.sizes.find((size) => size.label === customizingSizeLabel) ||
      customizingItem.sizes[0]
    const quantity = Math.max(1, customizingQuantity)
    const flavorCount = customRegularFlavors.length + customSugarFreeFlavors.length
    const unitPrice = selectedSize.price + flavorCount * FLAVOR_PRICE
    const lineTotal = unitPrice * quantity

    const orderItem = {
      id: `${Date.now()}-${Math.floor(Math.random() * 10000)}`,
      name: customizingItem.name,
      size: selectedSize.label,
      catalogObjectId: selectedSize.catalogObjectId || null,
      category: customizingItem.category,
      quantity,
      regularFlavors: [...customRegularFlavors],
      sugarFreeFlavors: [...customSugarFreeFlavors],
      notes: customNotes.trim(),
      unitPrice,
      lineTotal,
    }

    setCart((current) => [...current, orderItem])
    closeCustomizeModal()
  }

  const removeFromCart = (itemId) => {
    setCart((current) => current.filter((item) => item.id !== itemId))
  }

  const buildSquareCheckoutPayload = () => {
    return {
      idempotencyKey: window.crypto?.randomUUID?.() ?? `${Date.now()}`,
      pickupTime,
      customer: {
        name: customerName.trim(),
        phone: customerPhone.trim(),
      },
      order: {
        locationId: import.meta.env.VITE_SQUARE_LOCATION_ID ?? '',
        lineItems: [
          ...cart.map((item) => {
            const modifierList = [
              ...item.regularFlavors.map((flavor) => ({
                name: `Flavor: ${flavor}`,
                basePriceMoney: { amount: toCents(FLAVOR_PRICE), currency: 'USD' },
              })),
              ...item.sugarFreeFlavors.map((flavor) => ({
                name: `Sugar Free Flavor: ${flavor}`,
                basePriceMoney: { amount: toCents(FLAVOR_PRICE), currency: 'USD' },
              })),
            ]

            return {
              name: `${item.name} (${item.size})`,
              quantity: String(item.quantity),
              catalogObjectId: item.catalogObjectId,
              basePriceMoney: {
                amount: toCents(item.unitPrice - modifierList.length * FLAVOR_PRICE),
                currency: 'USD',
              },
              modifiers: modifierList,
              note: item.notes,
            }
          }),
          {
            name: `VA State Tax (${(VA_STATE_TAX_RATE * 100).toFixed(1)}%)`,
            quantity: '1',
            basePriceMoney: {
              amount: toCents(stateTax),
              currency: 'USD',
            },
            modifiers: [],
            note: 'Virginia state sales tax',
          },
          {
            name: `Scott County Tax (${(SCOTT_COUNTY_TAX_RATE * 100).toFixed(1)}%)`,
            quantity: '1',
            basePriceMoney: {
              amount: toCents(countyTax),
              currency: 'USD',
            },
            modifiers: [],
            note: 'Scott County sales tax',
          },
        ],
      },
      redirectUrls: {
        success: `${window.location.origin}${window.location.pathname}?checkout=success`,
        cancel: `${window.location.origin}${window.location.pathname}?checkout=cancelled`,
      },
    }
  }

  const sendToSquareCheckout = async () => {
    if (cart.length === 0) {
      setCheckoutState('error')
      setCheckoutMessage('Add at least one drink to the cart before checkout.')
      return
    }

    const endpoint = import.meta.env.VITE_SQUARE_CHECKOUT_ENDPOINT

    if (!endpoint) {
      setCheckoutState('error')
      setCheckoutMessage(
        'Square endpoint not configured. Set VITE_SQUARE_CHECKOUT_ENDPOINT to enable live checkout.',
      )
      return
    }

    setCheckoutState('loading')
    setCheckoutMessage('Creating secure checkout...')

    try {
      const payload = buildSquareCheckoutPayload()
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data?.message || 'Could not create Square checkout link.')
      }

      const checkoutUrl = data.checkoutUrl || data.url

      if (!checkoutUrl) {
        throw new Error('Checkout link missing from API response.')
      }

      setCheckoutState('success')
      setCheckoutMessage('Redirecting to Square checkout...')
      window.location.assign(checkoutUrl)
    } catch (error) {
      setCheckoutState('error')
      setCheckoutMessage(error instanceof Error ? error.message : 'Checkout failed.')
    }
  }

  const handleNavLinkClick = () => {
    setMobileNavOpen(false)
  }

  useEffect(() => {
    if (!mobileCartOpen) {
      return
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMobileCartOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [mobileCartOpen])

  useEffect(() => {
    if (!isOverlayOpen) {
      return
    }

    const scrollPosition = window.scrollY
    const { overflow, position, top, width } = document.body.style

    document.body.style.overflow = 'hidden'
    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollPosition}px`
    document.body.style.width = '100%'

    return () => {
      document.body.style.overflow = overflow
      document.body.style.position = position
      document.body.style.top = top
      document.body.style.width = width
      window.scrollTo(0, scrollPosition)
    }
  }, [isOverlayOpen])

  const cartPanelContent = (
    <>
      <h3>Your Cart</h3>
      {cart.length === 0 ? (
        <p className="empty-cart">No drinks added yet.</p>
      ) : (
        <ul className="cart-list">
          {cart.map((item) => (
            <li key={item.id} className="cart-item">
              <div>
                <p className="cart-title">
                  {item.quantity}x {item.name} ({item.size})
                </p>
                {item.regularFlavors.length > 0 && (
                  <p className="cart-meta">Flavors: {item.regularFlavors.join(', ')}</p>
                )}
                {item.sugarFreeFlavors.length > 0 && (
                  <p className="cart-meta">
                    Sugar Free: {item.sugarFreeFlavors.join(', ')}
                  </p>
                )}
                {item.notes && <p className="cart-meta">Note: {item.notes}</p>}
              </div>
              <div className="cart-price-wrap">
                <p className="cart-line-total">{formatPrice(item.lineTotal)}</p>
                <button
                  type="button"
                  className="cart-remove"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="checkout-fields">
        <label>
          Name (optional)
          <input
            value={customerName}
            onChange={(event) => setCustomerName(event.target.value)}
            placeholder="Pickup name"
          />
        </label>
        <label>
          Phone (optional)
          <input
            value={customerPhone}
            onChange={(event) => setCustomerPhone(event.target.value)}
            placeholder="(423) 300-2993"
          />
        </label>
        <label>
          Pickup Time
          <select value={pickupTime} onChange={(event) => setPickupTime(event.target.value)}>
            <option value="ASAP">ASAP</option>
            <option value="15 minutes">In 15 minutes</option>
            <option value="30 minutes">In 30 minutes</option>
            <option value="45 minutes">In 45 minutes</option>
          </select>
        </label>
      </div>

      <div className="checkout-footer">
        <p className="cart-meta">Subtotal: {formatPrice(cartSubtotal)}</p>
        <p className="cart-meta">VA State Tax (5.3%): {formatPrice(stateTax)}</p>
        <p className="cart-meta">Scott County Tax (6.0%): {formatPrice(countyTax)}</p>
        <p className="cart-meta">Total Tax: {formatPrice(cartTax)}</p>
        <p className="cart-total">Total: {formatPrice(cartTotal)}</p>
        <button
          type="button"
          className="cta checkout-btn"
          onClick={sendToSquareCheckout}
          disabled={checkoutState === 'loading'}
        >
          {checkoutState === 'loading' ? 'Creating checkout...' : 'Checkout with Square'}
        </button>
        <p className={`checkout-message ${checkoutState}`}>{checkoutMessage}</p>
      </div>
    </>
  )

  return (
    <div className="site">
      <header className="hero" id="home">
        <nav className="topbar">
          <div className="brand">
            <img src={logo} alt="Mountain Java Coffee Co. logo" className="brand-logo" />
            <span className="brand-name">MOUNTAIN JAVA COFFEE CO.</span>
          </div>

          <div className="topbar-controls">
            <button
              type="button"
              className="icon-btn cart-toggle"
              onClick={() => setMobileCartOpen(true)}
              aria-label="Open cart"
            >
              <span aria-hidden="true">Cart</span>
              <span className="icon-count">{cartItemCount}</span>
            </button>
            <button
              type="button"
              className="icon-btn nav-toggle"
              onClick={() => setMobileNavOpen((open) => !open)}
              aria-expanded={mobileNavOpen}
              aria-controls="site-nav-links"
              aria-label="Toggle menu"
            >
              <span aria-hidden="true">Menu</span>
            </button>
          </div>

          <div id="site-nav-links" className={`nav-links ${mobileNavOpen ? 'is-open' : ''}`}>
            <a href="#menu" onClick={handleNavLinkClick}>Menu</a>
            <a href="#order" onClick={handleNavLinkClick}>Order</a>
            <a href="#about" onClick={handleNavLinkClick}>About</a>
            <a href="#visit" onClick={handleNavLinkClick}>Visit</a>
          </div>
        </nav>

        <div className="hero-content">
          <p className="eyebrow">Freshly Roasted • Locally Loved</p>
          <h1>Your Neighborhood Coffee Escape</h1>
          <p className="hero-text">
            Handcrafted espresso, small-batch brews, and warm mountain-town vibes.
            Start your day at Mountain Java Coffee Co.
          </p>
          <div className="hero-cta-row">
            <a className="cta" href="#visit">
              Plan Your Visit
            </a>
            <a className="cta cta-secondary" href="#order">
              Order Now
            </a>
          </div>
        </div>

        <img
          src={coffeeBeans}
          alt="Coffee beans spilling decoration"
          className="hero-beans"
          aria-hidden="true"
        />
      </header>

      <main>
        <section className="section" id="menu">
          <div className="menu-shell">
            <aside className="menu-intro">
              <p className="menu-kicker">Crafted Daily</p>
              <h2>Our Menu</h2>
              <p>
                From bold hot espresso to smooth iced favorites, each drink is made to order
                with quality beans and mountain-town care.
              </p>
              <p className="menu-special">Wednesday Special: $5 any large drink</p>
            </aside>

            <div className="menu-layout">
              <article className="menu-block">
                <div className="menu-bg" style={{ backgroundImage: `url(${menuBackground})` }} aria-hidden="true" />
                <h3>Hot Coffee</h3>
                <div className="menu-sizes">
                  <span className="menu-size-label">Size</span>
                  <span>12OZ</span>
                  <span>16OZ</span>
                  <span>20OZ</span>
                </div>
                <ul className="menu-list">
                  <li><span>Coffee</span><span>$2.95</span><span>$3.25</span><span>$3.55</span></li>
                  <li><span>Latte</span><span>$4.55</span><span>$4.85</span><span>$5.15</span></li>
                  <li><span>Chai Latte</span><span>$4.55</span><span>$4.85</span><span>$5.15</span></li>
                  <li><span>Dirty Chai</span><span>$4.85</span><span>$5.15</span><span>$5.45</span></li>
                  <li><span>Cappuccino</span><span>$4.55</span><span>$4.85</span><span>$5.15</span></li>
                  <li><span>Macchiato</span><span>$4.55</span><span>$4.85</span><span>$5.15</span></li>
                </ul>
                <p className="menu-addon-note">Flavor add-ins included at no extra charge</p>
              </article>

              <article className="menu-block">
                <div className="menu-bg" style={{ backgroundImage: `url(${menuBackground})` }} aria-hidden="true" />
                <h3>Iced Coffee</h3>
                <div className="menu-sizes">
                  <span className="menu-size-label">Size</span>
                  <span>16OZ</span>
                  <span>20OZ</span>
                  <span>24OZ</span>
                </div>
                <ul className="menu-list">
                  <li><span>Iced Coffee</span><span>$3.25</span><span>$3.55</span><span>$3.85</span></li>
                  <li><span>Iced Latte</span><span>$5.25</span><span>$5.55</span><span>$5.85</span></li>
                  <li><span>Iced Cappuccino</span><span>$5.25</span><span>$5.55</span><span>$5.85</span></li>
                  <li><span>Macchiato</span><span>$5.25</span><span>$5.55</span><span>$5.85</span></li>
                </ul>
                <p className="menu-addon-note">Flavor add-ins included at no extra charge</p>
              </article>

              <article className="menu-block">
                <div className="menu-bg" style={{ backgroundImage: `url(${menuBackground})` }} aria-hidden="true" />
                <h3>Non Coffee</h3>
                <div className="menu-sizes">
                  <span className="menu-size-label">Size</span>
                  <span>16OZ</span>
                  <span>20OZ</span>
                  <span>24OZ</span>
                </div>
                <ul className="menu-list">
                  <li><span>Hot Tea</span><span>$3.25</span><span>$3.55</span><span>$3.85</span></li>
                  <li><span>Hot Chocolate</span><span>$3.55</span><span>$3.85</span><span>$4.15</span></li>
                  <li><span>Matcha</span><span>$4.85</span><span>$5.15</span><span>$5.45</span></li>
                </ul>
              </article>

              <article className="menu-block">
                <div className="menu-bg" style={{ backgroundImage: `url(${menuBackground})` }} aria-hidden="true" />
                <h3>Energy</h3>
                <p className="menu-block-text">Energy drinks featuring Alani &amp; Red Bull (seasonal flavors available)</p>
              </article>

              <article className="menu-block">
                <div className="menu-bg" style={{ backgroundImage: `url(${menuBackground})` }} aria-hidden="true" />
                <h3>Lemonade</h3>
                <p className="menu-block-text">Lemonade with optional flavor add-ins included at no extra charge.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="section order-section" id="order">
          <div className="order-shell">
            <article className="order-panel order-menu-panel">
              <p className="menu-kicker">Order Ahead</p>
              <h2>Online Ordering</h2>
              <p className="order-intro-copy">
                Browse by category, customize flavors and notes, then confirm to add to cart.
              </p>
              <p className="order-intro-copy">
                Menu source: {menuSource === 'square' ? 'Live Square Catalog' : 'Local fallback menu'}
              </p>

              <div className="order-category-tabs" role="tablist" aria-label="Order categories">
                {orderCategories.map((category) => (
                  <button
                    key={category.name}
                    type="button"
                    role="tab"
                    aria-selected={selectedOrderCategory?.name === category.name}
                    className={`order-tab ${selectedOrderCategory?.name === category.name ? 'is-active' : ''}`}
                    onClick={() => setActiveOrderCategory(category.name)}
                  >
                    {category.name}
                  </button>
                ))}
              </div>

              <div className="order-menu-list">
                {selectedOrderCategory?.items.map((item) => {
                  const selectedSizeLabel = selectedSizesByItem[item.id] || item.sizes[0].label

                  return (
                    <article key={item.id} className="order-item-card">
                      <div>
                        <h3 className="order-item-name">{item.name}</h3>
                        <p className="order-item-meta">{item.category}</p>
                        <p className="order-item-price">{formatPriceRange(item.sizes)}</p>
                      </div>

                      <div className="order-item-actions">
                        <label className="order-size-picker">
                          <span>Size</span>
                          <select
                            value={selectedSizeLabel}
                            onChange={(event) => setItemSize(item.id, event.target.value)}
                          >
                            {item.sizes.map((size) => (
                              <option key={size.label} value={size.label}>
                                {size.label} ({formatPrice(size.price)})
                              </option>
                            ))}
                          </select>
                        </label>
                        <button type="button" className="cta order-add-btn" onClick={() => startCustomizeItem(item)}>
                          Customize &amp; add
                        </button>
                      </div>
                    </article>
                  )
                })}
              </div>

              <p className="order-flow-note">Flavor add-ins are free and will be included with your order details.</p>
            </article>

            {customizingItem && (
              <div className="customize-overlay" role="dialog" aria-modal="true" aria-label="Customize drink">
                <div className="customize-modal">
                  <h3>Customize {customizingItem.name}</h3>
                  <p className="customize-subtext">Choose options, then confirm to add this drink to your cart.</p>

                  <div className="customize-grid">
                    <label>
                      Size
                      <select
                        value={customizingSizeLabel}
                        onChange={(event) => setCustomizingSizeLabel(event.target.value)}
                      >
                        {customizingItem.sizes.map((size) => (
                          <option key={size.label} value={size.label}>
                            {size.label} ({formatPrice(size.price)})
                          </option>
                        ))}
                      </select>
                    </label>

                    <label>
                      Quantity
                      <input
                        type="number"
                        min="1"
                        max="10"
                        value={customizingQuantity}
                        onChange={(event) => setCustomizingQuantity(Math.max(1, Number(event.target.value) || 1))}
                      />
                    </label>
                  </div>

                  <div className="customize-flavor-grid">
                    <div className="customize-flavor-box">
                      <h4>Flavors</h4>
                      <div className="customize-chip-wrap">
                        {regularFlavors.map((flavor) => (
                          <button
                            key={flavor}
                            type="button"
                            className={`customize-chip ${customRegularFlavors.includes(flavor) ? 'is-active' : ''}`}
                            onClick={() => toggleCustomFlavor(flavor, 'regular')}
                          >
                            {flavor}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="customize-flavor-box">
                      <h4>Sugar Free</h4>
                      <div className="customize-chip-wrap">
                        {sugarFreeFlavors.map((flavor) => (
                          <button
                            key={flavor}
                            type="button"
                            className={`customize-chip ${customSugarFreeFlavors.includes(flavor) ? 'is-active' : ''}`}
                            onClick={() => toggleCustomFlavor(flavor, 'sugar-free')}
                          >
                            {flavor}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <label>
                    Notes
                    <textarea
                      value={customNotes}
                      onChange={(event) => setCustomNotes(event.target.value)}
                      placeholder="Ex: light ice, extra hot"
                      rows="3"
                    />
                  </label>

                  <div className="customize-footer">
                    <p className="customize-total">Total: {formatPrice(customDrinkTotal)}</p>
                    <div className="customize-actions">
                      <button type="button" className="customize-cancel" onClick={closeCustomizeModal}>
                        Cancel
                      </button>
                      <button type="button" className="cta" onClick={confirmAddToCart}>
                        Confirm &amp; add to cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <article className="order-panel cart-panel desktop-cart-panel">{cartPanelContent}</article>
          </div>
        </section>

        {mobileCartOpen && (
          <div
            className="mobile-cart-overlay"
            role="dialog"
            aria-modal="true"
            aria-label="Your cart"
            onClick={() => setMobileCartOpen(false)}
          >
            <aside className="mobile-cart-drawer" onClick={(event) => event.stopPropagation()}>
              <div className="mobile-cart-header">
                <h3>Cart</h3>
                <button type="button" className="mobile-cart-close" onClick={() => setMobileCartOpen(false)}>
                  Close
                </button>
              </div>
              <article className="order-panel cart-panel mobile-cart-panel">{cartPanelContent}</article>
            </aside>
          </div>
        )}

        <section className="section about-section" id="about">
          <div className="about-top">
            <div className="about-copy">
              <p className="menu-kicker">Our Story</p>
              <h2>Built for Coffee Lovers</h2>
              <p>
                Mountain Java Coffee Co. is a cozy stop for morning commuters, weekend adventurers,
                and everyone in between. We focus on quality beans, friendly service,
                and a space that feels like home.
              </p>
            </div>
            <div className="panel features-panel">
              <h3>What You’ll Find</h3>
              <div className="feature-grid">
                <p>Fresh pastries every morning</p>
                <p>Seasonal drink specials</p>
                <p>Comfortable lounge seating + free Wi-Fi</p>
                <p>Grab-and-go options for busy mornings</p>
              </div>
            </div>
          </div>

          <div className="reviews-panel">
            <h3>Guest Reviews</h3>
            <div className="reviews-grid">
              <article className="review-card">
                <p className="review-quote">
                  “Great drinks and service! Always happy to support a local small business owner. Thanks Alexa :)”
                </p>
                <p className="review-name">Stacie Welch</p>
                <p className="review-meta">7 reviews · 1 photo · 3 months ago</p>
              </article>

              <article className="review-card">
                <p className="review-quote">“Never disappointed! Such a great shop.”</p>
                <p className="review-name">Danielle</p>
                <p className="review-meta">Local Guide · 6 reviews · 4 months ago</p>
                <p className="review-rating">Food: 5/5 · Service: 5/5 · Atmosphere: 5/5</p>
              </article>

              <article className="review-card">
                <p className="review-quote">
                  “Great little coffee shop. Stop in and see them. Coffee was great.”
                </p>
                <p className="review-name">Emma Starnes</p>
                <p className="review-meta">4 reviews · 11 months ago · Take out · $1–10</p>
                <p className="review-rating">Service: 5/5 · Atmosphere: 5/5</p>
              </article>
            </div>
          </div>
        </section>

        <section className="section contact-video" id="visit">
          <video ref={contactVideoRef} className="contact-video-bg" autoPlay muted loop playsInline preload="auto">
            <source src={coffeeBeanVideo} type="video/mp4" />
          </video>
          <div className="contact-overlay" />

          <div className="contact-content">
            <h2>Visit Mountain Java Coffee Co.</h2>
            <div className="grid visit-grid">
              <article className="info-box">
                <h3>Location</h3>
                <p>334 Duff Patt Highway, Ste 102</p>
                <p>24244</p>
              </article>
              <article className="info-box">
                <h3>Hours</h3>
                <p>Mon–Fri: </p>
                <p>Sat: </p>
                <p>Sun: </p>
              </article>
              <article className="info-box">
                <h3>Contact Info</h3>
                <p>
                  <a href="tel:+14233002993">+1 423-300-2993</a>
                </p>
                <p>
                  <a href="mailto:mountainjava24@gmail.com">mountainjava24@gmail.com</a>
                </p>
                <p>Follow us on Facebook for specials and events.</p>
                <a
                  href="https://www.facebook.com/profile.php?id=61559421226206"
                  target="_blank"
                  rel="noreferrer"
                >
                  View Facebook Page
                </a>
              </article>
            </div>

            <iframe
              className="contact-map"
              title="Mountain Java Coffee Co. map"
              src="https://www.google.com/maps?q=334+Duff+Patt+Highway+Ste+102+24244&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>
      </main>

      <footer className="footer">
        <img src={logo} alt="Mountain Java Coffee Co. emblem" className="footer-logo" />
        <p>© {new Date().getFullYear()} MOUNTAIN JAVA COFFEE CO.</p>
        <p>
          Built by{' '}
          <a href="https://smithdigitals.com/" target="_blank" rel="noreferrer">
            Smith Digitals
          </a>
        </p>
      </footer>
    </div>
  )
}

export default App
