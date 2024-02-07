const scheduleRoute = require('express').Router()
const { Schedule } = require('../model/Schedule')
/**
 * @swagger
 * /api/schedules:
 *   get:
 *     summary: Récupère la liste des enregistrements d'EDT
 *     responses:
 *       200:
 *         description: Succès
 *       500:
 *         description: Erreur serveur
 */
scheduleRoute.get('/', (req, res, next) => {
  Schedule.findAll({})
    .then((result) => res.status(200).send({ list: result }))
    .catch((error) => res.status(500).send({ error: error }))
})
/**
 * @swagger
 * /api/schedules/{id}:
 *   get:
 *     summary: Récupère un seul enregistrement par son id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de l'enregistrement à récupérer
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Succès
 *       400:
 *         description: Requête invalide - ID non valide
 *       500:
 *         description: Erreur serveur
 */

scheduleRoute.get('/:id', (req, res, next) => {
  Schedule.findOne({ where: { id: req.params.id } })
    .then((sc) => {
      if (sc) {
        res.status(200).send(sc)
      } else {
        res.status(400).send({ error: 'invalid id' })
      }
    })
    .catch((error) => res.status(500).send({ error: error }))
})
/**
 * @swagger
 * /api/schedules/add:
 *   post:
 *     summary: Ajoute un nouvel enregistrement
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               module:
 *                 type: string
 *               prof:
 *                 type: string
 *               credit:
 *                 type: integer
 *               niveau:
 *                 type: string
 *               salle:
 *                 type: string
 *               date_:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       201:
 *         description: Enregistrement ajouté avec succès
 *       400:
 *         description: Requête invalide - l'un des champs ne respecte pas le format requis
 *       500:
 *         description: Erreur serveur
 */
scheduleRoute.post('/add', async (req, res, next) => {
  try {
    const { module, prof, credit, niveau, salle, date_ } = req.body
    // Vérification du type de données et non-vide pour chaque champ
    const fieldsToCheck = [
      { field: module, fieldName: 'module', type: 'string' },
      {
        field: prof,
        fieldName: 'prof',
        type: 'string',
        validation: /^[^\d\s]+$/,
      },
      { field: credit, fieldName: 'credit', type: 'number' },
      {
        field: niveau,
        fieldName: 'niveau',
        type: 'string',
        validation: /^(L[1-3]|M[1-2])$/,
      },
      { field: salle, fieldName: 'salle', type: 'string' },
      { field: date_, fieldName: 'date_', type: 'string' },
    ]

    for (const { field, fieldName, type, validation } of fieldsToCheck) {
      if (typeof field !== type || field.trim() === '') {
        return res.status(400).send({
          error: `Le champ "${fieldName}" doit être une ${type} non vide.`,
        })
      }

      if (validation && !validation.test(field)) {
        return res.status(400).send({
          error: `Le champ "${fieldName}" ne respecte pas le format requis.`,
        })
      }
    }

    const newSchedule = await Schedule.create({
      module,
      prof,
      credit,
      niveau,
      salle,
      date_,
    })
    res.status(201).send({ result: newSchedule })
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
})
/**
 * @swagger
 * /api/schedules/delete/{id}:
 *   delete:
 *     summary: Supprime un enregistrement par son ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de l'enregistrement à supprimer
 *         schema:
 *           type: integer
 *     responses:
 *       201:
 *         description: Enregistrement supprimé avec succès
 *       400:
 *          description: Requête invalide - Données invalides
 *       500:
 *         description: Erreur serveur
 */
scheduleRoute.delete('/delete/:id', async (req, res, next) => {
  console.log(req.params.id)
  Schedule.destroy({ where: { id: req.params.id } })
    .then((result) => {
      if (result) {
        res.status(201).send({ record: result })
      } else {
        res.status(400).send({ error: 'invalid id' })
      }
    })
    .catch((error) => res.status(500).send({ error }))
})
/**
 * @swagger
 * /api/schedules/update/{id}:
 *   put:
 *     summary: Met à jour un enregistrement par son ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de l'enregistrement à mettre à jour
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               module:
 *                 type: string
 *               prof:
 *                 type: string
 *               credit:
 *                 type: integer
 *               niveau:
 *                 type: string
 *               salle:
 *                 type: string
 *               date_:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: Enregistrement mis à jour avec succès
 *       400:
 *         description: Requête invalide - ID non valide
 *       500:
 *         description: Erreur serveur
 */
scheduleRoute.put('/update/:id', async (req, res, next) => {
  console.log('body:', req.body)
  const body = req.body
  Schedule.update(body, { where: { id: req.params.id } })
    .then((result) => {
      if (result) {
        res.status(200).send({ record: result })
      } else {
        res.status(400).send({ error: 'invalid id' })
      }
    })
    .catch((error) => res.status(500).send({ error }))
})
module.exports = scheduleRoute
