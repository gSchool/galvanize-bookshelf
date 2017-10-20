router.get('/', function (req, res, next) {
  // code goes here
})

router.get('/:id', function (req, res, next) {
  const id = req.params.id
  // code goes here
})

router.post('/', function (req, res, next) {
  const { item } = req.body
  // code goes here
})

router.patch('/:id', function (req, res, next) {
  const id = req.params.id
  const { item } = req.body
  // code goes here
})

router.delete('/:id', function (req, res, next) {
  const id = req.params.id
  // code goes here
})
