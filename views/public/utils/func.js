const deleteRecord = (id) => {
  if (
    window.confirm(
      `vous etez-sûre de vouloir supprimer l'enregistrement n°${id}`
    )
  ) {
    fetch(`/api/schedules/delete/${id}`, { method: 'DELETE' })
      .then((res) => {
        alert('suppression avec succes')
        location.reload()
      })
      .catch((error) => alert(error))
  }
}
const modifyRecord = (detail) => {
  console.log('modify', detail)
}
