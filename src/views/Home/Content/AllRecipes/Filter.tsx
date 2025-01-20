"use client";

import React, { useRef } from "react";
import Container from "@/components/container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { useData } from "./dataContext";

type CalorieState = {
  from: number; // Represents the starting value of the range
  to: number; // Represents the ending value of the range
};

const Index = () => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const { filterState: state, filterDispatch: dispatch } = useData();


  return (
    <Container className="relative z-30">
      <Trigger isOpen={isOpen} setIsOpen={setIsOpen} />
      <Filters isOpen={isOpen}>
        <ByUpdateDate
          state={state.uploadDate}
          dispatch={(
            value: "All time" | "Last week" | "Last month" | "Last Year"
          ) => dispatch({ type: "SET_UPLOAD_DATE", payload: value })}
        />
        <ByCookingTime
          state={state.cookingTime}
          dispatch={(
            value: "All time" | "< 10" | "10-15" | "15-30" | "30-60" | "> 60"
          ) => dispatch({ type: "SET_COOKING_TIME", payload: value })}
        />
        {/* <ByDiets
          state={state.diets}
          dispatch={(value: string[]) =>
            dispatch({ type: "SET_DIETS", payload: value })
          }
        /> */}
        <ByDifficulty
          state={state.difficulty}
          dispatch={(value: "" | "easy" | "medium" | "hard") =>
            dispatch({ type: "SET_DIFFICULTY", payload: value })
          }
        />
        <ByCalories
          state={state.calories}
          dispatch={(value: CalorieState) =>
            dispatch({ type: "SET_CALORIES", payload: value })
          }
        />
        {/* <ByType
          state={state.type}
          dispatch={(value: string) =>
            dispatch({ type: "SET_TYPE", payload: value })
          }
        /> */}
        {/* <ByCuisine
          state={state.type}
          dispatch={(value: string) =>
            dispatch({ type: "SET_CUISINE", payload: value })
          } 
        />*/}
      </Filters>
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
    <button
      className={`${isOpen ? "fixed" : "hidden"} top-0 left-0 w-full h-full z-10 `}
      onClick={() => setIsOpen(false)}
    ></button>
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
      className={`${isOpen ? "bg-slate-100 text-slate-700" : "bg-transparent"} rounded-full w-8 h-8 flex justify-center items-center z-30`}
      onClick={() => setIsOpen((isOpen) => !isOpen)}
    >
      <FontAwesomeIcon
        icon={faFilter}
        className="text-slate-400 hover:text-slate-700 text-xl"
      />
    </button>
  );
};

const Filters = ({
  isOpen,
  children,
}: {
  isOpen: boolean;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={`${isOpen ? "absolute  top-full right-0" : "hidden"} min-w-[36rem] grid grid-cols-4  gap-2 p-4 mt-1  shadow-xl  bg-slate-100 rounded-xl z-30 `}
    >
      {children}
    </div>
  );
};

const ByUpdateDate = ({
  state,
  dispatch,
}: {
  state: "All time" | "Last week" | "Last month" | "Last Year";
  dispatch: (
    value: "All time" | "Last week" | "Last month" | "Last Year"
  ) => void;
}) => {
  const periods: ("Last week" | "Last month" | "Last Year" | "All time")[] = [
    "Last week",
    "Last month",
    "Last Year",
    "All time",
  ];
  return (
    <Option title="by date :">
      <div className="flex flex-col gap-2 justify-start items-start">
        {periods?.map((period) => (
          <button
            key={period}
            className={`${state === period ? "text-gray-600" : " "}`}
            onClick={() => dispatch(period)}
          >
            {period}
          </button>
        ))}
      </div>
    </Option>
  );
};

const ByCookingTime = ({
  state,
  dispatch,
}: {
  state: "All time" | "< 10" | "10-15" | "15-30" | "30-60" | "> 60";
  dispatch: (
    value: "All time" | "< 10" | "10-15" | "15-30" | "30-60" | "> 60"
  ) => void;
}) => {
  const ranges = useRef([
    { label: "< 10 minutes", value: "< 10" },
    { label: "10-15 minutes", value: "10-15" },
    { label: "15-30 minutes", value: "15-30" },
    { label: "30-60 minutes", value: "30-60" },
    { label: "> 60 minutes", value: "> 60" },
    { label: " All time", value: "All time" },
  ]);

  return (
    <Option title="by Cooking Duration :">
      <div className="flex flex-col gap-2 justify-start items-start">
        {ranges?.current.map((range, index) => (
          <button
            key={index}
            className={`${state === range.value ? "text-gray-600" : " "}`}
            onClick={() => dispatch(range.value as  "All time" | "< 10" | "10-15" | "15-30" | "30-60" | "> 60" )}
          >
            {range.label}
          </button>
        ))}
      </div>
    </Option>
  );
};


const ByDifficulty = ({
  state,
  dispatch,
}: {
  state: "" | "easy" | "medium" | "hard";
  dispatch: (value: "" | "easy" | "medium" | "hard") => void;
}) => {
  const Difficulties = [
    { label: "Easy", value: "easy" },
    { label: "Medium", value: "medium" },
    { label: "Hard", value: "hard" },
    { label: "All", value: "" },
  ];

  return (
    <Option title="By Difficulty :">
      <div className="flex flex-col gap-2 items-start">
        {Difficulties.map((difficulty, index) => (
          <button
            key={index}
            className={`${state === difficulty.value ? "text-gray-600" : " "}`}
            onClick={() => dispatch(difficulty.value as "" | "easy" | "medium" | "hard")} // Explicitly casting to the correct type
          >
            {difficulty.label}
          </button>
        ))}
      </div>
    </Option>
  );
};

const ByCalories = ({
  state,
  dispatch,
}: {
  state: CalorieState;
  dispatch: (value: CalorieState) => void;
}) => {
  return (
    <Option title="By Calories (kcal) :">
      <div className="flex flex-col gap-2 items-start">
        <input
          type="range"
          step={1}
          min="0"
          max="1000"
          value={state.from ?? 0} // Default to 0 if `from` is undefined
          onChange={(e) =>
            dispatch({
              from: Number(e.target.value),
              to: Math.max(Number(e.target.value), state.to ?? 0), // Ensure `to` is not less than `from`
            })
          }
        />
        <input
          type="range"
          step={1}
          min="0" // Keep `min` as 0
          max="1000"
          value={Math.max(state.from ?? 0, state.to ?? 0)} // Ensure `to` is >= `from`
          onChange={(e) =>
            dispatch({
              from: state.from, // Preserve `from` value
              to: Math.max(state.from ?? 0, Number(e.target.value)), // Ensure `to` is >= `from`
            })
          }
        />
        <input
          type="checkbox"
          onChange={(e) =>
            dispatch({
              from: e.target.checked ? 0 : state.from,
              to: e.target.checked ? 1000 : state.to,
            })
          }
          checked={state.from === 0 && state.to === 1000}
        />
        <div>
          <span>From: {state.from ?? "Not Set"}</span>
          <br />
          <span>To: {state.to ?? "Not Set"}</span>
        </div>
      </div>
    </Option>
  );
};


const Option = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="min-w-fit">
      <h6 className="text-gray-500 text-base mb-2">{title}</h6>
      {children}
    </div>
  );
};
