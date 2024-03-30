import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';

export const CourseMinder: CustomThemeConfig = {
    name: 'CourseMinder',
    properties: {
        '--theme-font-family-base': `Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`,
        '--theme-font-family-heading': `Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`,
        '--theme-font-color-base': '0 0 0',
        '--theme-font-color-dark': '255 255 255',
        '--theme-rounded-base': '9999px',
        '--theme-rounded-container': '8px',
        '--theme-border-base': '1px',
        // =~= Theme On-X Colors =~=
        '--on-primary': '2 44 34',
        '--on-secondary': '255 255 255',
        '--on-tertiary': '0 0 0',
        '--on-success': '0 0 0',
        '--on-warning': '0 0 0',
        '--on-error': '255 255 255',
        '--on-surface': '0 0 0',
        // =~= Theme Colors  =~=
        // primary | #DCF6E1

        // added new colors for the faculty side
        '--color-primary-50': '134 25 51', // #861933
        '--color-primary-100': '255 212 222', // #ffd4de
        '--color-primary-200': '207 163 173', // #cfa3ad
        //

        // '--color-primary-50': '250 254 251', // #fafefb
        // '--color-primary-100': '248 253 249', // #f8fdf9
        // '--color-primary-200': '246 253 248', // #f6fdf8
        '--color-primary-300': '241 251 243', // #f1fbf3
        '--color-primary-400': '231 249 234', // #e7f9ea
        '--color-primary-500': '220 246 225', // #DCF6E1
        '--color-primary-600': '198 221 203', // #c6ddcb
        '--color-primary-700': '165 185 169', // #a5b9a9
        '--color-primary-800': '132 148 135', // #849487
        '--color-primary-900': '108 121 110', // #6c796e
        // secondary | #507858
        '--color-secondary-50': '229 235 230', // #e5ebe6
        '--color-secondary-100': '220 228 222', // #dce4de
        '--color-secondary-200': '211 221 213', // #d3ddd5
        '--color-secondary-300': '185 201 188', // #b9c9bc
        '--color-secondary-400': '133 161 138', // #85a18a
        '--color-secondary-500': '80 120 88', // #507858
        '--color-secondary-600': '72 108 79', // #486c4f
        '--color-secondary-700': '60 90 66', // #3c5a42
        '--color-secondary-800': '48 72 53', // #304835
        '--color-secondary-900': '39 59 43', // #273b2b
        // tertiary | #84AB7A
        '--color-tertiary-50': '237 242 235', // #edf2eb
        '--color-tertiary-100': '230 238 228', // #e6eee4
        '--color-tertiary-200': '224 234 222', // #e0eade
        '--color-tertiary-300': '206 221 202', // #ceddca
        '--color-tertiary-400': '169 196 162', // #a9c4a2
        '--color-tertiary-500': '132 171 122', // #84AB7A
        '--color-tertiary-600': '119 154 110', // #779a6e
        '--color-tertiary-700': '99 128 92', // #63805c
        '--color-tertiary-800': '79 103 73', // #4f6749
        '--color-tertiary-900': '65 84 60', // #41543c
        // success | #84cc16
        '--color-success-50': '237 247 220', // #edf7dc
        '--color-success-100': '230 245 208', // #e6f5d0
        '--color-success-200': '224 242 197', // #e0f2c5
        '--color-success-300': '206 235 162', // #ceeba2
        '--color-success-400': '169 219 92', // #a9db5c
        '--color-success-500': '132 204 22', // #84cc16
        '--color-success-600': '119 184 20', // #77b814
        '--color-success-700': '99 153 17', // #639911
        '--color-success-800': '79 122 13', // #4f7a0d
        '--color-success-900': '65 100 11', // #41640b
        // warning | #EAB308
        '--color-warning-50': '252 244 218', // #fcf4da
        '--color-warning-100': '251 240 206', // #fbf0ce
        '--color-warning-200': '250 236 193', // #faecc1
        '--color-warning-300': '247 225 156', // #f7e19c
        '--color-warning-400': '240 202 82', // #f0ca52
        '--color-warning-500': '234 179 8', // #EAB308
        '--color-warning-600': '211 161 7', // #d3a107
        '--color-warning-700': '176 134 6', // #b08606
        '--color-warning-800': '140 107 5', // #8c6b05
        '--color-warning-900': '115 88 4', // #735804
        // error | #D41976
        '--color-error-50': '249 221 234', // #f9ddea
        '--color-error-100': '246 209 228', // #f6d1e4
        '--color-error-200': '244 198 221', // #f4c6dd
        '--color-error-300': '238 163 200', // #eea3c8
        '--color-error-400': '225 94 159', // #e15e9f
        '--color-error-500': '212 25 118', // #D41976
        '--color-error-600': '191 23 106', // #bf176a
        '--color-error-700': '159 19 89', // #9f1359
        '--color-error-800': '127 15 71', // #7f0f47
        '--color-error-900': '104 12 58', // #680c3a
        // surface | #E7F8E9
        '--color-surface-50': '251 254 252', // #fbfefc
        '--color-surface-100': '250 254 251', // #fafefb
        '--color-surface-200': '249 253 250', // #f9fdfa
        '--color-surface-300': '245 252 246', // #f5fcf6
        '--color-surface-400': '238 250 240', // #eefaf0
        '--color-surface-500': '231 248 233', // #E7F8E9
        '--color-surface-600': '208 223 210', // #d0dfd2
        '--color-surface-700': '173 186 175', // #adbaaf
        '--color-surface-800': '139 149 140', // #8b958c
        '--color-surface-900': '113 122 114', // #717a72
    },
};
