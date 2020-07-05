const slushShortener = async (req, res, next) => {
  /** Cut slash more one */
  if (/\/{2,}/.test(req.url)) {
    const url = req.url.replace(/\/{2,}/g, '/');
    res.writeHead(301, { Location: url });
    return res.end();
  }
  next();
};

export { slushShortener };
