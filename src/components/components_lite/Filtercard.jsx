import { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";

const filterData = [
  {
    filterType: "Subjects",
    array: [], // handled as text input
  },
  {
    filterType: "Location",
    array: [
      "Dhaka",
      "Chattogram",
      "Khulna",
      "Rajshahi",
      "Barisal",
      "Sylhet",
      "Rangpur",
      "Mymensingh",
      "Comilla",
      "Narayanganj",
      "Gazipur",
      "Cox's Bazar",
      "Jessore",
      "Bogra",
      "Dinajpur",
      "Tangail",
      "Pabna",
      "Noakhali",
      "Kushtia",
      "Jamalpur",
      "Patuakhali",
      "Satkhira",
      "Faridpur",
      "Brahmanbaria",
      "Narsingdi",
      "Sirajganj",
      "Feni",
      "Jhenaidah",
      "Lakshmipur",
      "Bagerhat",
      "Habiganj",
      "Gaibandha",
      "Pirojpur",
      "Meherpur",
      "Chandpur",
      "Kishoreganj",
      "Madaripur",
      "Shariatpur",
      "Munshiganj",
      "Magura",
      "Joypurhat",
      "Panchagarh",
      "Thakurgaon",
      "Netrokona",
      "Lalmonirhat",
      "Kurigram",
      "Sherpur",
      "Nilphamari",
      "Gopalganj",
      "Chuadanga",
      "Narail",
      "Jhalokathi",
      "Bhola",
      "Bandarban",
      "Khagrachari",
      "Rangamati",
    ],
  },
  {
    filterType: "Days Available",
    array: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    isMulti: true,
  },
  {
    filterType: "Salary Range",
    array: [], // handled separately
  },
  {
    filterType: "Tution Type",
    array: ["Class 9", "SSC", "HSC", "Admission"],
  },
  {
    filterType: "Rating",
    array: [
      "4.5 Stars & Above",
      "4 Stars & Above",
      "3.5 Stars & Above",
      "3 Stars & Above",
      "Any Rating",
    ],
  },
];

const mapExperienceLevelToRange = {
  "0-1 years": [0, 1],
  "1-3 years": [1, 3],
  "3-5 years": [3, 5],
  "5+ years": [5, Infinity],
};

const Filter = () => {
  const [selectedFilters, setSelectedFilters] = useState({
    "Days Available": [],
    "Salary Range": { min: "", max: "" },
  });

  const handleChange = (filterType, value, checked) => {
    setSelectedFilters((prev) => {
      if (filterType === "Experience Level") {
        const range = mapExperienceLevelToRange[value];
        return { ...prev, [filterType]: range };
      }
      if (filterType === "Days Available") {
        let days = prev[filterType] || [];
        if (checked) {
          days = [...days, value];
        } else {
          days = days.filter((day) => day !== value);
        }
        return { ...prev, [filterType]: days };
      }
      return { ...prev, [filterType]: value };
    });
  };

  const handleSalaryChange = (type, value) => {
    setSelectedFilters((prev) => ({
      ...prev,
      "Salary Range": {
        ...prev["Salary Range"],
        [type]: value,
      },
    }));
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchedQuery(selectedFilters));
  }, [selectedFilters, dispatch]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900">🔍 Filter</h1>
        <button
          onClick={() =>
            setSelectedFilters({
              "Days Available": [],
              "Salary Range": { min: "", max: "" },
            })
          }
          className="text-sm text-gray-700 hover:text-gray-900 font-medium"
        >
          Clear All
        </button>
      </div>

      {filterData.map((data, index) => (
        <div key={index} className="space-y-3">
          <h2 className="font-semibold text-gray-800 flex items-center gap-2">
            {data.filterType === "Subjects" && "📚"}
            {data.filterType === "Location" && "📍"}
            {data.filterType === "Days Available" && "📅"}
            {data.filterType === "Salary Range" && "💰"}
            {data.filterType === "Tution Type" && "🎓"}
            {data.filterType === "Rating" && "⭐"}
            {data.filterType}
          </h2>

          {data.filterType === "Subjects" ? (
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
              placeholder="Type subject keyword..."
              value={selectedFilters["Subjects"] || ""}
              onChange={(e) => handleChange("Subjects", e.target.value)}
            />
          ) : data.filterType === "Days Available" ? (
            <div className="grid grid-cols-2 gap-3">
              {data.array.map((item, indx) => {
                const itemId = `days-${indx}`;
                return (
                  <label
                    key={itemId}
                    className="flex items-center space-x-2 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                  >
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-gray-600 border-gray-300 rounded focus:ring-gray-500"
                      checked={selectedFilters["Days Available"].includes(item)}
                      onChange={(e) =>
                        handleChange("Days Available", item, e.target.checked)
                      }
                    />
                    <span className="text-sm text-gray-700">{item}</span>
                  </label>
                );
              })}
            </div>
          ) : data.filterType === "Salary Range" ? (
            <div className="space-y-3">
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Minimum Salary
                  </label>
                  <input
                    type="number"
                    placeholder="Min amount"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-colors"
                    value={selectedFilters["Salary Range"].min}
                    onChange={(e) => handleSalaryChange("min", e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Maximum Salary
                  </label>
                  <input
                    type="number"
                    placeholder="Max amount"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-colors"
                    value={selectedFilters["Salary Range"].max}
                    onChange={(e) => handleSalaryChange("max", e.target.value)}
                  />
                </div>
              </div>
              <div className="text-xs text-gray-500">Amount in BDT</div>
            </div>
          ) : data.filterType === "Location" ? (
            <div className="max-h-48 overflow-y-auto border border-gray-200 rounded-xl p-3 bg-gray-50">
              <RadioGroup
                value={selectedFilters[data.filterType] || ""}
                onValueChange={(value) => handleChange(data.filterType, value)}
              >
                {data.array.map((item, indx) => {
                  const itemId = `Id${index}-${indx}`;
                  return (
                    <div
                      key={itemId}
                      className="flex items-center space-x-3 p-2 hover:bg-white rounded-lg transition-colors cursor-pointer"
                    >
                      <RadioGroupItem value={item} id={itemId} />
                      <label
                        htmlFor={itemId}
                        className="text-sm text-gray-700 cursor-pointer"
                      >
                        {item}
                      </label>
                    </div>
                  );
                })}
              </RadioGroup>
            </div>
          ) : (
            <div className="space-y-2">
              <RadioGroup
                value={selectedFilters[data.filterType] || ""}
                onValueChange={(value) => handleChange(data.filterType, value)}
              >
                {data.array.map((item, indx) => {
                  const itemId = `Id${index}-${indx}`;
                  return (
                    <div
                      key={itemId}
                      className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      <RadioGroupItem value={item} id={itemId} />
                      <label
                        htmlFor={itemId}
                        className="text-sm text-gray-700 cursor-pointer"
                      >
                        {item}
                      </label>
                    </div>
                  );
                })}
              </RadioGroup>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Filter;
