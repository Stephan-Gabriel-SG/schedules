//ADD RECORD
const addForm = document.getElementById('addForm')
const addRecordService = (newData) => {
  fetch('/api/schedules/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newData),
  })
    .then((res) => {
      if (res.status === 201) {
        alert('Ajout avec succès')
        location.reload()
      } else {
        alert("Echec de l'ajout")
      }
    })
    .catch((error) =>
      alert(`Erreur de l'ajout du nouvel enregistrement.${error}`)
    )
}
addForm.addEventListener('submit', (event) => {
  event.preventDefault()
  let module = document.getElementById('module'.toUpperCase()).value
  let prof = document.getElementById('prof'.toUpperCase()).value
  let credit = document.getElementById('credit'.toUpperCase()).value
  let niveau = document.getElementById('niveau'.toUpperCase()).value
  let date_ = document.getElementById('date'.toUpperCase()).value
  let salle = document.getElementById('salle'.toUpperCase()).value
  let data = { module, prof, credit, niveau, date_, salle }
  console.log('data:', data)
  addRecordService(data)
})
