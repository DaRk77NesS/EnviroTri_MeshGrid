tailwind.config = {
    theme: {
        extend: {
            colors: {
                brand: {
                    dark: '#05090f', /* Matched main site */
                    surface: '#111827',
                    accent: '#00d2aa', /* Primary Cyan/Green */
                    accentHover: '#00ffce',
                    secondary: '#3b82f6', /* Blue for depth */
                    deep: '#020617', /* Darker than dark */
                    muted: '#94a3b8',
                    text: '#f1f5f9',
                    surfaceHighlight: '#1e293b'
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                mono: ['Fira Code', 'monospace'],
            }
        }
    }
}
