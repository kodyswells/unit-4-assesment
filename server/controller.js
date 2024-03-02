const fortunes = ["A dubious friend may be an enemy in camouflage.", "A good time to finish up old tasks.", "A pleasant surprise is waiting for you.", "A truly rich life contains love and art in abundance.", "New ideas could be profitable."];
module.exports = {

    getCompliment: (req, res) => {
        const compliments = ["Gee, you're a smart cookie!", "Cool shirt!", "Your Javascript skills are stellar."];
      
        // choose random compliment
        let randomIndex = Math.floor(Math.random() * compliments.length);
        let randomCompliment = compliments[randomIndex];
      
        res.status(200).send(randomCompliment);
    },

    getFortune: (req, res) => {
        

        let randomIndex = Math.floor(Math.random() * fortunes.length);
        let randomFortune = fortunes[randomIndex];

        res.status(200).json(randomFortune);
    },

    getFortunes: (req, res) => {
        res.status(200).json(fortunes);
    },

    postFortune: (req, res) => {
        const { newFortune } = req.body;
        fortunes.push(newFortune);
        res.status(200).send("Fortune added successfully");
    },
    updateFortune: (req, res) => {
        const { index, newFortune } = req.body;
        if(fortunes[index] !== undefined) {
            fortunes[index] = newFortune;
            res.status(200).send("Fortune updated successfully");
        } else {
            res.status(404).send("Fortune not found");
        }
    },
    deleteFortune: (req, res) => {
        const { index } = req.params;
        if(fortunes[index] !== undefined) {
            fortunes.splice(index, 1);
            res.status(200).send(`Fortune at index ${index} deleted successfully.`);
        } else {
            res.status(404).send("Fortune not found.");
        }
    },

}