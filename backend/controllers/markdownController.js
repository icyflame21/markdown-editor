const { marked } = require('marked');

exports.convertMarkdown = (req, res, next) => {
  try {
    const { markdown } = req.query;

    if (!markdown) {
      throw new Error('Markdown content is required');
    }
    const html = marked(markdown);
    const raw_html = marked.parse(markdown);
    res.json({
      formatted: html,
      raw: raw_html
    });
  } catch (error) {
    next(error);
  }
};

