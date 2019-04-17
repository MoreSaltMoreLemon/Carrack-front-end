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

export function httpRequestGame(url, method='GET', jwt, data={}) {
  
  const init = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwt}`
    },
    method: method,
    body: stringify(data)
  }
  if (method.toLowerCase() === 'get') delete init.body;
  else if (method.toLowerCase() === 'post' && init.body.id) delete init.body.id;

  return fetch( url, init);
}

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