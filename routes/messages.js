const router = require('express').Router()
const Group = require('../model/Groups')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const io = require('socket.io')

dotenv.config()