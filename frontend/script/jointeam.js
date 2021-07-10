const createTeamButton = document.getElementById('createTeam')
const joinTeamButton = document.getElementById('joinTeam')
const container = document.getElementById('container')
const create = document.getElementById('create-button')
const join = document.getElementById('join-button')

createTeamButton.addEventListener('click', () => {
  container.classList.add('right-panel-active')
})

joinTeamButton.addEventListener('click', () => {
  container.classList.remove('right-panel-active')
})
create.addEventListener('click', (e) => {
  e.preventDefault()
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')
  myHeaders.append('Authorization', `Bearer ${localStorage.getItem('token')}`)
  console.log(`Bearer ${localStorage.getItem('token')}`)
  const raw = JSON.stringify({
    teamName: document.getElementById('name-create').value
  })
  console.log(raw)
  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  }

  fetch('http://localhost:3000/api/v1/team/create', requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log(result)
      const { data } = result
      if (result.message == 'Team Successfully Created') {
        const ti = document.createElement('div')
        const titxt = document.createElement('p')
        const copybtn = document.createElement("button")

        titxt.innerText = (result.team).teamId
        ti.value = (result.team).teamId
        copybtn.innerText = "copy"

        copybtn.onclick = () => copy()

        ti.classList.add('teamid')
        titxt.classList.add('teamidtxt')
        copybtn.classList.add('copybtn')


        ti.appendChild(titxt)
        ti.appendChild(copybtn)
        document.body.appendChild(ti)
      } else {
        alert(result.message)
      }
    })
    .catch(error => console.log('error', error))
})

function copy(){
var copyText = document.getElementById("teamidtxt")
copyText.querySelector();
document.execCommand("copy")
alert("copied:"+copyText.value)
}
join.addEventListener('click', (e) => {
  e.preventDefault()
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')
  myHeaders.append('Authorization', `Bearer ${localStorage.getItem('token')}`)

  const raw = JSON.stringify({
    teamId: document.getElementById('teamId').value
  })

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  }

  fetch('http://localhost:3000/api/v1/team/user/join', requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log(result)
      const { data } = result
      localStorage.setItem('token')
      if (result.message == 'Team joined successfully') {
        window.location.href = 'home.html'
      } else {
        alert(result.message)
      }
    })
    .catch(error => console.log('error', error))
})
