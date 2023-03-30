// a pathname is the path without the query
export default function getLastPathPartition(pathname) {
  const pathPartitions = pathname.split("/");
  const lastPathPartition = pathPartitions[pathPartitions.length - 1];
  return lastPathPartition;
}
