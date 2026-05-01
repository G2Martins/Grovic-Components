"use client"

import { useEffect } from "react"

import { useTenantStore } from "@/store/tenant-store"
import { applyTenantTheme, buildNavItems } from "@/config/tenant.config"

export function useTenant() {
  const { config, setConfig, updateBrand, updateFeatures, updateLabels } =
    useTenantStore()

  useEffect(() => {
    applyTenantTheme(config)
  }, [config])

  const navItems = buildNavItems(config.features, config.labels)

  return { config, navItems, setConfig, updateBrand, updateFeatures, updateLabels }
}
