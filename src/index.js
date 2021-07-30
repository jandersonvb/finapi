const express = require('express')
const { v4: uuidv4 } = require('uuid')

const app = express()

app.use(express.json())

/**
 * cpf - string
 * name - string
 * id - uuid
 * statement - [])
 */

const customers = []

/** Middleware */
function verifyExistsAccountCPF(request, response, next) {
  const { cpf } = request.headers

  const customer = customers.find(customer => customer.cpf === cpf)

  if (!customer) {
    return response.status(400).json({ error: 'Customer not found' })
  }

  request.customer = customer

  return next()
}

function getBalance(statement) {
  const balance = statement.reduce((acc, operation) => {
<<<<<<< HEAD
    if (operation.type === 'credit') {
=======
    if(operation.type === 'credit') {
>>>>>>> ee0787bab40bd6fed357ac41a15de0555596cc2d
      return acc + operation.amount
    } else {
      return acc - operation.amount
    }
  }, 0)

  return balance
}

/** Create account */
app.post('/account', (request, response) => {
  const { cpf, name } = request.body

  const customerAlreadyExists = customers.some(customer => customer.cpf === cpf)

  if (customerAlreadyExists) {
    return response.status(400).json({ error: 'Customer already exists' })
  }

  customers.push({
    cpf,
    name,
    id: uuidv4(),
    statement: []
  })

  return response.status(201).send()
})

/** Listing bank statement  */
app.get('/statement', verifyExistsAccountCPF, (request, response) => {
  const { customer } = request

  return response.json(customer.statement)
})

/** Deposit route */
app.post('/deposit', verifyExistsAccountCPF, (request, response) => {
  const { description, amount } = request.body

  const { customer } = request 

  const statementOperation = {
    description,
    amount,
    created_at: new Date(), 
    type: 'credit'
  }

  customer.statement.push(statementOperation)

  return response.status(201).send()
})

<<<<<<< HEAD
/** Withdraw route (Saque bancário) */
=======
/**Saque (Withdraw) */
>>>>>>> ee0787bab40bd6fed357ac41a15de0555596cc2d
app.post('/withdraw', verifyExistsAccountCPF, (request, response) => {
  const { amount } = request.body

  const { customer } = request

  const balance = getBalance(customer.statement)

  if (balance < amount) {
<<<<<<< HEAD
    return response.status(400).json({ error: 'Insufficient funds!' })
=======
    return response.status(400).json({ error: 'Insufficient founds!' })
>>>>>>> ee0787bab40bd6fed357ac41a15de0555596cc2d
  }

  const statementOperation = {
    amount,
    created_at: new Date(),
    type: 'debit'
  }

  customer.statement.push(statementOperation)

  return response.status(201).send()
<<<<<<< HEAD
})

app.get('/statement/date', verifyExistsAccountCPF, (request, response) => {
  const { date } = request.query

  const { customer } = request

  const dateFormat = new Date(date + ' 00:00')

  const statement = customer.statement.filter(
    statement =>
      statement.created_at.toDateString() ===
      new Date(dateFormat).toDateString()
  )

  return response.json(statement)
=======

>>>>>>> ee0787bab40bd6fed357ac41a15de0555596cc2d
})

app.listen(3333, () => {
  console.log('✔ Started on port 3333')
})