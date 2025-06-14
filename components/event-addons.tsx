import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ShoppingBag, Car, MessageSquare, Check, ChevronDown, ChevronUp } from "lucide-react"
import { toast } from "sonner"

type AddonType = {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  price: string
  options?: {
    id: string
    title: string
    price: string
  }[]
}

const addons: AddonType[] = [
  {
    id: "snacks",
    title: "Pre-order Snacks",
    description: "Skip the queue, get it delivered to your seat",
    icon: <ShoppingBag className="h-6 w-6" />,
    price: "₹500",
    options: [
      { id: "combo1", title: "Popcorn + Soft Drink", price: "₹500" },
      { id: "combo2", title: "Nachos + Soft Drink", price: "₹600" },
      { id: "combo3", title: "Hot Dog + Soft Drink", price: "₹700" },
    ],
  },
  {
    id: "parking",
    title: "Parking Pass",
    description: "Guaranteed parking spot near entrance",
    icon: <Car className="h-6 w-6" />,
    price: "₹300",
    options: [
      { id: "standard", title: "Standard Parking", price: "₹300" },
      { id: "premium", title: "Premium Parking (Near Entrance)", price: "₹500" },
      { id: "valet", title: "Valet Parking", price: "₹800" },
    ],
  },
  {
    id: "merch",
    title: "Event Merchandise",
    description: "T-shirts, posters and more",
    icon: <ShoppingBag className="h-6 w-6" />,
    price: "₹1,000",
  },
  {
    id: "chat",
    title: "Anonymous Chat",
    description: "Chat with other attendees anonymously",
    icon: <MessageSquare className="h-6 w-6" />,
    price: "Free",
  },
]

export default function EventAddons() {
  const [selectedAddons, setSelectedAddons] = useState<Set<string>>(new Set())
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({})
  const [showOptions, setShowOptions] = useState<Record<string, boolean>>({})

  const handleAddAddon = (addonId: string) => {
    const addon = addons.find(a => a.id === addonId)
    
    if (addon?.options) {
      // Toggle options visibility
      setShowOptions(prev => ({ ...prev, [addonId]: !prev[addonId] }))
    } else {
      // Toggle selection for add-ons without options
      setSelectedAddons((prev) => {
        const newSet = new Set(prev)
        if (newSet.has(addonId)) {
          newSet.delete(addonId)
          toast.success("Add-on removed")
        } else {
          newSet.add(addonId)
          toast.success("Add-on added to your order")
        }
        return newSet
      })
    }
  }

  const handleSelectOption = (addonId: string, optionId: string) => {
    setSelectedOptions(prev => ({ ...prev, [addonId]: optionId }))
    setSelectedAddons(prev => {
      const newSet = new Set(prev)
      newSet.add(addonId)
      return newSet
    })
    toast.success("Option selected and added to your order")
    setShowOptions(prev => ({ ...prev, [addonId]: false }))
  }

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold">Add-ons & Extras</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {addons.map((addon) => {
          const isSelected = selectedAddons.has(addon.id)
          const isShowingOptions = showOptions[addon.id]
          const selectedOption = selectedOptions[addon.id]
          const selectedOptionDetails = addon.options?.find(opt => opt.id === selectedOption)

          return (
            <div key={addon.id} className="space-y-2">
              <Card className={`hover:shadow-md transition-shadow ${isSelected ? 'border-primary' : ''}`}>
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    {addon.icon}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{addon.title}</CardTitle>
                    <CardDescription>{addon.description}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="flex justify-between items-center">
                  <span className="font-medium">
                    {selectedOptionDetails ? selectedOptionDetails.price : addon.price}
                  </span>
                  <Button 
                    variant={isSelected ? "default" : "outline"} 
                    size="sm"
                    onClick={() => handleAddAddon(addon.id)}
                    className="flex items-center gap-2"
                  >
                    {isSelected ? (
                      <>
                        <Check className="h-4 w-4" />
                        Added
                      </>
                    ) : (
                      <>
                        Add
                        {addon.options && (isShowingOptions ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />)}
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              {isShowingOptions && addon.options && (
                <div className="mt-2 space-y-2">
                  {addon.options.map((option) => (
                    <Card 
                      key={option.id}
                      className={`cursor-pointer hover:bg-muted/50 transition-colors ${
                        selectedOption === option.id ? 'border-primary bg-primary/5' : ''
                      }`}
                      onClick={() => handleSelectOption(addon.id, option.id)}
                    >
                      <CardContent className="p-4 flex justify-between items-center">
                        <div>
                          <p className="font-medium">{option.title}</p>
                          <p className="text-sm text-muted-foreground">{option.price}</p>
                        </div>
                        {selectedOption === option.id && (
                          <Check className="h-4 w-4 text-primary" />
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
} 