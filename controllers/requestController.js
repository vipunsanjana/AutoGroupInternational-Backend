
import requestModel from "../models/requestModel.js";







export const createRequestController = async (req, res) => {

    
    try {
        // Extract request data from req.body
        const {
            requestedBy,
            vehicleModel,
            vehicleGeneration,
            system,
            type,
            description,
            parentPartNumber,
            currentPartNumber,
            currentDrawingNumber,
            updatedPartNumber,
            updatedDrawingNumber,
            
        } = req.body;

        // Check if all required fields are provided
        if (!requestedBy || !vehicleModel || !vehicleGeneration || !system || !type || !description || !parentPartNumber || !currentPartNumber || !currentDrawingNumber || !updatedPartNumber || !updatedDrawingNumber) {
            return res.status(400).send({ message: "All required fields must be provided" });
        }
        const status = "pending";
        // Set the initial status to "pending"
       
        // Create a new request object
        const newRequest = new requestModel({
            requestedBy,
            vehicleModel,
            vehicleGeneration,
            system,
            type,
            description,
            parentPartNumber,
            currentPartNumber,
            currentDrawingNumber,
            updatedPartNumber,
            updatedDrawingNumber,
            status 
        });

        // Save the request to the database
        await newRequest.save();

        // Send success response
        res.status(201).send({ message: "Request created successfully", data: newRequest });
    } catch (error) {
        console.error("Error creating request:", error);
        // Send error response
        res.status(500).send({ message: "Internal server error" });
    }
};



export const getAllRequest = async (req, res) => {
   
    try {
        // Fetch all request from the database
        const requests = await requestModel.find({});
    
        // Send the request as a response
        res.status(200).json({
          success: true,
          message: 'Requests retrieved successfully',
          request: requests
        });
      } catch (error) {
        // Handle errors
        console.error('Error fetching requests:', error);
        res.status(500).json({
          success: false,
          message: 'Error fetching requests',
          error: error.message
        });
      }
       
};

export const getRequestById = async (req, res) => {
    try {
        // Extract the request ID from the request parameters
        const requestId = req.params.id;

        // Fetch the request from the database by ID
        const request = await requestModel.findById(requestId);

        // Check if the request exists
        if (!request) {
            return res.status(404).json({
                success: false,
                message: 'Request not found'
            });
        }

        // Send the request as a response
        res.status(200).json({
            success: true,
            message: 'Request retrieved successfully',
            request: request
        });
    } catch (error) {
        // Handle errors
        console.error('Error fetching request by ID:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching request by ID',
            error: error.message
        });
    }
};





export const updateRequestStatus = async (req, res) => {
    try {
        // Extract the request ID from the request parameters
        const { id } = req.params;
console.log(id);
        // Extract the new status from the request body
        const newStatus  = req.body.status;
        console.log('New Status:', newStatus);

        // Update the status of the request and fetch the updated document
        const request = await requestModel.findByIdAndUpdate(
            id,
            { status: newStatus },
            { new: true }
        );
        console.log('Request:', request);

        // Check if the request exists
        if (!request) {
            return res.status(404).json({
                success: false,
                message: 'Request not found'
            });
        }

        // Send a success response
        res.status(200).json({
            success: true,
            message: 'Request status updated successfully',
            request: request
        });
    } catch (error) {
        // Handle errors
        console.error('Error updating request status:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating request status',
            error: error.message
        });
    }
};