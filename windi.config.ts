import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  theme: {
    extend: {
      colors: {
        gray: {
          100: '#F7FAFC',
          900: '#1A202C',
        },
      },
      fontFamily: {
        Gaegu: ['Gaegu', 'cursive'],
        ComicBoys: ['Comic Boys', 'cursive'],
        CreamShoes: ['Cream Shoes', 'cursive'],
      },
    },
  },
})
