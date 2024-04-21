app.post('/bots', async (req, res) => {
    const { botType, botMission } = req.body;

    if (!botType || !botMission) {
        return res.status(400).json({ message: 'Bot type and mission are required' });
    }

    try {
        const newBot = new Bot({
            botType: botType,
            botMission: botMission
        });

        const savedBot = await newBot.save();
        res.status(201).json(savedBot);
    } catch (error) {
        console.error('Error saving new bot:', error);
        res.status(500).json({ message: 'Failed to create new bot', error: error.message });
    }
});
app.post('/bots/update', async (req, res) => {
    const { id, botType, botMission, missionsDone } = req.body;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid or missing bot ID" });
    }

    try {
        const updatedBot = await Bot.findByIdAndUpdate(
            id,
            { $set: { botType, botMission, missionsDone }},
            { new: true, runValidators: true }
        );

        if (!updatedBot) {
            return res.status(404).json({ message: "Bot not found with provided ID." });
        }

        res.json(updatedBot);
    } catch (error) {
        console.error('Error updating bot:', error);
        res.status(500).json({ message: 'Failed to update bot', error: error.message });
    }
});

module.exports = router;
