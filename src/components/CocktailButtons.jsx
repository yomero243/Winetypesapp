import React, { useState } from 'react';
import PropTypes from 'prop-types';

function CocktailButtons({ cocktailData }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);

  const handleCategoryClick = (category) => {
    setSelectedCategory(selectedCategory === category ? null : category);
    setSelectedSubCategory(null);
  };

  const handleSubCategoryClick = (subCategory) => {
    setSelectedSubCategory(selectedSubCategory === subCategory ? null : subCategory);
  };

  const renderCocktailList = (cocktails) => {
    return (
      <div className="grid grid-cols-2 gap-2 mt-2">
        {cocktails.map((cocktail) => (
          <div key={cocktail} className="bg-white p-2 rounded-lg shadow-sm hover:shadow-md border 
                                     border-[#D4B996] hover:border-[#722F37] transition-all duration-300 
                                     text-center text-[#722F37] text-xs md:text-sm min-h-[40px] 
                                     flex items-center justify-center whitespace-normal
                                     hover:-translate-y-0.5">
            {cocktail}
          </div>
        ))}
      </div>
    );
  };

  const cocktailGroups = {
    left: ['Gin', 'Vodka', 'Rum'],
    right: ['Tequila', 'Whiskey', 'Beer']
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between relative min-h-[400px]">
        {/* Grupos izquierdo */}
        <div className="flex flex-col gap-4 w-1/4">
          {cocktailGroups.left.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`px-6 py-2 rounded-full font-medium text-sm transition-all duration-300 font-['Great_Vibes'] text-lg
                ${selectedCategory === category 
                  ? 'bg-[#722F37] text-white shadow-lg'
                  : 'bg-white text-[#722F37] border border-[#722F37] hover:bg-[#722F37] hover:text-white'
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Contenido central */}
        <div className="w-2/4 px-8">
          {selectedCategory && (
            <div className="space-y-2">
              {Object.entries(cocktailData["Types of Cocktails"][selectedCategory]).map(([subCategory, subData]) => (
                <div key={subCategory}>
                  <button
                    onClick={() => handleSubCategoryClick(subCategory)}
                    className={`w-full bg-white hover:bg-[#F5EEE6] text-[#722F37] border 
                               border-[#D4B996] text-xs md:text-sm py-1.5 px-2 md:px-3 rounded-lg 
                               transition duration-300 ease-in-out transform hover:scale-102 
                               whitespace-normal min-h-[40px] flex items-center justify-center
                               shadow-sm ${selectedSubCategory === subCategory ? 'bg-[#E6D5C1]' : ''}`}
                  >
                    {subCategory}
                  </button>
                  {selectedSubCategory === subCategory && subData.cocktails && (
                    renderCocktailList(subData.cocktails)
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Grupo derecho */}
        <div className="flex flex-col gap-4 w-1/4">
          {cocktailGroups.right.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`px-6 py-2 rounded-full font-medium text-sm transition-all duration-300 font-['Great_Vibes'] text-lg
                ${selectedCategory === category 
                  ? 'bg-[#722F37] text-white shadow-lg'
                  : 'bg-white text-[#722F37] border border-[#722F37] hover:bg-[#722F37] hover:text-white'
                }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

CocktailButtons.propTypes = {
  cocktailData: PropTypes.object.isRequired,
};

export default CocktailButtons; 