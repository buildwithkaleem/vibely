export const me = async (req, res) => {
  return res.json({
    success: true,
    user: req.user,
  });
};