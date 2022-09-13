let html = document.body.parentNode

export default (elOrKey, key) => {
  const el = (key === undefined) ? html : elOrKey
  const actualKey = key || elOrKey
  el.dataset[actualKey] = (el.dataset[actualKey] === '1') ? '0' : '1'
}
