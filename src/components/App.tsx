import { useState } from "react";

import { useJobsItems } from "../libs/hooks";

import Background from "./Background";
import Container from "./Container";
import Footer from "./Footer";
import Header, { HeaderTop } from "./Header";
import BookmarksButton from "./BookmarksButton";
import Logo from "./Logo";
import SearchForm from "./SearchForm";
import JobItemContent from "./JobItemContent";
import Sidebar, { SidebarTop } from "./Sidebar";
import JobList from "./JobList";
import PaginationControls from "./PaginationControls";
import ResultsCount from "./ResultsCount";
import SortingControls from "./SortingControls";
import { useDebounceValue } from "usehooks-ts";
import { Toaster } from "sonner";
import { RESULTS_PER_PAGE } from "../libs/constants";
import { Direction, SortBy } from "../libs/types";

function App() {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<SortBy>("relevant");
  const [debouncedSearchText] = useDebounceValue(searchText, 500);
  const { jobItems, isLoading } = useJobsItems(debouncedSearchText);

  const totalNumberOfResults = jobItems?.length || 0;
  const totalNumbersOfPages = Math.ceil(totalNumberOfResults / RESULTS_PER_PAGE);

  const jobItemsSorted =
    jobItems?.sort((a, b) => {
      if (sortBy === "relevant") {
        return b.relevanceScore - a.relevanceScore;
      } else if (sortBy === "recent") {
        return a.daysAgo - b.daysAgo;
      }

      return 0;
    }) || [];

  const jobItemsSliced =
    jobItemsSorted?.slice(
      currentPage * RESULTS_PER_PAGE - RESULTS_PER_PAGE,
      currentPage * RESULTS_PER_PAGE
    ) || [];

  const handleChangePage = (direction: Direction) => {
    if (direction === "next") {
      setCurrentPage((prev) => prev + 1);
    } else if (direction === "prev") {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleChangeSortBy = (sortBy: SortBy) => {
    setCurrentPage(1);
    setSortBy(sortBy);
  };

  if (searchText === "") {
    window.location.hash = "";
  }

  return (
    <>
      <Background />

      <Header>
        <HeaderTop>
          <Logo />
          <BookmarksButton />
        </HeaderTop>

        <SearchForm searchText={searchText} setSearchText={setSearchText} />
      </Header>

      <Container>
        <Sidebar>
          <SidebarTop>
            <ResultsCount count={totalNumberOfResults} />
            <SortingControls sortBy={sortBy} onClick={handleChangeSortBy} />
          </SidebarTop>

          <JobList jobItems={jobItemsSliced} isLoading={isLoading} />

          <PaginationControls
            onClick={handleChangePage}
            totalNumbersOfPages={totalNumbersOfPages}
            currentPage={currentPage}
          />
        </Sidebar>
        <JobItemContent />
      </Container>

      <Footer />
      <Toaster expand={true} richColors position="top-right" />
    </>
  );
}

export default App;
