import React, { useState } from 'react';
import PropTypes from 'prop-types';

function WineButtons({ wineData }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [selectedFlavor, setSelectedFlavor] = useState(null);

  const handleCategoryClick = (category) => {
    console.log('Categoría seleccionada:', category);
    console.log('Datos disponibles:', wineData[category]);
    setSelectedCategory(selectedCategory === category ? null : category);
    setSelectedSubCategory(null);
    setSelectedFlavor(null);
  };

  const handleSubCategoryClick = (subCategory) => {
    setSelectedSubCategory(selectedSubCategory === subCategory ? null : subCategory);
    setSelectedFlavor(null);
  };

  const handleFlavorClick = (flavor) => {
    setSelectedFlavor(selectedFlavor === flavor ? null : flavor);
  };

  const renderWineList = (wines) => {
    return (
      <div className="grid grid-cols-2 gap-2 mt-2">
        {wines.map((wine) => (
          <div key={wine} className="bg-white p-2 rounded-lg shadow-sm hover:shadow-md border 
                                     border-[#D4B996] hover:border-[#722F37] transition-all duration-300 
                                     text-center text-[#722F37] text-sm hover:-translate-y-0.5">
            {wine}
          </div>
        ))}
      </div>
    );
  };

  const wineGroups = {
    left: ['Rose', 'Red'],
    right: ['Sparkling', 'White', 'Fortified'],
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between relative min-h-[400px]">
        {/* Grupo izquierdo */}
        <div className="flex flex-col gap-4 w-1/4">
          {wineGroups.left.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`
                px-6 py-2
                rounded-full
                font-medium
                text-sm
                transition-all duration-300
                ${selectedCategory === category 
                  ? 'bg-[#722F37] text-white shadow-lg'
                  : 'bg-white text-[#722F37] border border-[#722F37] hover:bg-[#722F37] hover:text-white'
                }
              `}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Contenido central */}
        <div className="w-2/4 px-8">
          {selectedCategory && (
            <div className="space-y-2">
              {console.log('Renderizando categoría:', selectedCategory)}
              {console.log('Datos a renderizar:', wineData[selectedCategory])}
              {wineData[selectedCategory] && Object.keys(wineData[selectedCategory]).map((subCategory) => (
                <div key={subCategory}>
                  <button
                    onClick={() => handleSubCategoryClick(subCategory)}
                    className={`w-full bg-white hover:bg-[#F5EEE6] text-[#722F37] border 
                               border-[#D4B996] font-semibold py-1.5 px-3 rounded-lg 
                               transition duration-300 ease-in-out transform hover:scale-102 
                               shadow-sm text-sm ${selectedSubCategory === subCategory ? 'bg-[#E6D5C1]' : ''}`}
                  >
                    {subCategory}
                  </button>

                  {selectedSubCategory === subCategory && 
                   wineData[selectedCategory][subCategory]?.vinos && (
                    <div>
                      {console.log('Vinos a mostrar:', wineData[selectedCategory][subCategory].vinos)}
                      {renderWineList(wineData[selectedCategory][subCategory].vinos)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Grupo derecho */}
        <div className="flex flex-col gap-4 w-1/4">
          {wineGroups.right.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`
                px-6 py-2
                rounded-full
                font-medium
                text-sm
                transition-all duration-300
                ${selectedCategory === category 
                  ? 'bg-[#722F37] text-white shadow-lg'
                  : 'bg-white text-[#722F37] border border-[#722F37] hover:bg-[#722F37] hover:text-white'
                }
              `}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

WineButtons.propTypes = {
  wineData: PropTypes.object.isRequired,
};

export default WineButtons;