'use strict'

const router = require('express').Router()
const apiRoute = require('./api')

//Web API Router

router.use('/api', apiRoute)

module.exports = router
