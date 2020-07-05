declare module '*.scss';

declare module '*.svgm' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}
