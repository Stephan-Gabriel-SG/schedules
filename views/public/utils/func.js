const modifyDialog = document.getElementById('modifyDialog')
const dialogCancelBtn = document.getElementById('cancelBtn')
const dialogConfirmBtn = document.getElementById('confirmBtn')
const form = document.getElementById('dialogForm')
const deleteRecord = (id) => {
  if (
    window.confirm(
      `vous etez-sûre de vouloir supprimer l'enregistrement n°${id}`
    )
  ) {
    fetch(`/api/schedules/delete/${id}`, { method: 'DELETE' })
      .then((res) => {
        if (res.success) {
          alert('suppression avec succes')
        } else {
          alert("Échec de la suppression de l'enregistrement")
        }
        location.reload()
      })
      .catch((error) => alert(error))
  }
}
const modifyRecord = (detail) => {
  console.log('modify', detail)
  document.getElementById('idRecord').value = detail.id
  document.getElementById('module').value = detail.module
  document.getElementById('enseignant').value = detail.prof
  document.getElementById('credit').value = detail.credit
  document.getElementById('niveau').value = detail.niveau
  document.getElementById('dateRecord').value = detail.date
  document.getElementById('salle').value = detail.salle
  modifyDialog.showModal()
}
dialogCancelBtn.addEventListener('click', (event) => {
  event.preventDefault()
  modifyDialog.close()
})
form.addEventListener('submit', (event) => {
  event.preventDefault()
  let id = document.getElementById('idRecord').value
  let module = document.getElementById('module').value
  let prof = document.getElementById('enseignant').value
  let credit = document.getElementById('credit').value
  let niveau = document.getElementById('niveau').value
  let date_ = document.getElementById('dateRecord').value
  let salle = document.getElementById('salle').value
  let data = { id, module, prof, credit, niveau, date_, salle }
  console.log('data:', data)
  fetch('/api/schedules/update', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      if (res.success) {
        alert(`l'enregistremen n° ${id} a été mise à jour avec succès`)
      } else {
        alert(`Échec de la mise à jour de l'enregistremen n° ${id}`)
      }
    })
    .catch((error) => alert(`Erreur de la mise à jour ${error}`))
  modifyDialog.close()
})
