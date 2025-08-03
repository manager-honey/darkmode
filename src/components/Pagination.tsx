import { useEffect, useMemo, type SetStateAction } from "react";

interface PaginationProps {
  totalRecords: number;
  entriesCount: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<SetStateAction<number>>;
}

interface PageBlockProps {
  content: number | string;
  onButtonClick?: () => void;
  className?: string;
}

export const PageBlock = ({
  content,
  onButtonClick,
  className,
}: PageBlockProps) => {
  return (
    <button
      onClick={onButtonClick}
      className={`border p-1 h-10 w-10 flex flex-row justify-center items-start cursor-pointer hover:border-2 hover:border-blue-800 ${className}`}
    >
      {content}
    </button>
  );
};

export const Pagination = ({
  totalRecords,
  entriesCount,
  currentPage,
  setCurrentPage,
}: PaginationProps) => {
  const noOfPages = useMemo(() => {
    if (totalRecords && entriesCount) {
      return Math.ceil(totalRecords / entriesCount);
    } else {
      return 0;
    }
  }, [totalRecords, entriesCount]);

  useEffect(() => {
    setCurrentPage(1);
  }, [entriesCount]);

  if (!totalRecords) return null;

  return (
    totalRecords !== 0 && (
      <div className="flex flex-row gap-2">
        <PageBlock
          onButtonClick={() => {
            if (currentPage > 1) setCurrentPage(1);
          }}
          content={"<<"}
        />
        <PageBlock
          onButtonClick={() => {
            if (currentPage > 1) setCurrentPage(currentPage - 1);
          }}
          content={"<"}
        />

        <div className="w-20 rounded-full border h-10 flex flex-row justify-center items-center">
          {`${currentPage} / ${noOfPages}`}
        </div>

        <PageBlock
          onButtonClick={() => {
            if (currentPage < noOfPages) setCurrentPage(currentPage + 1);
          }}
          content={">"}
        />
        <PageBlock
          onButtonClick={() => {
            if (currentPage < noOfPages) setCurrentPage(noOfPages);
          }}
          content={">>"}
        />
      </div>
    )
  );
};
