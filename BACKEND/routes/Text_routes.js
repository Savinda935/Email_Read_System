const router = require("express").Router();
const Text = require("../models/Text_models");
const mongoose = require("mongoose");

// Read all texts
router.get("/", (req, res) => {
    Text.find()
        .then((texts) => res.json(texts))
        .catch((err) => {
            console.error(err);
            res.status(500).json({ status: "Error fetching texts", error: err.message });
        });
});

// Update a text by ID
router.put("/update/:id", async (req, res) => {
    const textId = req.params.id;
    const { text } = req.body;

    const updateText = {
        text,
    };

    try {
        const updatedText = await Text.findByIdAndUpdate(textId, updateText, { new: true });
        if (updatedText) {
            res.status(200).json({ status: "Text updated", text: updatedText });
        } else {
            res.status(404).json({ status: "Text not found" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "Error updating Text", error: err.message });
    }
});

// Delete a text by ID
router.delete("/delete/:id", async (req, res) => {
    const textId = req.params.id;

    try {
        const deletedText = await Text.findByIdAndDelete(textId);
        if (deletedText) {
            res.status(200).json({ status: "Text deleted" });
        } else {
            res.status(404).json({ status: "Text not found" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "Error deleting Text", error: err.message });
    }
});

// Extract specific fields from the email message
router.post("/extract", (req, res) => {
    const { emailMessage } = req.body;

    if (!emailMessage) {
        return res.status(400).json({ status: "Error", message: "Email message is required" });
    }

    try {
        // Refined regular expressions to extract the required fields
        const dateMatch = emailMessage.match(/date=([\d-]+)/);
        const timeMatch = emailMessage.match(/time=([\d:]+)/);
        const intrusionObservedMatch = emailMessage.match(/The following intrusion was observed: ([^:]+)/i);
        const devnameMatch = emailMessage.match(/devname=([\w-]+)/);
        const srcipMatch = emailMessage.match(/srcip=([\d.]+)/);
        const dstipMatch = emailMessage.match(/dstip=([\d.]+)/);
        const dstcountryMatch = emailMessage.match(/dstcountry="([^"]+)"/i);
        const crlevelMatch = emailMessage.match(/crlevel="([^"]+)"/i);
        const attackMatch = emailMessage.match(/attack="([^"]+)"/i);

        // Extracted values
        const extractedData = {
            date: dateMatch ? dateMatch[1] : null,
            time: timeMatch ? timeMatch[1] : null,
            intrusion_observed: intrusionObservedMatch ? intrusionObservedMatch[1].trim() : null,
            devname: devnameMatch ? devnameMatch[1] : null,
            srcip: srcipMatch ? srcipMatch[1] : null,
            dstip: dstipMatch ? dstipMatch[1] : null,
            dstcountry: dstcountryMatch ? dstcountryMatch[1] : null,
            crlevel: crlevelMatch ? crlevelMatch[1] : null,
            attack: attackMatch ? attackMatch[1] : null,
        };

        res.status(200).json({ status: "Success", data: extractedData });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "Error", message: "Failed to process the email message" });
    }
});

// Get extracted data from all textshnijinn
router.get("/extract", async (req, res) => {
    try {
        const texts = await Text.find();
        if (!texts || texts.length === 0) {
            return res.status(404).json({ status: "Error", message: "No texts found" });
        }

        const extractedData = texts.map((text) => {
            const emailMessage = text.text;

            // Regular expressions to extract the required fields
            const dateMatch = emailMessage.match(/date=([\d-]+)/);
            const timeMatch = emailMessage.match(/time=([\d:]+)/);
            const intrusionObservedMatch = emailMessage.match(/intrusion_observed=([\w\s]+)/i); // Case-insensitive match
            const devnameMatch = emailMessage.match(/devname=([\w-]+)/);
            const srcipMatch = emailMessage.match(/srcip=([\d.]+)/);
            const dstipMatch = emailMessage.match(/dstip=([\d.]+)/);
            const dstcountryMatch = emailMessage.match(/dstcountry=([\w\s]+)/i); // Case-insensitive match
            const crlevelMatch = emailMessage.match(/crlevel=([\w\s]+)/);
            const attackMatch = emailMessage.match(/attack=([\w\s]+)/i); // Case-insensitive match

            // Extracted values
            return {
                id: text._id,
                date: dateMatch ? dateMatch[1] : null,
                time: timeMatch ? timeMatch[1] : null,
                intrusion_observed: intrusionObservedMatch ? intrusionObservedMatch[1] : null,
                devname: devnameMatch ? devnameMatch[1] : null,
                srcip: srcipMatch ? srcipMatch[1] : null,
                dstip: dstipMatch ? dstipMatch[1] : null,
                dstcountry: dstcountryMatch ? dstcountryMatch[1] : null,
                crlevel: crlevelMatch ? crlevelMatch[1] : null,
                attack: attackMatch ? attackMatch[1] : null,
            };
        });

        res.status(200).json({ status: "Success", data: extractedData });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "Error", message: "Failed to process texts" });
    }
});

