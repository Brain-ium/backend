const { callPythonAI } = require('../python-bridge');

exports.solveQuestion = async (req, res) => {
    const { context, question } = req.body;

    try {
        const aiResult = await callPythonAI(context, question);
        res.status(200).json({ answer: aiResult.answer });
    } catch (err) {
        res.status(500).json({ error: 'AI processing failed', details: err });
    }
};