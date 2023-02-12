// Dependencies
import { mode } from '@chakra-ui/theme-tools'

// Component customization
export const ButtonStyles = {
  baseStyle: {},
  sizes: {},
  variants: {
    primary: (props: any) => ({
      bg: 'primary.500',
      color: 'white',
      _hover:  {
        bg: mode('primary.700', 'primary.700')(props)
      }
    }),
    secondary: (props: any) => ({
      bg: 'secondary.500',
      color: 'white',
      _hover:  {
        bg: mode('secondary.700', 'secondary.700')(props)
      }
    }),
    fade: (props: any) => ({
      bgGradient: 'linear(to-l, secondary.500, primary.500)',
      color: 'white',
      _hover:  {
        bgGradient: mode(
          'linear(to-l, secondary.600, primary.600)',
          'linear(to-l, secondary.600, primary.600)'
        )(props)
      }
    })
  },
  defaultProps: {}
}
