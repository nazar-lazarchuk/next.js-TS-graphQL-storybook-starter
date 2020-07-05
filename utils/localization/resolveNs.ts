export default (pageProps: object, setNS: string[] = ['common']) => {
  const ns = pageProps['namespacesRequired'];
  if (!ns || !(ns instanceof Array)) {
    pageProps['namespacesRequired'] = setNS;
    return undefined;
  }

  setNS.forEach(namespace => {
    if (!ns.includes(namespace)) {
      ns.push(namespace);
    }
  });

  return undefined;
};
