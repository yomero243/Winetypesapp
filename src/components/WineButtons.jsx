import React, { useState } from 'react';
import PropTypes from 'prop-types';

function WineButtons({ wineData }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [selectedFlavor, setSelectedFlavor] = useState(null);
  const [selectedSubFlavor, setSelectedSubFlavor] = useState(null);

  const handleCategoryClick = (category) => {
    setSelectedCategory(selectedCategory === category ? null : category);
    setSelectedSubCategory(null);
    setSelectedFlavor(null);
    setSelectedSubFlavor(null);
  };

  const handleSubCategoryClick = (subCategory) => {
    setSelectedSubCategory(selectedSubCategory === subCategory ? null : subCategory);
    setSelectedFlavor(null);
    setSelectedSubFlavor(null);
  };

  const handleFlavorClick = (flavor) => {
    setSelectedFlavor(selectedFlavor === flavor ? null : flavor);
    setSelectedSubFlavor(null);
  };

  const handleSubFlavorClick = (subFlavor) => {
    setSelectedSubFlavor(selectedSubFlavor === subFlavor ? null : subFlavor);
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

  const renderSubFlavors = (data) => {
    return Object.entries(data).map(([subFlavor, content]) => {
      if (subFlavor === 'vinos') return null;
      return (
        <div key={subFlavor} className="ml-4 mt-2">
          <button
            onClick={() => handleSubFlavorClick(subFlavor)}
            className={`w-full bg-white hover:bg-[#F5EEE6] text-[#722F37] border 
                       border-[#D4B996] font-semibold py-1.5 px-3 rounded-lg 
                       transition duration-300 ease-in-out transform hover:scale-102 
                       shadow-sm text-sm ${selectedSubFlavor === subFlavor ? 'bg-[#E6D5C1]' : ''}`}
          >
            {subFlavor}
          </button>
          {selectedSubFlavor === subFlavor && content.vinos && renderWineList(content.vinos)}
        </div>
      );
    });
  };

  const wineGroups = {
    left: ['Rose', 'Red'],
    right: ['Sparkling Wine', 'White', 'Fortified Wine'],
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between relative min-h-[400px]">
        {/* Grupos izquierdo y derecho sin cambios */}
        <div className="flex flex-col gap-4 w-1/4">
          {wineGroups.left.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`px-6 py-2 rounded-full font-medium text-sm transition-all duration-300
                ${selectedCategory === category 
                  ? 'bg-[#722F37] text-white shadow-lg'
                  : 'bg-white text-[#722F37] border border-[#722F37] hover:bg-[#722F37] hover:text-white'
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Contenido central actualizado */}
        <div className="w-2/4 px-8">
          {selectedCategory && (
            <div className="space-y-2">
              {Object.entries(wineData["Types of Wine"][selectedCategory]).map(([subCategory, subData]) => (
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

                  {selectedSubCategory === subCategory && (
                    <div>
                      {subData.vinos && renderWineList(subData.vinos)}
                      {Object.entries(subData).map(([flavor, flavorData]) => {
                        if (flavor === 'vinos') return null;
                        return (
                          <div key={flavor} className="ml-4 mt-2">
                            <button
                              onClick={() => handleFlavorClick(flavor)}
                              className={`w-full bg-white hover:bg-[#F5EEE6] text-[#722F37] border 
                                        border-[#D4B996] font-semibold py-1.5 px-3 rounded-lg 
                                        transition duration-300 ease-in-out transform hover:scale-102 
                                        shadow-sm text-sm ${selectedFlavor === flavor ? 'bg-[#E6D5C1]' : ''}`}
                            >
                              {flavor}
                            </button>
                            {selectedFlavor === flavor && (
                              <div>
                                {flavorData.vinos && renderWineList(flavorData.vinos)}
                                {renderSubFlavors(flavorData)}
                              </div>
                            )}
                          </div>
                        );
                      })}
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
              className={`px-6 py-2 rounded-full font-medium text-sm transition-all duration-300
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

WineButtons.propTypes = {
  wineData: PropTypes.object.isRequired,
};

export default WineButtons;