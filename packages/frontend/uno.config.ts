import { defineConfig, presetUno, transformerVariantGroup } from 'unocss'
import { presetKobalte } from "unocss-preset-primitives";

export default defineConfig({
  // @ts-expect-error : This is a custom property.
  presets: [presetUno(), presetKobalte()],
  transformers: [transformerVariantGroup()],
})