import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import vueParser from 'vue-eslint-parser'
import pluginVue from 'eslint-plugin-vue'
import type { Linter } from 'eslint'

export default tseslint.config(
  // Игнорируемые файлы
  { ignores: ['dist', 'node_modules', '*.config.js', '*.config.ts'] },

  // Базовые правила для JavaScript/TypeScript
  js.configs.recommended,
  ...tseslint.configs.recommended,

  // Правила для Vue
  ...pluginVue.configs['flat/recommended'],

  {
    files: ['**/*.vue', '**/*.ts', '**/*.js'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tseslint.parser,
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },

  // Кастомные правила
  {
    files: ['**/*.vue', '**/*.tsx', '**/*.jsx'],
    rules: {
      // ========== ПРАВИЛА ДЛЯ АТРИБУТОВ В ТЕМПЛЕЙТАХ ==========

      // Максимум атрибутов на одной строке
      'vue/max-attributes-per-line': ['error', {
        singleline: { max: 2 },    // в одну строку до 2 атрибутов
        multiline: { max: 1 },     // если перенос, то по 1 атрибуту
      }],

      // Первый атрибут должен быть на новой строке
      'vue/first-attribute-linebreak': ['error', {
        singleline: 'ignore',
        multiline: 'below',
      }],

      // Закрывающий тег на новой строке
      'vue/html-closing-bracket-newline': ['error', {
        singleline: 'never',
        multiline: 'always',
      }],

      // Отступы в атрибутах
      'vue/html-indent': ['error', 2],

      // Атрибуты в алфавитном порядке
      'vue/attributes-order': ['warn', {
        order: [
          'DEFINITION',
          'LIST_RENDERING',
          'CONDITIONALS',
          'RENDER_MODIFIERS',
          'GLOBAL',
          'UNIQUE',
          'TWO_WAY_BINDING',
          'OTHER_DIRECTIVES',
          'OTHER_ATTR',
          'EVENTS',
          'CONTENT',
        ],
        alphabetical: false,
      }],

      // Запрет на пустые строки внутри тегов
      'vue/no-multi-spaces': 'error',

      // Пробелы внутри скобок
      'vue/script-indent': ['error', 2, { baseIndent: 1 }],

      // Обязательные точки с запятой
      'semi': ['error', 'never'],

      // Одинарные кавычки
      'quotes': ['error', 'single'],

      // Запрет console.log
      'no-console': ['warn', { allow: ['warn', 'error'] }],

      // Неиспользуемые переменные
      '@typescript-eslint/no-unused-vars': ['error', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_'
      }],

      // Запрет any
      '@typescript-eslint/no-explicit-any': 'warn',

      // Предпочитаем const
      'prefer-const': 'error',
    },
  },

  // Особые правила для скриптов внутри Vue
  {
    files: ['**/*.vue'],
    rules: {
      'vue/script-indent': ['error', 2, { baseIndent: 1 }],
    },
  }
) as Linter.Config[]
