type Props = {
  totalPage: number;
  currentPage: number;
  onPageChange: (i: number) => void;
};

export default function Pagination({
  totalPage,
  currentPage,
  onPageChange,
}: Props) {
  return (
    <div className="join">
      {Array.from({ length: totalPage }).map((v, i) => (
        <button
          className={`join-item btn btn-sm ${
            i + 1 === currentPage ? "join-item btn btn-sm btn-active" : ""
          }`}
          key={i}
          onClick={() => onPageChange(Number(i + 1))}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
}
