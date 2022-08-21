export const Debug = ({
  debug,
  style,
  className,
}: {
  debug: any;
  className?: string;
  style?: React.CSSProperties;
}) => {
  console.log("debug", debug);
  return (
    <pre
      className={className}
      style={{
        boxShadow: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
        height: "20rem",
        overflowY: "scroll",
        padding: "1rem",
        fontSize: "0.8rem",
        ...style,
      }}
    >
      <code>{JSON.stringify(debug, null, 2)}</code>
    </pre>
  );
};
