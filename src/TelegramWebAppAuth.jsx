import axios from 'axios'
import { useEffect } from 'react'

function TelegramWebAppAuth() {
  useEffect(() => {
    const tg = window.Telegram.WebApp

    const user = tg.initDataUnsafe?.user

    if (user) {
      axios
        .post('http://localhost:5000/api/auth/telegram', user)
        .then((res) => {
          console.log('Успішна авторизація:', res.data)
          localStorage.setItem('token', res.data.token)
        })
        .catch((err) => {
          console.error('Помилка авторизації:', err)
        })
    } else {
      console.error('Дані користувача Telegram WebApp недоступні')
    }
  }, [])

  return <div>Авторизація через Telegram WebApp...</div>
}

export default TelegramWebAppAuth
