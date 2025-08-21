import type { z } from 'zod'

/**
 * Simple function that returns an object with a single method `pickField` that accepts a key from passed schema.
 * It supports you with auto-completion for input names and returns them as a string.
 *
 * @example
 * ```html
 *  <template>
 *    <nord-form-input :name="pickField('email')"/>
 *    <nord-form-input :name="pickField('password')"/>
 *  </template>
 *  <script setup lang="ts">
 *    import { useZodFieldPicker } from '~/composables/useZodFieldPicker';
 *    import { signupSchema } from '~/schemas/signup';
 *
 *    const { pickField } = useZodFieldPicker(signupSchema);
 *  </script>
 * ```
 */
export function useZodFieldPicker<T extends z.ZodObject<any>>(schema: T) {
    type Fields = z.infer<T>

    /** Function accepting a key from passed schema and returning it as a string. */
    function pickField<K extends keyof Fields>(field: K): string {
        return field as string
    }

    return { pickField }
}