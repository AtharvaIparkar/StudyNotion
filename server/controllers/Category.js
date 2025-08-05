const Category = require('../models/Category');

// create Category ka handler function
exports.createCategory = async (req, res) => {
    try {
        // fetch data
        const {name, description} = req.body;
        // validation
        if(!name || !description) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            })
        }
        // create entry in DB
        const categoryDetails = await Category.create({
            name: name,
            description: description,
        });
        console.log(categoryDetails);
        // return response
        return res.status(200).json({
            success: true,
            message: "Category created successfully",
        })
        
    } catch(error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
} 

// getAllCategorys handler function
exports.showAllCategory = async (req, res) => {
    try {
        const allCategory = await Category.find({}, {name: true, description: true});
        // return response
        return res.status(200).json({
            success: true,
            message: "All Categorys returned successfully",
            allCategory,
        })
        
    } catch(error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
};

exports.categoryPageDetails = async (req, res) => {
    try {
        const {categoryId} = req.body;

        // get courses for the specified category
        const selectedCategory = await Category.findById(categoryId)
                                .populate({
                                    path: "courses",
                                    populate: {
                                        path: "instructor",
                                        select: "firstName lastName"
                                    }
                                })
                                .exec();
        console.log(selectedCategory);
        // validation
        if(!selectedCategory) {
            console.log("Category not found");
            return res.status(404).json({
                success: false,
                message: "Category not found",
            });
        }
        
        // handle the case when there are no courses - return empty arrays instead of 404
        const selectedCourses = selectedCategory.courses || [];

        // get courses for other categories
        const differentCategories = await Category.find({
            _id: { $ne: categoryId },
        }).populate({
            path: "courses",
            populate: {
                path: "instructor",
                select: "firstName lastName"
            }
        }).exec();
        let differentCourses = [];
        for(const category of differentCategories) {
            if(category.courses && category.courses.length > 0) {
                differentCourses.push(...category.courses);
            }
        }

        // get top-selling courses across all categories
        const allCategories = await Category.find().populate({
            path: "courses",
            populate: {
                path: "instructor",
                select: "firstName lastName"
            }
        });
        const allCourses = allCategories.flatMap((category) => category.courses || []);
        const mostSellingCourses = allCourses
            .sort((a, b) => (b.studentsEnrolled?.length || 0) - (a.studentsEnrolled?.length || 0))
            .slice(0, 10);

        return res.status(200).json({
            success: true,
            selectedCourses: selectedCourses,
            differentCourses: differentCourses,
            mostSellingCourses: mostSellingCourses,
        });
    } catch(error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        })
    }
};