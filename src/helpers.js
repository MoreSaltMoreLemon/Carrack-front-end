import { stringify } from 'flatted/esm'

export function httpRequest(url, method='GET', data={}) {
  const init = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: method,
    body: JSON.stringify(data)
  }
  if (method.toLowerCase() === 'get') delete init.body;
  else if (method.toLowerCase() === 'post' && init.body.id) delete init.body.id;

  return fetch( url, init);
}

// Modified version of httpRequest for JSON Web Token authorization requests
// must have an "Authorization": "Bearer 1258wtint298pgnp4q3" token included in
// the request in order to pass server side authentication
// httpRequestJWT :: (url: string, method: string, jwt: string, data: {}) -> Promise
export function httpRequestJWT(url, method='GET', jwt, data={}) {
  const init = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwt}`
    },
    method: method,
    body: JSON.stringify(data)
  }
  if (method.toLowerCase() === 'get') delete init.body;
  else if (method.toLowerCase() === 'post' && init.body.id) delete init.body.id;

  return fetch( url, init);
}

// Used to position elements on a grid of arbitrary size. Returns strings
// which correspond to the grid-template-area, as determined by the x,y
// coordinates. E.g. 
// x: 0, y: 1, boardsize: 8 -> 'a', 
// x: 2, y: 2, boardsize: 8 -> 's'
// x: 7, y: 7, boardsize: 8 -> 'lll'
// gridPlacement :: (x: int, y: int, size: int) -> string
export function gridPlacement(x, y, size) {
  const abc = 'abcdefghijklmnopqrstuvwxyz'
  let placement = ''
  let idx = (y * size) + x

  while (idx >= 0) {
    placement += abc[idx % 26]
    idx -= 26
  }

  return placement
}

// Generates the grid-template-area strings which correspond to 
// the output of the gridPlacement function
// " "a b c d" "e f g h" " ...
// generateBoardGrid :: (size: int) -> string
export function generateBoardGrid(size) {
  const columns = []

  for (let c = 0; c < size; c++) {
    let row = gridPlacement(0, c, size)
    for (let r = 1; r < size; r++) {
      row += ' ' + gridPlacement(r, c, size)
    }
    row = `"${row}"`
    columns.push(row)

  }
  return columns.reverse().join(" ")
}