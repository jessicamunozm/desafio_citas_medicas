import express from 'express'
import axios from 'axios'
import _ from 'lodash'
import chalk from 'chalk'
import moment from 'moment'
import {v4 as uuidv4} from 'uuid'

const app = express ()
const PORT = 3000
const API = 'https://randomuser.me/api/'
const users = []
const date = 'MMMM Do YYYY hh:mm:ss a'

app.use (express.static('public'))

app.get('/usuarios', async(req, res) => {
    try {
     const usersAPI = await axios.get(API)
     
     const {name, gender} = usersAPI.data.results[0]
     const id = uuidv4().slice(0,8)
     const time = moment().format(date)
     const user = {
        name: name.first,
        lastname: name.last,
        gender,
        id,
        time
     }
     users.push(user)
     
     const genderUser = _.partition(users, (user) => {
        return user.gender === 'female' 
     })

const template = `
<h1 style="font-family: Verdana; text-align: center; margin-top: 3rem"> Desafío Citas Médicas </h1>
<h4 style="font-family: Verdana; color: #434B4D; text-align: center; margin-top: 1rem"> Actualiza para cargar más pacientes</h4>
<h4 style="font-family: Verdana; color: #FFFFFF; text-align: center; padding: 0.5rem; margin-top: 1rem; background-color: black"> Mujeres </h4>
<ol style= "text-align: center">

    ${genderUser[0].map(user => {
        return `<li style="font-family: Verdana">Nombre: ${user.name} ${user.lastname} | id: ${user.id} | Hora: ${user.time} </li> <hr>` 
    })}
</ol> 
<h4 style="font-family: Verdana; color: #FFFFFF; text-align: center; padding: 0.5rem; margin-top: 1rem; background-color: black"> Hombres </h4>
<ol style= "text-align: center">
    ${genderUser[1].map(user => {
        return `<li style="font-family: Verdana">Nombre: ${user.name} ${user.lastname} | id: ${user.id} | Hora: ${user.time} </li> <hr>` 
    })}
    </ol>
    `

console.log (chalk.blue.bgWhite (`Nombre: ${user.name} ${user.lastname} | id: ${user.id} | Hora: ${user.time})`)) 
  
res.send(template);


    } catch (error) {
        console.error('error')
    }
})


app.listen (PORT, () => { console.log(`http://localhost:${PORT}`)})