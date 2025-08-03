/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  theme: {
  	container: {
  		center: true,
  		padding: '2rem',
  		screens: {
  			'2xl': '1400px'
  		}
  	},
  	extend: {
  		colors: {
  			// HYPIQ Color Scheme
  			hypiq: {
  				background: '#0c221d',
  				card: '#12191d',
  				accent: '#1a2125',
  				text: '#ffffff'
  			},
  			// shadcn/ui variables
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			profit: {
  				DEFAULT: '#10b981',
  				light: '#34d399',
  				dark: '#059669'
  			},
  			loss: {
  				DEFAULT: '#ef4444',
  				light: '#f87171',
  				dark: '#dc2626'
  			},
  			whale: {
  				DEFAULT: '#3b82f6',
  				light: '#60a5fa',
  				dark: '#2563eb'
  			},
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: 0
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: 0
  				}
  			},
  			'pulse-profit': {
  				'0%, 100%': {
  					backgroundColor: '#10b981'
  				},
  				'50%': {
  					backgroundColor: '#34d399'
  				}
  			},
  			'pulse-loss': {
  				'0%, 100%': {
  					backgroundColor: '#ef4444'
  				},
  				'50%': {
  					backgroundColor: '#f87171'
  				}
  			},
  			'star-movement-bottom': {
				'0%': { transform: 'translate(0%, 0%)', opacity: '1' },
				'100%': { transform: 'translate(-100%, 0%)', opacity: '0' }
			},
			'star-movement-top': {
				'0%': { transform: 'translate(0%, 0%)', opacity: '1' },
				'100%': { transform: 'translate(100%, 0%)', opacity: '0' }
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			'pulse-profit': 'pulse-profit 2s ease-in-out infinite',
  			'pulse-loss': 'pulse-loss 2s ease-in-out infinite',
  			'star-movement-bottom': 'star-movement-bottom linear infinite alternate',
  			'star-movement-top': 'star-movement-top linear infinite alternate'
  		}
  	}
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography"), require("tailwindcss-animate")],
} 