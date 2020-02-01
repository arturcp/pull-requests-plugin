function saveOptions() {
  LocalStorage.write('authors', document.getElementById('authors').value);
  LocalStorage.write('organization', document.getElementById('organization').value);
  LocalStorage.write('token', document.getElementById('token').value);
  alert('Dados salvos com sucesso');
}

function restoreOptions() {
  document.getElementById('authors').value = LocalStorage.read('authors');
  document.getElementById('organization').value = LocalStorage.read('organization');
  document.getElementById('token').value = LocalStorage.read('token');
}

document.addEventListener('DOMContentLoaded', function() {
  restoreOptions();

  document.getElementById('save').addEventListener('click', saveOptions);
});
