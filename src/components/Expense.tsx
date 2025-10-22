import { Utensils, Gift, Car, Home, Zap, Film, Heart, ShoppingBag, Package } from 'lucide-react'

export const getCategoryIcon = (category: string) => {
  const iconProps = { size: 20, className: "text-gray-600" }
  switch (category) {
    case 'Food':
      return <Utensils {...iconProps} />
    case 'Transport':
      return <Car {...iconProps} />
    case 'Housing':
      return <Home {...iconProps} />
    case 'Utilities':
      return <Zap {...iconProps} />
    case 'Entertainment':
      return <Film {...iconProps} />
    case 'Health':
      return <Heart {...iconProps} />
    case 'Shopping':
      return <ShoppingBag {...iconProps} />
    case 'Gifts':
      return <Gift {...iconProps} />
    case 'Other':
      return <Package {...iconProps} />
    default:
      return <Package {...iconProps} />
  }
}
