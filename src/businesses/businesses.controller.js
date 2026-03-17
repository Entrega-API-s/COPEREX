import Business from "./businesses.model.js";

// Crear negocio
export const registerBusiness = async (req, res) => {
    try {
        const data = req.body;

        const business = new Business(data);
        await business.save();

        return res.status(201).json({
            success: true,
            message: "Business registered successfully",
            business
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to register business",
            error: error.message
        });
    }
};

// Obtener todos
export const fetchBusinesses = async (req, res) => {
    try {
        const businesses = await Business.find({ isActive: true });

        return res.json({
            success: true,
            total: businesses.length,
            businesses
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch businesses",
            error: error.message
        });
    }
};

// Obtener por ID
export const fetchBusinessById = async (req, res) => {
    try {
        const { id } = req.params;

        const business = await Business.findById(id);

        if (!business) {
            return res.status(404).json({
                success: false,
                message: "Business not found"
            });
        }

        return res.json({
            success: true,
            business
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error retrieving business",
            error: error.message
        });
    }
};

// Actualizar
export const editBusiness = async (req, res) => {
    try {
        const { id } = req.params;

        const updatedBusiness = await Business.findByIdAndUpdate(
            id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedBusiness) {
            return res.status(404).json({
                success: false,
                message: "Business not found"
            });
        }

        return res.json({
            success: true,
            message: "Business updated successfully",
            updatedBusiness
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error updating business",
            error: error.message
        });
    }
};

// Filtrar por sector
export const filterBySector = async (req, res) => {
    try {
        const { sector } = req.params;

        const businesses = await Business.find({ sector });

        return res.json({
            success: true,
            total: businesses.length,
            businesses
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error filtering by sector",
            error: error.message
        });
    }
};

// Filtrar por impacto
export const filterByImpact = async (req, res) => {
    try {
        const { impact } = req.params;

        const businesses = await Business.find({ impactScore: impact });

        return res.json({
            success: true,
            total: businesses.length,
            businesses
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error filtering by impact",
            error: error.message
        });
    }
};

// Filtrar por experiencia
export const filterByExperience = async (req, res) => {
    try {
        const { years } = req.params;

        const businesses = await Business.find({
            experienceYears: { $gte: years }
        });

        return res.json({
            success: true,
            total: businesses.length,
            businesses
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error filtering by experience",
            error: error.message
        });
    }
};

// Orden A-Z
export const sortAZ = async (req, res) => {
    try {
        const businesses = await Business.find().sort({ businessName: 1 });

        return res.json({
            success: true,
            businesses
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error sorting businesses",
            error: error.message
        });
    }
};

// Orden Z-A
export const sortZA = async (req, res) => {
    try {
        const businesses = await Business.find().sort({ businessName: -1 });

        return res.json({
            success: true,
            businesses
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error sorting businesses",
            error: error.message
        });
    }
};