// Get extracted data by ID
router.get("/extract/:id", async (req, res) => {
    const textId = req.params.id;

    // Validate the ID format
    if (!mongoose.Types.ObjectId.isValid(textId)) {
        return res.status(400).json({ status: "Error", message: "Invalid ID format" });
    }

    try {
        const text = await Text.findById(textId);
        if (!text) {
            return res.status(404).json({ status: "Error", message: "Text not found" });
        }

        // Regular expressions to extract the required fields
        const emailMessage = text.text;
        const dateMatch = emailMessage.match(/date=([\d-]+)/);
        const timeMatch = emailMessage.match(/time=([\d:]+)/);
        const intrusionObservedMatch = emailMessage.match(/intrusion_observed=([\w\s]+)/i); // Case-insensitive match
        const devnameMatch = emailMessage.match(/devname=([\w-]+)/);
        const srcipMatch = emailMessage.match(/srcip=([\d.]+)/);
        const dstipMatch = emailMessage.match(/dstip=([\d.]+)/);
        const dstcountryMatch = emailMessage.match(/dstcountry=([\w\s]+)/i); // Case-insensitive match
        const crlevelMatch = emailMessage.match(/crlevel=([\w\s]+)/);
        const attackMatch = emailMessage.match(/attack=([\w\s]+)/i); // Case-insensitive match

        // Extracted values
        const extractedData = {
            date: dateMatch ? dateMatch[1] : null,
            time: timeMatch ? timeMatch[1] : null,
            intrusion_observed: intrusionObservedMatch ? intrusionObservedMatch[1] : null,
            devname: devnameMatch ? devnameMatch[1] : null,
            srcip: srcipMatch ? srcipMatch[1] : null,
            dstip: dstipMatch ? dstipMatch[1] : null,
            dstcountry: dstcountryMatch ? dstcountryMatch[1] : null,
            crlevel: crlevelMatch ? crlevelMatch[1] : null,
            attack: attackMatch ? attackMatch[1] : null,
        };

        res.status(200).json({ status: "Success", data: extractedData });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "Error", message: "Failed to process the email message" });
    }
});

// Get extracted data from the last inserted text
router.get("/extract/last", async (req, res) => {
    try {
        const lastText = await Text.findOne().sort({ _id: -1 }); // Sort by _id in descending order to get the latest document
        if (!lastText) {
            return res.status(404).json({ status: "Error", message: "No texts found" });
        }

        const emailMessage = lastText.text;

        // Regular expressions to extract the required fields
        const dateMatch = emailMessage.match(/date=([\d-]+)/);
        const timeMatch = emailMessage.match(/time=([\d:]+)/);
        const intrusionObservedMatch = emailMessage.match(/intrusion_observed=([\w\s]+)/i); // Case-insensitive match
        const devnameMatch = emailMessage.match(/devname=([\w-]+)/);
        const srcipMatch = emailMessage.match(/srcip=([\d.]+)/);
        const dstipMatch = emailMessage.match(/dstip=([\d.]+)/);
        const dstcountryMatch = emailMessage.match(/dstcountry=([\w\s]+)/i); // Case-insensitive match
        const crlevelMatch = emailMessage.match(/crlevel=([\w\s]+)/);
        const attackMatch = emailMessage.match(/attack=([\w\s]+)/i); // Case-insensitive match

        // Extracted values
        const extractedData = {
            id: lastText._id,
            date: dateMatch ? dateMatch[1] : null,
            time: timeMatch ? timeMatch[1] : null,
            intrusion_observed: intrusionObservedMatch ? intrusionObservedMatch[1] : null,
            devname: devnameMatch ? devnameMatch[1] : null,
            srcip: srcipMatch ? srcipMatch[1] : null,
            dstip: dstipMatch ? dstipMatch[1] : null,
            dstcountry: dstcountryMatch ? dstcountryMatch[1] : null,
            crlevel: crlevelMatch ? crlevelMatch[1] : null,
            attack: attackMatch ? attackMatch[1] : null,
        };

        res.status(200).json({ status: "Success", data: extractedData });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "Error", message: "Failed to process the last text" });
    }
});

module.exports = router;