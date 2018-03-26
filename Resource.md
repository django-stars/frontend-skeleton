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
При этом подобный код повторяется снова и сновва в каждом store файле и по сути отличаеться лишь наименованием функций и констант:

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

отличается от предыдущего тем что это single ресурс, и все запросы формируются на один и тот же endpoint.
при этом этом ресурс может быть предварительно создан на сервере, (тогда GET получает его первоначальное состояние) или же создается отдельно при помощи POST запроса.

```


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


## Options

