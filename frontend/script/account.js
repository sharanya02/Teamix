function loadInfo() {
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
                const container = document.querySelector('.box')
                const containersec = document.querySelector('.section')
                const name = document.createElement("p")
                const emailid = document.createElement("p")
                const teamno = document.createElement("p")
                const round = document.createElement("div")
                const roundtxt = document.createElement("p")

                name.innerText = ((result.user).userName)
                emailid.innerText = ((result.user).email)
                teamno.innerText = ((result.user).Teams).length
                roundtxt.innerText = ((result.user).userName).charAt(0)

                name.classList.add('name')
                emailid.classList.add('emailid')
                teamno.classList.add('teamno')
                round.classList.add('round')
                roundtxt.classList.add('roundtxt')

                round.appendChild(roundtxt)
                containersec.appendChild(round)
                containersec.appendChild(name)
                containersec.appendChild(emailid)
                containersec.appendChild(teamno)
                // containersec.appendChild(container)
            }
            else {
                alert(result.message)
            }
        })
        .catch(error => console.log('error', error))
}