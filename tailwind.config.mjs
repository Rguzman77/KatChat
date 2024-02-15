/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
	'./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'],
  
	plugins: [require('flowbite/plugin')],
	
	darkMode: 'class',
	
	theme: {
	  extend: {
		colors: {
		  // flowbite-svelte
		  primary: {
			50: '#FFF5F2',
			100: '#FFF1EE',
			200: '#FFE4DE',
			300: '#FFD5CC',
			400: '#FFBCAD',
			500: '#FE795D',
			600: '#EF562F',
			700: '#EB4F27',
			800: '#CC4522',
			900: '#A5371B'
		  }
		},
		animation: {
			'background-move': 'background-move 3s infinite linear',
		  },
		  backgroundImage: theme => ({
			 'background-image': "url('/src/assets/background.png')",
		  }),
		  height: {
			'screen-170': 'calc(100vh + 170px)',
		  },
		  keyframes: {
			'background-move': {
			  '0%': { 'background-position': '0% 0%' },
			  '100%': { 'background-position': '0% 170px' },
			},
		  },
	  }
	}
  };