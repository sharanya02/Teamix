function loadTeam () {
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')
  myHeaders.append('Authorization', `Bearer ${localStorage.getItem('token')}`)

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    redirect: 'follow'
  }
  fetch('http://localhost:3000/api/v1/user/details/fetch', requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log(result)
      const { data } = result

      if (result.message == 'User details fetched successfully') {
        const container = document.querySelector('.container')

        for (let i = 0; i < ((result.user).Teams).length; i++) {
          const newDiv = document.createElement('div')
          const buttondiv = document.createElement('button')
          const buttondivtxt = document.createElement('p')
          const txt = document.createElement('p')
          const deleteTeam = document.createElement('button')
          const deletebtntxt = document.createElement('p')

          txt.innerText = (((result.user).Teams[i]).teamName)
          buttondivtxt.innerText = (((result.user).Teams[i]).teamName).charAt(0)
          deletebtntxt.innerText = 'x'

          buttondiv.id = ((result.user).Teams[i]).teamId
          buttondiv.onclick = () => storeteamdet(((result.user).Teams[i]).teamId)
          deleteTeam.onclick = () => deleteteam(((result.user).Teams[i]).teamId)

          newDiv.classList.add('teamdiv')
          buttondiv.classList.add('buttonteamdiv')
          txt.classList.add('teamnametxt')
          deleteTeam.classList.add('deleteTeam')
          deletebtntxt.classList.add('deletebtntxt')
          buttondivtxt.classList.add('buttondiv.txt')

          deleteTeam.appendChild(deletebtntxt)
          buttondiv.appendChild(buttondivtxt)
          newDiv.appendChild(buttondiv)
          newDiv.appendChild(deleteTeam)
          newDiv.appendChild(txt)
          container.appendChild(newDiv)
        }
      } else {
        alert(result.message)
      }
    })
    .catch(error => console.log('error', error))
}
function storeteamdet (id) {
  localStorage.removeItem('teamid')
  localStorage.setItem('teamid', id)
  location.href = 'teampage.html'
}
function deleteteam (id) {
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')
  myHeaders.append('Authorization', `Bearer ${localStorage.getItem('token')}`)

  const raw = JSON.stringify({
    teamId: id
  })

  console.log(raw)
  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  }

  fetch('http://localhost:3000/api/v1/team/delete', requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log(result)
      const { data } = result
      if (result.message == 'Team deleted successfully') {
        window.location.reload()
      } else {
        alert(result.message)
      }
    })
    .catch(error => console.log('error', error))
}
