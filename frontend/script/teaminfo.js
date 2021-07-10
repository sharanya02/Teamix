const tid = localStorage.getItem('teamid')
function loadTeam () {
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')
  myHeaders.append('Authorization', `Bearer ${localStorage.getItem('token')}`)

  const raw = JSON.stringify({
    teamId: tid
  })
  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  }

  fetch('https://sharanyaengage.herokuapp.com/api/v1/team/details/fetch', requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log(result)
      const { data } = result

      if (result.message == 'Team details fetched successfully') {
        const postcontainer = document.querySelector('.member')

        const tid = document.createElement('div')
        const tidtxt = document.createElement('p')

        tidtxt.innerText = (result.team).teamId

        tid.classList.add('tid')
        tidtxt.classList.add('tidtxt')

        tid.appendChild(tidtxt)
        postcontainer.appendChild(tid)
        for (let i = 0; i < ((result.team).Users).length; i++) {
          const memblock = document.createElement('div')
          const mem = document.createElement('P')
          const del = document.createElement('button')
          const deltxt = document.createElement('p')

          deltxt.innerText = 'x'
          mem.innerText = ((result.team).Users[i]).userName

          memblock.classList.add('memblock')
          mem.classList.add('mem')
          del.classList.add('del')
          deltxt.classList.add('deltxt')

          del.appendChild(deltxt)
          memblock.appendChild(mem)
          memblock.appendChild(del)

          if ((((result.team).Users[i]).User_Teams).isHost == true) {
            const host = document.createElement('p')
            host.innerText = '(HOST)'

            host.classList.add('host')

            memblock.appendChild(host)
          }

          postcontainer.appendChild(memblock)
        }
      } else {
        alert(result.message)
      }
    })
    .catch(error => console.log('error', error))
}
