### DRAFT --  DRAFT --  DRAFT --  DRAFT --  DRAFT

## The goal

Когда мы работаем с REST-ресурсами, в 90% случаев, все что нам нужно это получить данные и отрендерить или забиндать в форму и сохранить после изменения.
Эта, довольно нетривиальная задача приводит к большому количеству однотипного кода. Что-то вроде:

```
// action types
const FETCH_USERS_LIST = Symbol('FETCH_USERS_LIST')
const FETCH_USER = Symbol('FETCH_USER')
const SAVE_USER = Symbol('SAVE_USER')
const CREATE_USER = Symbol('CREATE_USER')

// action creators
function fetchUsersList() {
  return {
    type: FETCH_USERS_LIST
  }
}

function fetchUser(id) {
  return {
    type: FETCH_USER,
    payload: id,
  }
}

function saveUser(id, data) {
  return {
    type: SAVE_USER,
    payload: data,
    meta: {id}
  }
}

function createUser(data) {
  return {
    type: CREATE_USER,
    payload: data,
  }
}

// reducers
// TODO
function users(state = {}, action) {
  switch(action.type) {
    case FETCH_USERS_LIST:
      return {...state, isLoading: true}
  }
}

// epics
// TODO
...
```

И этот пример не содержит обработку ошибок, фильтрацию, педжинцию, кеширование, JWT, options  и т.п.
При этом подобный код повторяется снова и снова в каждом store файле и по сути отличается лишь наименованием функций и констант:

```
fetchUsers
fetchBooks
fetchGroups
fetchComputers
fetchOrders
etc
```

Задача данного пакета ускорить написание этой рутины, оставив время "на подумать"

В данном пакете подразумевается что каждый API endpoint представляет собой REST ресурс.
Для начала разберемся с самими ресурсами. Здесь они разделяются на два типа:

1. Полноценный CRUD:
```
endpoint: /api/v1/users/:id

GET /api/v1/users/ - получить список юзеров
POST /api/v1/users/ - создать юзера
GET /api/v1/users/1 - получить юзера
PATCH /api/v1/users/1 - частично обновить юзера
POST /api/v1/users/1 - полностью обновить юзера (лучше использовать PATCH)
PUT /api/v1/users/1 - полностью перезаписать юзера (обычно не используем)
DELETE /api/v1/users/1 - удалить юзера
OPTIONS /api/v1/users/ - получить метаданные (обычно choices)
```

2. endpoint CRUD
```
endpoint: /api/v1/some/custom/endpoint
```
отличается от предыдущего тем что это single ресурс, и все запросы формируются на один и тот же endpoint.
при этом этом ресурс может быть предварительно создан на сервере, (тогда GET получает его первоначальное состояние) или же создается отдельно при помощи POST запроса.

resource.js предоставляет вам возможность приконектить такие ресурсы без особой сложности. практически одной строчкой кода:
```
connectResource(resource, options)

// где:
resource = {
 namespace: 'internalResourceName',
 endpoint: '/some/endpoint/with/:placeholders'
}
options = { /* доп опции, о них ниже */ }
```

в props получим такую структуру:
```
props.internalResourceName = {
  data: { /* ... resource data from API ... */ },
  isLoading: false, // or true,
  options: { /* parsed OPTIONS from API */ },
  errors: null, // or object with errors { },
  loading: 0, // number of currently loadings, used internaly
  
  // actions
  fetch: func, // GET request, useful when no prefetch
  create: func, // POST request
  save: func, // PATCH request
  update: func, // PATCH request, alias for save
  remove: func, // DELETE request
  replace: func, // PUT request if you need it
  fetchOptions: func, // OPTIONS request
  setData: func, // you can update data in store manually, but please be carefull with this action
  setErrors: func, // you can updates errors in store manually, but please be carefull with this action
  setFilters: func, // you can updates current filters in store manually, but please be carefull with this action
  
  filters: {}, // current applied filters
  filter: func, // action to re-fetch resource with new filters

  // filtering (using browser query) TODO
  withRouter: false, // or true
  navigate: func, // the same as filter({offset: newOffset})
}
```


## Options

почти все опции можно задавать как на уровне конфигурации ресурса, так и на уровне коннекта


#### `namespace : String|Array` [required]

property name for resource binding. e.g. for `namespace: 'test'` you will get resource in `props.test`
you can set it as array with two strings. useful for list resource. e.g for `namespace: ['books', 'book']` you will get `this.props.books` for list request, or `this.props.book` for single item request (see `list` option for details)

#### `endpoint : String` [optional] [default: value of namespace option]

will be set to `namespace` if ommited. resource endpoint name - where to get data from server.
can contains placeholders (see doc for `path-to-regexp` package for additional information). all you current props will be forwarded to `path-to-regexp`, plus one additional property `id` wich will be get by `idKey` (see below)

#### `list : Boolean` [optional] [default: false]

mark you resource as list resource. you endpoint should conins `:id?` placeholder, e.g. `accounts/:id?`
when you have id property (this props name can be changed via `idKey`) in props then the item resource will be binded. otherwice list. 

#### `idKey : String` [optional] [default: id]

name for the property that contains id for item. see `list` option for details

#### `prefetch : Boolean` [optional] [default: true]

should the resource be prefetched. if you set this to true you will get `props[namespace].data === null`. useful for custom resources that are not previously created on the server.

#### `refresh : Boolean` [optional] [default: false]

should the resource be refreshed when you render this component and the data for this resource already exists in store

#### `form : String|undefined` [optional] [default: undefined]

this property doesn't make sense when ommited. in `connectFormResource` this field is required
connect resource for redux-form. you should specify form name here for properly validation working. 
this option means that you will also get `initialValues` and `onSubmit` props. 
`initialValues` will be set to prefetched data from server, or empty object (when no `prefetch === false`)
`onSubmit` will do `create` (POST) for new items (`prefetch === false` means that item is new, for list resources missed id also means that the resource item is new). for existed items `onSubmit` will do `update` (PATCH)

#### `item : Boolean` [optional] [default: Boolean(form)]

used only for list resources, only inside options. will be set to true when form name is specified. this property means that we working with item inside list. sometimes you need to make "create item form". 

#### `options : Boolean` [optional] [default: false]

prefetch OPTIONS from endpoint (useful for geting choices for selects from API)

#### `async : Boolean` [optional] [default: false]

should the component be rendered without data

#### `filters : Object` [optional] [default: {}]

used with list resources. representing initial query for fetch request.


### Examples

```
compose(
  // ypu can omit this for create boook form. when id exists that ths is edit book form
  connect(_ => ({uuid: 'e4831316-9e2a-41b7-bb77-514318ac51ba'})),
  connectFormResource({
    namespace: ['books', 'book'],
    endpoint: 'books/:id?',
    list: true,
    options: true,
  }, {form: 'book'}),
  reduxForm({
    form: 'test',
  })

  // you can mix resources inside one component
  connectSingleResource({
    namespace: 'config', // ommited endpoint will be set to 'config'
  }),
)
```
