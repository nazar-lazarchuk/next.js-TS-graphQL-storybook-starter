const slashTrim = async (req, res, next) => {
  /** Trim last slash */
  if (/.{1,}\/$/.test(req.url)) {
    const url = req.url.replace(/\/$/, '');
    res.writeHead(301, { Location: url });
    return res.end();
  }
  next();
};

export { slashTrim };
