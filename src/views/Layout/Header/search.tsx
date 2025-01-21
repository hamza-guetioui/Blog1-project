"use client"; // Indicates that this component is a client component

import algoliasearch from "algoliasearch"; // Import Algolia search client
import { useState } from "react";
import {
  InstantSearch,
  SearchBox,
  Hits,
  Highlight,
} from "react-instantsearch-dom"; // Import Algolia InstantSearch components
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import FontAwesome icon component
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "./search.css";
import Link from "next/link";
import { IAlgoliaRecipe } from "@/lib/AlgoliaSync";

// Initialize Algolia client with environment variables
const algoliaClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!, // Algolia App ID
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY! // Algolia Search API Key
);

// Main Search component
const Search = () => {
  const [isFocused, setIsFocused] = useState(false); // State to track if the search box is focused

  // Handle focus event for the search box
  const handleFocus = () => setIsFocused(true);

  // Handle closing the search overlay
  const handleClose = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = event.target as HTMLElement;
    if (target.classList.contains("ais-close")) {
      // Check if the close overlay was clicked
      setIsFocused(false);
    }
  };

  return (
    <SearchWrapper>
      <InstantSearch searchClient={algoliaClient} indexName="Recipes">
        <SearchBox onFocus={handleFocus} /> {/* Search input box */}
        {isFocused && ( // Render hits and close overlay if focused
          <>
            <Hits hitComponent={SearchHit} />
            <CloseOverlay onClick={handleClose} />
          </>
        )}
      </InstantSearch>
    </SearchWrapper>
  );
};
export default Search;

// Component for rendering individual search hits
const SearchHit = ({
  hit,
}: {
  hit: IAlgoliaRecipe; // Define the structure of a hit
}) => {
  return (
    <Link href={`/recipes/${hit?.slug}`}>
      <article className="flex justify-center gap-2 max-w-full lg:max-w-[70%] h-28 lg:h-32 border-2 rounded-[6px] border-slate-100">
        <div className="w-1/3 border-2 overflow-hidden rounded-[6px]">
          <Image
            src={hit.image} // Image source from the hit
            width={400}
            height={280}
            alt="" // Alt text for accessibility
            className="w-full h-full object-cover" // Image styling
          />
        </div>
        <div className="w-2/3 p-2 text-left">
          <h2 className="text-lg font-semibold text-gray-800">
            {/* Highlighting matched text */}
            <Highlight attribute="name" hit={hit} />{" "}
            {/* Highlight matched name */}
          </h2>
          <p className="text-sm text-gray-500 line-clamp-3">
            {hit.description}
          </p>{" "}
          {/* Description of the hit */}
        </div>
      </article>
    </Link>
  );
};

// Wrapper component for search functionality
const SearchWrapper = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false); // State to track if the search is open

  // Close search when clicking outside the search container
  const closeSearch = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = event.target as HTMLElement;
    if (target.classList.contains("search-container")) {
      // Check if the search container was clicked
      setIsOpen(false);
    }
  };

  return (
    <div className="lg:text-end order-4 lg:order-3 max-sm:col-span-3 gap-4">
      <SearchButton setIsOpen={setIsOpen} /> {/* Button to open search */}
      <SearchContainer isOpen={isOpen} closeSearch={closeSearch}>
        {children} {/* Render children components */}
      </SearchContainer>
    </div>
  );
};

// Search container component for displaying the search overlay
type SearchContainerProps = {
  isOpen: boolean; // State to track if the container is open
  closeSearch: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void; // Function to close the search
  children: React.ReactNode; // Children components to render
};
const SearchContainer = ({
  isOpen,
  closeSearch,
  children,
}: SearchContainerProps) => {
  return (
    <div
      onClick={(e) => closeSearch(e)} // Close search on click
      className={`search-container flex justify-center items-center ${isOpen ? "md:fixed md:top-0 md:left-0 md:w-full md:h-screen md:bg-black/30 md:z-10" : "md:hidden"}`}
    >
      <div className="flex flex-col gap-4 max-sm:mt-4 w-full md:w-11/12 lg:w-9/12 md:rounded-2xl md:p-8 md:pb-0 md:h-[80vh] bg-white z-20 ">
        {children} {/* Render children components */}
      </div>
    </div>
  );
};

// Search button component
const SearchButton = ({
  setIsOpen,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>; // Function to set the open state
}) => {
  return (
    <button className="max-sm:hidden" onClick={() => setIsOpen(true)}>
      <FontAwesomeIcon icon={faMagnifyingGlass} className="text-xl" />{" "}
      {/* Search icon */}
    </button>
  );
};

// Close overlay component for the search
const CloseOverlay = ({
  onClick,
}: {
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}) => {
  return (
    <div
      className="ais-close lg:hidden fixed top-0 left-0 w-full h-full bg-black/40 opacity-50 z-10" // Overlay styling
      onClick={onClick} // Close overlay on click
    ></div>
  );
};
