const router = require("express").Router();
const Text = require("../models/Text_models");
const mongoose = require("mongoose");

// Get all extracted data with filtering
router.get("/all", async (req, res) => {
    try {
        const {
            date,
            srcip,
            dstip,
            attack,
            dstcountry,
            crlevel,
            devname,
            startDate,
            endDate,
            sortBy = 'createdAt',
            sortOrder = 'desc',
            limit = 100,
            page = 1
        } = req.query;

        // Build filter object
        const filter = {};

        // Add filters if they exist in query params
        if (date) filter.date = date;
        if (srcip) filter.srcip = srcip;
        if (dstip) filter.dstip = dstip;
        if (attack) filter.attack = { $regex: attack, $options: 'i' }; // Case-insensitive search
        if (dstcountry) filter.dstcountry = { $regex: dstcountry, $options: 'i' };
        if (crlevel) filter.crlevel = crlevel;
        if (devname) filter.devname = devname;

        // Date range filter
        if (startDate || endDate) {
            filter.createdAt = {};
            if (startDate) filter.createdAt.$gte = new Date(startDate);
            if (endDate) filter.createdAt.$lte = new Date(endDate);
        }

        // Calculate skip value for pagination
        const skip = (parseInt(page) - 1) * parseInt(limit);

        // Validate sort order
        const validSortOrders = ['asc', 'desc'];
        const finalSortOrder = validSortOrders.includes(sortOrder.toLowerCase()) ? sortOrder.toLowerCase() : 'desc';

        // Get total count for pagination
        const totalCount = await Text.countDocuments(filter);

        // Execute query with filters, sorting, and pagination
        const data = await Text.find(filter)
            .sort({ [sortBy]: finalSortOrder === 'desc' ? -1 : 1 })
            .skip(skip)
            .limit(parseInt(limit));

        // Calculate pagination info
        const totalPages = Math.ceil(totalCount / parseInt(limit));

        res.status(200).json({
            status: "Success",
            data: data,
            pagination: {
                currentPage: parseInt(page),
                totalPages: totalPages,
                totalItems: totalCount,
                itemsPerPage: parseInt(limit)
            },
            filters: {
                applied: Object.keys(filter).length > 0 ? filter : 'No filters applied'
            }
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ 
            status: "Error", 
            message: "Failed to fetch data",
            error: err.message 
        });
    }
});

// Extract specific fields from the email message
router.post("/extract", async (req, res) => {
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

        // Save the extracted data to the database
        const newText = new Text(extractedData);
        await newText.save();

        res.status(200).json({ status: "Success", data: extractedData });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "Error", message: "Failed to process the email message" });
    }
});

// Delete a text entry by ID
router.delete("/delete/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const deletedText = await Text.findByIdAndDelete(id);

        if (!deletedText) {
            return res.status(404).json({
                status: "Error",
                message: `No entry found with ID: ${id}`
            });
        }

        res.status(200).json({
            status: "Success",
            message: "Entry deleted successfully",
            data: deletedText
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: "Error",
            message: "Failed to delete the entry",
            error: err.message
        });
    }
});


module.exports = router;