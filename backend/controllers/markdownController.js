const { marked } = require('marked');

exports.convertMarkdown = (req, res, next) => {
  try {
    const { markdown } = req.query;

    if (!markdown) {
      throw new Error('Markdown content is required');
    }
    const html = marked(markdown);
    res.json({ html });
  } catch (error) {
    next(error);
  }
};

exports.convertToRaw = (req, res, next) => {
  try {
    const { markdown } = req.query;
    if (!markdown) {
      throw new Error('Markdown content is required');
    }
    const html = marked.parse(markdown);
    res.json({ html });
  } catch (error) {
    next(error);
  }
};
