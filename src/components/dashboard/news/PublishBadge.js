const PublishBadge = ({ publishable }) => {
  return (
    <div
      className={`px-2 py-1 uppercase bg-green-700 text-white text-center ${
        publishable ? "bg-green-700" : "bg-orange-700"
      }`}
    >
      {publishable ? "Published" : "Not published"}
    </div>
  );
};

export default PublishBadge;
