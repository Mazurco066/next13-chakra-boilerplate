// Dependencies
import { FC } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { requestClient } from '@/infra/services/http'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

// Layout and Components
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  InputGroup,
  Link,
  Text,
  useToast,
  useColorModeValue,
  UseToastOptions
} from '@chakra-ui/react'

// Sign in component
const LogInView: FC = () => {
  // Hooks
  const toast = useToast()
  const router = useRouter()
  const { t: common } = useTranslation('common')
  const { t } = useTranslation('login')
  const { register, handleSubmit, formState: { errors } } = useForm()

  // Color hooks
  const bgBox = useColorModeValue('gray.50', 'gray.800')

  // Login request
  const { isLoading, mutateAsync } = useMutation((data: any) => {
    return requestClient('/api/login', 'post', data)
  })

  // Generic error msg
  const genericMsg: UseToastOptions = {
    title: common('messages.internal_error_title'),
    description: common('messages.internal_error_msg'),
    status: 'error',
    duration: 5000,
    isClosable: true
  }

  // Actions
  const onSubmit = async (data: any) => {
    // Request api
    const response = await mutateAsync(data)
    if ([200].includes(response.status)) {
      //mutateUser(response.data)
    } else {
      if ([401, 403, 404].includes(response.status)) {
        toast({
          title: t('messages.incorrect_login_title'),
          description: t('messages.incorrect_login_msg'),
          status: 'info',
          duration: 2000,
          isClosable: true
        })
      } else {
        toast(genericMsg)
      }
    }
  }
  
  // View JSX
  return (
    <Container maxWidth="6xl">
      <Box p="5" borderRadius="lg" bg={bgBox}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl mb="5" isDisabled={isLoading}>
            <FormLabel>{t('form.user_label')}</FormLabel>
            <InputGroup>
       
              <Input
                type="text"
                placeholder={t('form.user_label').toString()}
                {...register('username', { required: true })}
              />
            </InputGroup>
            {errors.username ? (
              <FormHelperText color="red.500">{t('messages.required_field_msg')}</FormHelperText>
            ) : (
              <FormHelperText>{t('form.user_hint')}</FormHelperText>
            )}
          </FormControl>
          <FormControl mb="5" isDisabled={isLoading}>
            <FormLabel>{t('form.password_label')}</FormLabel>
            <InputGroup>
              <Input
                type="password"
                placeholder={t('form.password_label').toString()}
                {...register('password', { required: true })}
              />
            </InputGroup>
            {errors.password ? (
              <FormHelperText color="red.500">{t('messages.required_field_msg')}</FormHelperText>
            ) : (
              <FormHelperText>{t('form.password_hint')}</FormHelperText>
            )}
          </FormControl>
          <Text textAlign="center" mb="3">
            <Link
              fontWeight="bold"
              color="secondary.500"
              onClick={() => router.push('/forgotPassword')}
            >
              {t('form.forgot_password')}
            </Link>
          </Text>
          <Button
            disabled={isLoading}
            variant="fade"
            type="submit"
            width="full"
            mb="3"
          >
            {t('form.button')}
          </Button>
          <Text
            textAlign="center"
          >
            {t('form.no_account')}
            <Link
              fontWeight="bold"
              color="secondary.500"
              onClick={() => router.push('/signup')}
            >
              {t('form.create_account')}
            </Link>
          </Text>
        </form>
      </Box>
    </Container>
  )
}

// Exporting component
export default LogInView
