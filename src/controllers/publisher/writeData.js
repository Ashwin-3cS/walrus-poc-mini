import axios from "axios";

export const writeData = async (req, res) => {
    try {
        const PUBLISHER = process.env.PUBLISHER;
        const data = "test string"; //sending the data statically for initial testing 
        
        const response = await axios.put(`${PUBLISHER}/v1/blobs`, data, {
            headers: {
                'Content-Type': 'text/plain'
            }
        });

        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error writing data:', error);
        res.status(500).json({ 
            error: "Failed to write data to Walrus",
            details: error.message 
        });
    }
};