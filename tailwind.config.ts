import type { Config } from "tailwindcss";

// all in fixtures is set to tailwind v3 as interims solutions

const config: Config = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			},
  			ink: 'var(--color-ink)',
  			'ink-2': 'var(--color-ink-2)',
  			'ink-3': 'var(--color-ink-3)',
  			'ink-4': 'var(--color-ink-4)',
  			line: 'var(--color-line)',
  			'line-2': 'var(--color-line-2)',
  			paper: 'var(--color-paper)',
  			'paper-2': 'var(--color-paper-2)',
  			mute: 'var(--color-mute)',
  			signal: 'var(--color-signal)',
  			'signal-2': 'var(--color-signal-2)',
  			teal: '#4fd1c5',
  			violet: '#b794f4',
  			rose: '#f687b3',
  			lime: '#68d391'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
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
  					height: '0'
  				}
  			},
  			scan: {
  				'0%, 100%': { transform: 'translateY(-10%)', opacity: '0' },
  				'10%': { opacity: '1' },
  				'90%': { opacity: '1' },
  				'50%': { transform: 'translateY(110%)' }
  			},
  			'pulse-ring': {
  				'0%': { transform: 'scale(0.85)', opacity: '0.8' },
  				'100%': { transform: 'scale(1.6)', opacity: '0' }
  			},
  			blink: {
  				to: { visibility: 'hidden' }
  			},
  			dash: {
  				to: { strokeDashoffset: '-40' }
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			'spin-slow': 'spin 18s linear infinite',
  			'spin-slower': 'spin 40s linear infinite reverse',
  			'scan': 'scan 4.5s ease-in-out infinite',
  			'pulse-ring': 'pulse-ring 2.4s cubic-bezier(0.2, 0.7, 0.3, 1) infinite',
  			'blink': 'blink 1.1s steps(2, start) infinite'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
