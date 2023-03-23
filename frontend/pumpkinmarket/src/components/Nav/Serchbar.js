import React from 'react';

export default function Serchbar({
  searchKeyword,
  productSearch,
  handleOnKeyPress,
}) {
  return (
    <input
      className="w-96 h-8 text-center border border-#d1d5db-600 rounded-sm text-sm max-md:hidden"
      placeholder=" 🔍     물품이나 동네를 검색해보세요"
      value={searchKeyword}
      onChange={productSearch}
      onKeyDown={handleOnKeyPress}
    />
  );
}
