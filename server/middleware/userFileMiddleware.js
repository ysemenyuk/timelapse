export default async (req, res, next) => {
  const { fileName } = req.params;

  try {
    const file = await File.findOne({ filename: fileName });
    console.log(file);

    if (file.userId !== req.userId) {
      return res.sendStatus(401);
    }
  } catch (error) {
    return res.sendStatus(500);
  }

  next();
};
