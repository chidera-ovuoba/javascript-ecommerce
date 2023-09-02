module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
   theme: {
    screens: {
      '2xl': {'max': '1535px'},
      'xl': {'max': '1279px'},
      'xl_1':{'max':'1150px'},
      'lg': { 'max': '915px' },
      'lg_2':{'max':'894px'},
      'lg_12':{'max':'750px'},
      'lg_1':{'max':'710px'},
      'md': { 'max': '610px' },
      'md_1':{'max':'460px'},
      'sm': { 'max': '400px' },
      'xs':{'max':'350px'}
     },
      extend: {
        gridAutoColumns: {
          '1fr': 'minmax(150px, 1fr)',
        },
        gridTemplateColumns: {
          // Simple 16 column grid
         'footer4': 'repeat(4, minmax(150px, 1fr))',
         'footer_4_2': 'repeat(2, minmax(150px, 1fr))',

          // Complex site-specific column configuration
         'footer2': 'calc(50%) calc(50% - 2rem)',
        },
        keyframes: {
        stretch: {
          '100%': { width: '3rem' }
        },
        fadeIn: {
          '0%': { opacity: '0',transform:'translateX(-100%)' },
          '25%,75%': { transform: 'translateX(0%)',opacity:'1' },
          '85%': { transform: 'translateX(100%)',opacity:'0' },
          '100%': { transform: 'translateX(100%)',opacity:'0' },
          },
          bounce_light: {
            '0%': {transform:'translateY(0)'},
            '100%': {transform:'translateY(-1px)'},
        }
        },
        animation: {
        'stretch_out': 'stretch 1s ease forwards',
        'stretch_in': 'stretch 1s ease alternate forwards ',
        'fadeIn': 'fadeIn 8s ease',
        'fadeIn_bounce':'fadeIn 8s ease ,bounce_light 1.5s infinite cubic-bezier(.5,20,.5,-20) '
        }
        
      }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
