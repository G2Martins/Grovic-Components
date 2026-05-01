"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

import type { TenantConfig } from "@/types"
import { defaultTenantConfig } from "@/types"
import { applyTenantTheme } from "@/config/tenant.config"

interface TenantStore {
  config: TenantConfig
  setConfig: (config: TenantConfig) => void
  updateBrand: (brand: Partial<TenantConfig["brand"]>) => void
  updateFeatures: (features: Partial<TenantConfig["features"]>) => void
  updateLabels: (labels: Partial<TenantConfig["labels"]>) => void
}

export const useTenantStore = create<TenantStore>()(
  persist(
    (set, get) => ({
      config: defaultTenantConfig,

      setConfig: (config) => {
        set({ config })
        applyTenantTheme(config)
      },

      updateBrand: (brand) => {
        const next = { ...get().config, brand: { ...get().config.brand, ...brand } }
        set({ config: next })
        applyTenantTheme(next)
      },

      updateFeatures: (features) => {
        set((s) => ({
          config: { ...s.config, features: { ...s.config.features, ...features } },
        }))
      },

      updateLabels: (labels) => {
        set((s) => ({
          config: { ...s.config, labels: { ...s.config.labels, ...labels } },
        }))
      },
    }),
    { name: "valerium-tenant" }
  )
)
