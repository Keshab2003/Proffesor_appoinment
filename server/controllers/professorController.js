const Professor = require('../models/Professor');

// @desc    Get all professors
// @route   GET /api/professors
// @access  Private
exports.getAllProfessors = async (req, res) => {
    try {
        const professors = await Professor.find({});
        res.json(professors);
    } catch (error) {
        console.error('Error fetching professors:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get professor by ID
// @route   GET /api/professors/:id
// @access  Private
exports.getProfessorById = async (req, res) => {
    try {
        const professor = await Professor.findById(req.params.id);

        if (professor) {
            res.json(professor);
        } else {
            res.status(404).json({ message: 'Professor not found' });
        }
    } catch (error) {
        console.error('Error fetching professor:', error);
        res.status(500).json({ message: 'Server Error' });
    }
}; 