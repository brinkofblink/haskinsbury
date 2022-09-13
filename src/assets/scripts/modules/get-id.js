const ids = [];

export default (id) => (ids[id] === undefined) ? ids[id] = document.getElementById(id) : ids[id]
