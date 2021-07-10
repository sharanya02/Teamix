const tid = localStorage.getItem('teamid')
function startMeet () {
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
  fetch('http://localhost:3000/api/v1/post/meeting/create', requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log(result)
      const { data } = result
      if (result.message == 'Post Successfully Created') {
        window.location.reload()
        window.location.href = 'videocall.html'
      } else {
        alert(result.message)
      }
    })
    .catch(error => console.log('error', error))
}

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

  fetch('http://localhost:3000/api/v1/team/details/fetch', requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log(result)
      const { data } = result

      if (result.message == 'Team details fetched successfully') {
        const container = document.querySelector('.teamnamebox')
        const container2 = document.querySelector('.teamsbar')
        const mem = document.createElement('p')

        const name = result.team.teamName
        const letter = name.charAt(0)
        mem.innerText = ((result.team).Users).length + ' ' + 'members'

        const txt = document.createElement('p')
        const txt2 = document.createElement('p')

        txt.classList.add('teamnametxt')
        txt2.classList.add('teamtxt')
        mem.classList.add('member')

        txt.innerText = letter
        txt2.innerText = name

        container.appendChild(txt)
        container2.appendChild(txt2)
        container2.appendChild(mem)

        const postdiv = document.createElement('div')
        const posttxt = document.createElement('p')

        const postcontainer = document.querySelector('.postsection')
        for (let i = 0; i < ((result.team).Posts).length; i++) {
          if (((result.team).Posts[i]).isMeeting == false) {
            const postdiv = document.createElement('div')
            const posttxt = document.createElement('p')
            const deletebtn = document.createElement('button')
            const deletebtntxt = document.createElement('p')
            const logo = document.createElement('div')
            const logotxt = document.createElement('p')
            const logo2 = document.createElement('div')
            const logotxt2 = document.createElement('p')
            const like = document.createElement('button')
            const liketxt = document.createElement('p')

            posttxt.innerText = ((result.team).Posts[i]).postContent
            deletebtntxt.innerText = 'x'
            logotxt.innerText = result.team.Posts[i].User.userName
            logotxt2.innerText = result.team.Posts[i].User.userName.charAt(0)

            like.classList.add('like')
            liketxt.classList.add('fa', 'fa-heart', 'fa-6')
            logo2.classList.add('logot')
            logotxt2.classList.add('logotxtw')
            postdiv.classList.add('postdiv')
            posttxt.classList.add('posttxt')
            deletebtn.classList.add('deletebtn')
            deletebtntxt.classList.add('deletebtntxt')
            logo.classList.add('logo')
            logotxt.classList.add('logotxt')

            deletebtn.onclick = () => deletepost(((result.team).Posts[i]).postId)
            like.onclick = () => likepost(((result.team).Posts[i]).postId)

            like.appendChild(liketxt)
            postdiv.appendChild(like)
            logo2.appendChild(logotxt2)
            logo.appendChild(logotxt)
            postcontainer.appendChild(logo2)
            postdiv.appendChild(logo)
            deletebtn.appendChild(deletebtntxt)
            postdiv.appendChild(posttxt)

            if (result.team.Posts[i].userId == localStorage.getItem('id')) {
              postdiv.appendChild(deletebtn)
            }
            postcontainer.appendChild(postdiv)
          } else {
            const postdiv = document.createElement('div')
            const posttxt = document.createElement('p')
            const deletebtn = document.createElement('button')
            const deletebtntxt = document.createElement('p')
            const meet = document.createElement('button')
            const meetbtntxt = document.createElement('p')
            const logo = document.createElement('div')
            const logotxt = document.createElement('p')
            const logo2 = document.createElement('div')
            const logotxt2 = document.createElement('p')

            posttxt.innerText = ((result.team).Posts[i]).postContent
            deletebtntxt.innerText = 'x'
            meetbtntxt.innerText = 'Go to the meeting'
            logotxt.innerText = result.team.Posts[i].User.userName
            logotxt2.innerText = result.team.Posts[i].User.userName.charAt(0)

            logo2.classList.add('logot')
            logotxt2.classList.add('logotxtw')
            logo.classList.add('logo')
            logotxt.classList.add('logotxt')
            meet.classList.add('meet')
            meetbtntxt.classList.add('meetbtntxt')
            postdiv.classList.add('postdiv')
            posttxt.classList.add('posttxt')
            deletebtn.classList.add('deletebtn')
            deletebtntxt.classList.add('deletebtntxt')

            deletebtn.onclick = () => deletepost(((result.team).Posts[i]).postId)

            logo2.appendChild(logotxt2)
            logo.appendChild(logotxt)
            postcontainer.appendChild(logo2)
            postdiv.appendChild(logo)
            meet.appendChild(meetbtntxt)
            deletebtn.appendChild(deletebtntxt)
            postdiv.appendChild(meet)
            postdiv.appendChild(posttxt)

            if (result.team.Posts[i].userId == localStorage.getItem('id')) {
              postdiv.appendChild(deletebtn)
            }
            postcontainer.appendChild(postdiv)
          }
        }
        postcontainer.appendChild(document.createElement('br'))
        postcontainer.appendChild(document.createElement('br'))
        postcontainer.appendChild(document.createElement('br'))
        postcontainer.appendChild(document.createElement('br'))
        postcontainer.appendChild(document.createElement('br'))
        postcontainer.appendChild(document.createElement('br'))
        postcontainer.appendChild(document.createElement('br'))
        postcontainer.appendChild(document.createElement('br'))
        postcontainer.appendChild(document.createElement('br'))
      } else {
        alert(result.message)
      }
    })
    .catch(error => console.log('error', error))
}
function enterpost () {
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')
  myHeaders.append('Authorization', `Bearer ${localStorage.getItem('token')}`)

  const raw = JSON.stringify({
    teamId: tid,
    postContent: document.getElementById('postcont').value
  })

  console.log(raw)
  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  }

  fetch('http://localhost:3000/api/v1/post/create', requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log(result)
      const { data } = result
      if (result.message == 'Post Successfully Created') {
        window.location.reload()
      } else {
        alert(result.message)
      }
    })
    .catch(error => console.log('error', error))
}

function deletepost (id) {
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')
  myHeaders.append('Authorization', `Bearer ${localStorage.getItem('token')}`)

  const raw = JSON.stringify({
    postId: id
  })

  console.log(raw)
  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  }

  fetch('http://localhost:3000/api/v1/post/delete', requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log(result)
      const { data } = result
      if (result.message == 'Post Successfully Deleted') {
        window.location.reload()
      } else {
        alert(result.message)
      }
    })
    .catch(error => console.log('error', error))
}
