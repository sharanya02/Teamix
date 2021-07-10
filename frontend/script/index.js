const signUpButton = document.getElementById('signUp')
const signInButton = document.getElementById('signIn')
const container = document.getElementById('container')
const signup = document.getElementById('signup-button')
const login = document.getElementById('login-button')

signUpButton.addEventListener('click', () => {
  container.classList.add('right-panel-active')
})

signInButton.addEventListener('click', () => {
  container.classList.remove('right-panel-active')
})
signup.addEventListener('click', (e) => {
  e.preventDefault()
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')

  const raw = JSON.stringify({
    username: document.getElementById('name-signup').value,
    email: document.getElementById('email-signup').value,
    password: document.getElementById('password-signup').value
  })

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  }

  fetch('https://sharanyaengage.herokuapp.com/api/v1/user/signup', requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log(result)
      const { jwt, data } = result
      localStorage.setItem('token', jwt)
      if (result.message == 'User Created') {
        window.location.href = 'home.html'
      } else {
        alert(result.message)
      }
    })
    .catch(error => console.log('error', error))
})

login.addEventListener('click', (e) => {
  e.preventDefault()
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')

  const raw = JSON.stringify({
    email: document.getElementById('email-login').value,
    password: document.getElementById('password-login').value
  })

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  }

  fetch('https://sharanyaengage.herokuapp.com/api/v1/user/login', requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log(result)
      const { jwt, data } = result
      localStorage.setItem('token', jwt)
      localStorage.removeItem('id')
      localStorage.setItem('id', result.data.userId)
      if (result.message == 'User Logged In') {
        window.location.href = 'home.html'
      } else {
        alert(result.message)
      }
    })
    .catch(error => console.log('error', error))
})
