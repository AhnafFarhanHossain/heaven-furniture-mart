const PreloaderSvg = ({ className = "" }) => {
  return (
    <div
      className={`fixed inset-0 w-screen z-0 h-screen overflow-hidden ${className}`.trim()}
    />
  );
};

export default PreloaderSvg;
