/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')

// Custom color with css variable color in __theme_color.scss
function customColors(cssVar) {
	return ({ opacityVariable, opacityValue }) => {
		if (opacityValue !== undefined) {
			return `rgba(var(${cssVar}), ${opacityValue})`
		}
		if (opacityVariable !== undefined) {
			return `rgba(var(${cssVar}), var(${opacityVariable}, 1))`
		}
		return `rgb(var(${cssVar}))`
	}
}

module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
	darkMode: 'class',
	theme: {
		container: {
			center: true,
			padding: {
				DEFAULT: '1rem',
				'2xl': '128px',
			},
			screens: {
				sm: '640px',
				md: '768px',
				lg: '1024px',
				xl: '1280px',
				'2xl': '1536px',
			},
		},
		// fontFamily: {
		//   display: ["var(--font-display)", ...defaultTheme.fontFamily.sans],
		//   body: ["var(--font-body)", ...defaultTheme.fontFamily.sans],
		// },

		extend: {
			colors: {
				primary: {
					50: customColors('--c-primary-50'),
					100: customColors('--c-primary-100'),
					200: customColors('--c-primary-200'),
					300: customColors('--c-primary-300'),
					400: customColors('--c-primary-400'),
					500: customColors('--c-primary-500'),
					600: customColors('--c-primary-600'),
					700: customColors('--c-primary-700'),
					800: customColors('--c-primary-800'),
					900: customColors('--c-primary-900'),
				},
				secondary: {
					50: customColors('--c-secondary-50'),
					100: customColors('--c-secondary-100'),
					200: customColors('--c-secondary-200'),
					300: customColors('--c-secondary-300'),
					400: customColors('--c-secondary-400'),
					500: customColors('--c-secondary-500'),
					600: customColors('--c-secondary-600'),
					700: customColors('--c-secondary-700'),
					800: customColors('--c-secondary-800'),
					900: customColors('--c-secondary-900'),
				},
				neutral: {
					50: customColors('--c-neutral-50'),
					100: customColors('--c-neutral-100'),
					200: customColors('--c-neutral-200'),
					300: customColors('--c-neutral-300'),
					400: customColors('--c-neutral-400'),
					500: customColors('--c-neutral-500'),
					600: customColors('--c-neutral-600'),
					700: customColors('--c-neutral-700'),
					800: customColors('--c-neutral-800'),
					900: customColors('--c-neutral-900'),
				},
			},
			animation: {
				'fade-in': 'fadeIn 0.5s ease-in-out',
				'slide-up': 'slideUp 0.5s ease-in-out',
			},
			keyframes: {
				fadeIn: {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' },
				},
				slideUp: {
					'0%': { transform: 'translateY(20px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' },
				},
			},
			typography: (theme) => ({
				DEFAULT: {
					css: {
						color: theme('colors.neutral.700'),
						a: {
							color: theme('colors.primary.600'),
							'&:hover': {
								color: theme('colors.primary.700'),
							},
						},
					},
				},
				dark: {
					css: {
						color: theme('colors.neutral.300'),
						a: {
							color: theme('colors.primary.500'),
							'&:hover': {
								color: theme('colors.primary.400'),
							},
						},
					},
				},
			}),
		},
	},
	variants: {
		extend: {
			typography: ['dark'],
		},
	},
	plugins: [
		require('@tailwindcss/typography'),
		require('@tailwindcss/forms'),
		require('@tailwindcss/aspect-ratio'),
	],
}
