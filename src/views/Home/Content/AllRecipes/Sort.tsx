"use client";

import React from "react";
import Container from "@/components/container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";
import { useData } from "./dataContext";

const Index = () => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const { sortState: state, sortDispatch: dispatch } = useData();
  return (
    <Container className="relative  z-50">
      <Trigger isOpen={isOpen} setIsOpen={setIsOpen} />
      <Sorts isOpen={isOpen}>
        <GroupOptions title={"by date :"}>
          <Option
            state={state.NewestFirst}
            dispatch={() =>
              dispatch({
                type: "SET_NEWEST_FIRST",
                payload: !state.NewestFirst,
              })
            }
          >
            Newest First
          </Option>

          <Option
            state={state.OldestFirst}
            dispatch={() =>
              dispatch({
                type: "SET_OLDEST_FIRST",
                payload: !state.OldestFirst,
              })
            }
          >
            Oldest First
          </Option>
        </GroupOptions>
        <GroupOptions title={"by popularity :"}>
          <Option
            state={state.MostViewed}
            dispatch={() =>
              dispatch({
                type: "SET_MOST_VIEWED",
                payload: !state.MostViewed,
              })
            }
          >
            Most Popular
          </Option>
          <Option
            state={state.TopRated}
            dispatch={() =>
              dispatch({
                type: "SET_TOP_RATED",
                payload: !state.TopRated,
              })
            }
          >
            Least Popular
          </Option>
        </GroupOptions>
        <GroupOptions title={"by cooking time :"}>
          <Option
            state={state.Quickest}
            dispatch={() =>
              dispatch({
                type: "SET_QUICKEST",
                payload: !state.Quickest,
              })
            }
          >
            Quickest
          </Option>
          <Option
            state={state.Longest}
            dispatch={() =>
              dispatch({
                type: "SET_LONGEST",
                payload: !state.Longest,
              })
            }
          >
            Longest
          </Option>
        </GroupOptions>
      </Sorts>
      <ScreenCover isOpen={isOpen} setIsOpen={setIsOpen} />
    </Container>
  );
};

export default Index;

const ScreenCover = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div
      className={`${isOpen ? "fixed" : "hidden"} top-0 left-0 w-full h-full z-20 `}
      onClick={() => setIsOpen(false)}
    ></div>
  );
};

const Trigger = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <button
      className={`${isOpen ? "bg-slate-50/70 text-slate-700" : "bg-transparent"} rounded-full w-8 h-8 flex justify-center items-center`}
      onClick={() => setIsOpen((isOpen) => !isOpen)}
    >
      <FontAwesomeIcon
        icon={faSort}
        className="text-slate-400 hover:text-slate-700 text-xl"
      />
    </button>
  );
};

const Sorts = ({
  isOpen,
  children,
}: {
  isOpen: boolean;
  children: React.ReactNode;
}) => {
  return (
    <Container
      className={`${isOpen ? "absolute  top-full left-0" : "hidden"} w-52 p-4 mt-1 shadow-xl  bg-slate-100 rounded-xl `}
    >
      {children}
    </Container>
  );
};

const GroupOptions = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
      <div className="min-w-fit mb-3">
        <h6 className="text-gray-500 text-base mb-2">{title}</h6>
      <div className="flex flex-col gap-2 items-center">{children}</div>
    </div>
  );
};



const Option = ({
  state,
  dispatch,
  children,
}: {
  state: boolean;
  dispatch: () => void;
  children: React.ReactNode;
}) => {
  return (
    <button
      className={`${state ? "text-slate-600" : ""} z-50`}
      onClick={dispatch}
    >
      {children}
    </button>
  );
};
