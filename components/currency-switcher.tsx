"use client"

import { Check, ChevronsUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

interface CurrencySwitcherProps {
  currency: string
  setCurrency: (currency: string) => void
}

const currencies = [
  { value: "USD", label: "USD ($)", symbol: "$" },
  { value: "EUR", label: "EUR (€)", symbol: "€" },
  { value: "GBP", label: "GBP (£)", symbol: "£" },
  { value: "JPY", label: "JPY (¥)", symbol: "¥" },
  { value: "CNY", label: "CNY (¥)", symbol: "¥" },
]

export function CurrencySwitcher({ currency, setCurrency }: CurrencySwitcherProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-[120px] justify-between">
          {currency}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[120px]">
        {currencies.map((currencyOption) => (
          <DropdownMenuItem
            key={currencyOption.value}
            onClick={() => setCurrency(currencyOption.value)}
            className={cn("flex items-center justify-between", currency === currencyOption.value && "font-medium")}
          >
            {currencyOption.label}
            {currency === currencyOption.value && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
