import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { Direction } from "../libs/types";

type PaginationControlsProps = {
  onClick: (direction: Direction) => void;
  currentPage: number;
  totalNumbersOfPages: number;
};

export default function PaginationControls({
  onClick,
  currentPage,
  totalNumbersOfPages,
}: PaginationControlsProps) {
  return (
    <section className="pagination">
      {currentPage > 1 && (
        <PaginationButton
          onClick={() => onClick("prev")}
          direction="prev"
          currentPage={currentPage - 1}
        />
      )}

      {currentPage < totalNumbersOfPages && (
        <PaginationButton
          onClick={() => onClick("next")}
          direction="next"
          currentPage={currentPage + 1}
        />
      )}
    </section>
  );
}

type PaginationButtonProps = {
  direction: "prev" | "next";
  currentPage: number;
  onClick: () => void;
};

function PaginationButton({ direction, currentPage, onClick }: PaginationButtonProps) {
  return (
    <button
      onClick={(e) => {
        onClick();
        const element = e.target as HTMLElement;
        element.blur();
      }}
      className={`pagination__button pagination__button--${direction}`}
    >
      {direction === "prev" && (
        <>
          <ArrowLeftIcon /> Page {currentPage}
        </>
      )}

      {direction === "next" && (
        <>
          Page {currentPage} <ArrowRightIcon />
        </>
      )}
    </button>
  );
}
