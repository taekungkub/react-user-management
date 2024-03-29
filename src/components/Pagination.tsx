type Props = {
  totalPage: number;
  currentPage: number;
  onPageChange: (i: number) => void;
  onPrevChange: () => void;
  onNextChange: () => void;
};

export default function Pagination({
  totalPage,
  currentPage,
  onPageChange,
  onPrevChange,
  onNextChange,
}: Props) {
  return (
    <>
      <div className="flex items-center gap-2">
        <div className="join">
          <button
            className="join-item btn btn-sm"
            onClick={() => onPrevChange()}
          >
            «
          </button>
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
          <button
            className="join-item btn btn-sm"
            onClick={() => onNextChange()}
          >
            »
          </button>
        </div>
      </div>
    </>
  );
}
