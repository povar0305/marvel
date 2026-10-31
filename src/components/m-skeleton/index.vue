<script lang="ts" setup>
  /**
   * Базовый строительный блок для skeleton-заглушек.
   * Рисует мерцающий блок произвольного размера и формы.
   */
  const props = defineProps<{
    // Ширина (любая CSS-величина или число пикселей)
    width?: string | number
    // Высота (любая CSS-величина или число пикселей)
    height?: string | number
    // Форма: обычная / круг / закруглённая
    shape?: 'rect' | 'rounded' | 'circle'
  }>()

  /**
   * Приведение числового размера к CSS-значению
   */
  const toCssSize = (value: string | number | undefined): string => {
    if (value === undefined) return ''
    return typeof value === 'number' ? `${value}px` : value
  }

  const cssWidth = () => toCssSize(props.width ?? '100%')
  const cssHeight = () => toCssSize(props.height ?? '16px')
  const circleShape = () => props.shape === 'circle'
</script>

<template>
  <span
    class="skeleton block shrink-0"
    :class="{ 'rounded-full': circleShape() }"
    :style="{
      width: cssWidth(),
      height: cssHeight(),
    }"
  />
</template>
