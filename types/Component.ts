export const COMPONENT_CATEGORIES = ['drivetrain', 'frame_parts', 'wheels', 'cockpit', 'touring'] as const

export type Component = {
  type: string
  category: typeof COMPONENT_CATEGORIES[number]
}

export interface ComponentVM {
  description: string
  id: string
  locked: boolean
}

export const COMPONENTS: Component[] = [
  // Frame parts
  {
    type: 'frame',
    category: 'frame_parts',
  },
  {
    type: 'fork',
    category: 'frame_parts',
  },
  {
    type: 'thru_axels',
    category: 'frame_parts',
  },
  {
    type: 'quick_release_skewers',
    category: 'frame_parts',
  },

  // Drivetrain
  {
    type: 'front_derailleur',
    category: 'drivetrain',
  },
  {
    type: 'rear_derailleur',
    category: 'drivetrain',
  },
  {
    type: 'pedals',
    category: 'drivetrain',
  },
  {
    type: 'cassette',
    category: 'drivetrain',
  },
  {
    type: 'chainrings',
    category: 'drivetrain',
  },
  {
    type: 'cog',
    category: 'drivetrain',
  },
  {
    type: 'cranks',
    category: 'drivetrain',
  },
  {
    type: 'chain',
    category: 'drivetrain',
  },
  {
    type: 'bottom_bracket',
    category: 'drivetrain',
  },

  // Wheels
  {
    type: 'wheels',
    category: 'wheels',
  },
  {
    type: 'hubs',
    category: 'wheels',
  },
  {
    type: 'spokes',
    category: 'wheels',
  },
  {
    type: 'valves',
    category: 'wheels',
  },
  {
    type: 'tires',
    category: 'wheels',
  },
  {
    type: 'rims',
    category: 'wheels',
  },
  {
    type: 'brakes',
    category: 'wheels',
  },
  {
    type: 'brakes',
    category: 'wheels',
  },
  {
    type: 'brake_rotors',
    category: 'wheels',
  },

  // Cockpit
  {
    type: 'stem',
    category: 'cockpit',
  },
  {
    type: 'handlebars',
    category: 'cockpit',
  },
  {
    type: 'handlebar_tape',
    category: 'cockpit',
  },
  {
    type: 'grips',
    category: 'cockpit',
  },
  {
    type: 'headset',
    category: 'cockpit',
  },
  {
    type: 'seatpost',
    category: 'cockpit',
  },
  {
    type: 'seatpost_clamp',
    category: 'cockpit',
  },
  {
    type: 'saddle',
    category: 'cockpit',
  },
  {
    type: 'shifters',
    category: 'cockpit',
  },
  {
    type: 'brake_levers',
    category: 'cockpit',
  },

  // Touring
  {
    type: 'front_rack',
    category: 'touring',
  },
  {
    type: 'rear_rack',
    category: 'touring',
  },
  {
    type: 'basket',
    category: 'touring',
  },
  {
    type: 'bag',
    category: 'touring',
  },
]
