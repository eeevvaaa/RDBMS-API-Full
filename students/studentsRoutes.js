const express = require('express');
const students = require('./studentsModel');
const router = express.Router();

router.get('/', (req, res) => {
  students
    .get()
    .then(students => {
      res.status(200).json(students);
    })
    .catch(err => res.status(500).json(err));
});

// get a student by id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const student = await students.getById(id);
    if (student) {
      res.status(200).json(student);
    } else {
      res.status(404).json({ message: 'Student not found' });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// create students
router.post('/', (req, res) => {
  const student = req.body;

  students
    .insert(student)
    .then(ids => {
      res.status(201).json(ids[0]);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// update students
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  students
    .update(id, changes)
    .then(count => {
      if (!count || count < 1) {
        res.status(404).json({ message: 'No records found to update' });
      } else {
        res.status(200).json(count);
      }
    })
    .catch(err => res.status(500).json(err));
});

// delete students
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  students
    .remove(id)
    .then(count => {
      if (!count || count < 1) {
        res.status(404).json({ message: 'No records found to delete' });
      } else {
        res.status(200).json(count);
      }
    })
    .catch(err => res.status(500).json(err));
});

module.exports = router;