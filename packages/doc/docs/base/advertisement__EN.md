# Advertisement Placement

### Basic Usage

Set the `advertisement` configuration, where `termType` represents the display interval. Currently, it only supports popping up once per day, week, or month.

```tsx
export default defineConfig({
  docs: {
    advertisement: {
      title: 'Donation',
      content: 'Thank you for your support!',
      img: 'https://raw.githubusercontent.com/AntmJS/vantui/main/resource/abcd.png',
      termType: 'week',
    },
  },
})
```

### Custom Styles

- `imgStyle` and `style` can be used to set the styles for the image and popup respectively.
- Other styles can be customized through [Global Style Settings](/#/style)
