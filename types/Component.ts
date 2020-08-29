export const COMPONENTS = [
  'frame',
  'bars',
  'wheels',
  'tires',
  'stem',
  'headset',
  'bottom_bracket',
  'chain',
  'saddle',
  'seatpost',
  'seatpost_clamp',
  'bar_tape',
  'grips',
  'fork',
  'headset',
  'chainrings',
  'pedals',
  'front_derailleur',
  'rear_derailleur',
  'cassette',
  'cog',
  'cranks',
  'spokes',
  'hubs',
  'rim',
  'valves',
  'brakes',
  'basket',
  'front_rack',
  'rear_rack',
  'bag',
] as const

export type Component = {
  type: typeof COMPONENTS[number]
  text: string
}
