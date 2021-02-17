export function buildPagination({
  page,
  perPage,
}: {
  page?: number | null;
  perPage?: number | null;
}) {
  const currentPage = page || 1;
  const currentPerPage = perPage || 24;

  const offset = currentPerPage * (currentPage - 1);

  return { page: currentPage, perPage: currentPerPage, offset };
}
