import { useMemo, useState } from "react";

interface Props<T> {
  data: T[];
  pageSize: number;
}
export const usePagination = <T>({ data, pageSize }: Props<T>) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPage = Math.ceil(data.length / pageSize);
  const indexOfLastRecord = currentPage * pageSize;
  const indexOfFirstRecord = indexOfLastRecord - pageSize;
  const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);

  const nextPage = () => {
    if (currentPage !== totalPage) setCurrentPage(currentPage + 1);
  };
  const prevPage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };

  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return {
    totalPage,
    currentRecords,
    nextPage,
    prevPage,
    setCurrentPage,
    currentPage,
    goToPage,
  };
};

export default usePagination;
