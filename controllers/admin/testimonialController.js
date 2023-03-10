const testimonialModel = require("../../models/testimonials");
const AppError = require("../../utils/appError");
const catchAsync = require("../../utils/catchAsync");

exports.addTestimonials = catchAsync(async (req, res, next) => {
  const { name, position, image, testimonial } = req.body;
  const newTestimonial = await testimonialModel.create({
    name,
    position,
    image,
    testimonial,
  });

  if (!newTestimonial) return next(new AppError("Something went wrong", 500));
  return res.status(200).json({
    status: true,
    message: "Testimonial added",
    testimonial: newTestimonial,
  });
});

// update testimonials
exports.updateTestimonials = catchAsync(async (req, res, next) => {
  const { name, position, image, testimonial, _id } = req.body;
  const updateTestimonial = await testimonialModel.findOneAndUpdate(
    { _id: _id },
    {
      name,
      position,
      image,
      testimonial,
    },
    { new: true }
  );

  if (!updateTestimonial)
    return next(new AppError("Something went wrong", 500));
  return res.status(200).json({
    status: true,
    message: "Testimonial updated",
    testimonial: updateTestimonial,
  });
});

// delete testimonial
exports.deleteTestimonials = catchAsync(async (req, res, next) => {
  const { _id } = req.query;
  const deleteTestimonial = await testimonialModel.deleteOne({ _id: _id });

  if (!deleteTestimonial.acknowledged || deleteTestimonial.deletedCount !== 1)
    return next(new AppError("Something went wrong", 500));
  return res.status(200).json({
    status: true,
    message: "Testimonial deleted",
    testimonial: deleteTestimonial,
  });
});

// get all testimonials
exports.allTestimonials = catchAsync(async (req, res, next) => {
  const testimonials = await testimonialModel.find({});

  return res.status(200).json({
    status: true,
    message: "Testimonials found.",
    allTestimonials: testimonials,
  });
});
