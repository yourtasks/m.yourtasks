import Loading from "../pages/Loading";

const OverlayLoading = () => {
  return (
    <div className="fixed top-0 left-0 h-full w-full flex items-center justify-center bg bg-opacity-60 dark:bg-opacity-60 z-20">
      <Loading title="Hydrating" />
    </div>
  );
};

export default OverlayLoading;
