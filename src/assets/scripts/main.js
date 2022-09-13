// Focus Visible Polyfill
import 'focus-visible'

// Internal Modules
import './modules/sunset'

let savedId = localStorage.getItem('list-subscriber-id');
if (!savedId) {
  let params = new URLSearchParams(document.location.search.substring(1));
  let id = params.get("id")
  if (id) {
    localStorage.setItem('list-subscriber-id', id);
    savedId = id
  }
}
const idElement = document.querySelector('[data-tf-hidden]')
if (savedId && idElement) {
  idElement.dataset.tfHidden = `id=${savedId}`
}