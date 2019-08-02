function save_options() {
  LocalStorage.write('authors', document.getElementById('authors').value);
  alert('Dados salvos com sucesso');
}

function restore_options() {
  var authors = LocalStorage.read('authors');
  document.getElementById('authors').value = authors;
}

document.addEventListener('DOMContentLoaded', function() {
  restore_options();

  document.getElementById('save').addEventListener('click', save_options);
});
