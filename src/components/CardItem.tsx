import React from "react";

interface Props {
  price: number;
  name: string;
  detail: string[];
  pop?: boolean;
}

const CardItem = (props: Props) => {
  return (
    <div
      className="p-6 xl:py-9 xl:px-12  mx-auto"
      data-aos="zoom-in-up"
      data-aos-duration="2000"
    >
      {props.pop ? (
        <div className="uppercase bg-gradient-to-r from-blue-400 to-blue-600 p-3 text-center text-white">
          MOST POPULAR
        </div>
      ) : (
        <></>
      )}
      <div className="flex w-full flex-col mx-auto max-w-sm text-white bg-gray-800 p-6 xl:py-9 xl:px-12 transition-all duration-500 hover:bg-gray-900">
        <h3 className="font-manrope text-2xl font-bold mb-3">{props.name}</h3>
        <div className="flex items-center mb-6">
          <span className="font-manrope mr-2 text-5xl font-semibold whitespace-nowrap">
            {props.price.toLocaleString()} THB
          </span>
        </div>
        <ul className="mb-12 space-y-6 text-left text-lg text-white">
          {props.detail.map((item, idx) => (
            <li key={idx} className="flex items-center space-x-4">
              <CheckIcon />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <a
          href="/order"
          className="py-2.5 px-5 bg-blue-600 shadow-sm transition-all duration-500 text-base text-white font-semibold text-center w-fit mx-auto hover:bg-blue-700"
        >
          Purchase Plan
        </a>
      </div>
    </div>
  );
};

const CheckIcon = () => (
  <svg
    className="flex-shrink-0 w-6 h-6 text-blue-600"
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10 14.7875L13.0959 17.8834C13.3399 18.1274 13.7353 18.1275 13.9794 17.8838L20.625 11.25M15 27.5C8.09644 27.5 2.5 21.9036 2.5 15C2.5 8.09644 8.09644 2.5 15 2.5C21.9036 2.5 27.5 8.09644 27.5 15C27.5 21.9036 21.9036 27.5 15 27.5Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default CardItem;
