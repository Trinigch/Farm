// import React from "react";

// interface Props {
//   title: string;
//   value: string | number;
//   icon?: string;
// }

// const SummaryCard: React.FC<Props> = ({ title, value, icon }) => {
//   return (
// <div
//   className="flex flex-col items-center justify-center p-6 rounded-3xl shadow-lg 
//              border border-[#d9d2b6] bg-[#A3B18A] 
//              hover:bg-[#fff8e1] hover:scale-105 
//              transition-all duration-300 ease-in-out group"
// >
//   {/* Icono */}
//   {icon && (
//     <div
//       className="text-5xl mb-4 drop-shadow-md"
     
//     >
//       {icon}
//     </div>
//   )}

//   {/* Título */}
//   <div
//     className="text-lg font-semibold tracking-wide mb-1"
//    style={{
//       color: "#F5DEB3", // amarillo trigo para el nombre
//     }}
//   >
//     {title}
//   </div>

//   {/* Valor */}
//   <div
//     className="text-3xl font-extrabold drop-shadow-sm bolt"
    
//   >
//     {value}
//   </div>
// </div>
//   );
// };

// export default SummaryCard;

import React from "react";

interface Props {
  title: string;
  value: string | number;
  icon?: string;
  onClick?: () => void; // Nuevo
  style?: React.CSSProperties; // Nuevo
}

const SummaryCard: React.FC<Props> = ({ title, value, icon, onClick, style }) => {
  return (
    <div
      onClick={onClick}
      style={style}
      className={`flex flex-col items-center justify-center p-6 rounded-3xl shadow-lg 
                  border border-[#d9d2b6] bg-[#A3B18A] 
                  hover:bg-[#fff8e1] hover:scale-105 
                  transition-all duration-300 ease-in-out group
                  ${onClick ? "cursor-pointer" : ""}`}
    >
      {/* Icono */}
      {icon && (
        <div className="text-5xl mb-4 drop-shadow-md">
          {icon}
        </div>
      )}

      {/* Título */}
      <div
        className="text-lg font-semibold tracking-wide mb-1"
        style={{
          color: "#F5DEB3", // amarillo trigo para el nombre
        }}
      >
        {title}
      </div>

      {/* Valor */}
      <div className="text-3xl font-extrabold drop-shadow-sm">
        {value}
      </div>
    </div>
  );
};

export default SummaryCard;
