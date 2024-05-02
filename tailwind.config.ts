import type { Config } from 'tailwindcss';
import { CourseMinder } from './src/CourseMinder';
import forms from '@tailwindcss/forms';
import { join } from 'path';
import { skeleton } from '@skeletonlabs/tw-plugin';
import typography from '@tailwindcss/typography';

export default {

    important: true,
    darkMode: 'class',
    content: [
        './src/**/*.{html,js,svelte,ts}',
        join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}'),
    ],
    theme: {
        extend: {},
    },
    plugins: [
        forms,
        typography,
        skeleton({
            themes: {
                custom: [CourseMinder],
            },
        }),
    ],
} satisfies Config;
