const express = require('express');
const papa = require('papaparse');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Standard permissible values for heavy metals (WHO standards for drinking water in mg/L)
const standardValues = {
  Cd: 0.003,
  Cu: 2,
  Zn: 5,
  Cr: 0.05,
  Pb: 0.01,
};

// Calculate weights (Wi)
const weights = {};
for (const metal in standardValues) {
  weights[metal] = 1 / standardValues[metal];
}

// Load and parse the CSV data
const lakeDataFile = fs.readFileSync('lake_data.csv', 'utf8');
const lakeData = papa.parse(lakeDataFile, { header: true }).data;

const districtDataFile = fs.readFileSync('district_data.csv', 'utf8');
const districtData = papa.parse(districtDataFile, { header: true }).data;

// Helper function to parse concentration values from the district data
const parseDistrictConcentration = (value) => {
  if (typeof value !== 'string') {
    const num = parseFloat(value);
    return isNaN(num) ? null : num;
  }
  const lowerCaseValue = value.toLowerCase();
  if (lowerCaseValue.startsWith('<')) {
    return parseFloat(lowerCaseValue.substring(1));
  }
  if (lowerCaseValue === 'nd' || lowerCaseValue === 'below limits') {
    return 0;
  }
  // For "Detected", "Elevated", "Above limit", "Variable", we can't assign a numeric value.
  // Returning null so we can filter them out.
  const num = parseFloat(value);
  return isNaN(num) ? null : num;
};


app.get('/api/hmpi/:lake', (req, res) => {
  const lakeName = req.params.lake;
  const lakeSpecificData = lakeData.filter(row => row.Lake.toLowerCase() === lakeName.toLowerCase());

  if (lakeSpecificData.length === 0) {
    return res.status(404).json({ error: 'Lake not found' });
  }

  // Calculate average concentrations for each metal
  const avgConcentrations = {};
  const metals = Object.keys(standardValues);

  metals.forEach(metal => {
    const sum = lakeSpecificData.reduce((acc, row) => acc + parseFloat(row[metal] || 0), 0);
    avgConcentrations[metal] = sum / lakeSpecificData.length;
  });

  // Calculate HMPI
  let weightedSum = 0;
  let weightsSum = 0;

  metals.forEach(metal => {
    weightedSum += weights[metal] * avgConcentrations[metal];
    weightsSum += weights[metal];
  });

  const hmpi = weightedSum / weightsSum;

  // Determine water usability
  const isSafe = hmpi < 1;

  res.json({ 
    lake: lakeName, 
    hmpi, 
    isSafeForDrinking: isSafe 
  });
});

app.get('/api/district/:districtName', (req, res) => {
  const districtName = req.params.districtName;
  const districtSpecificData = districtData.find(row => row.District.toLowerCase() === districtName.toLowerCase());

  if (!districtSpecificData) {
    return res.status(404).json({ error: 'District not found' });
  }

  const concentrations = {};
  const metalColumnMapping = {
    Pb: 'Lead (mg/l)',
    Cd: 'Cadmium (mg/l)',
    Cr: 'Chromium (mg/l)',
    Cu: 'Copper (mg/l)',
    Zn: 'Zinc (mg/l)'
  };

  for (const metal in standardValues) {
    const columnName = metalColumnMapping[metal];
    const value = districtSpecificData[columnName];
    const concentration = parseDistrictConcentration(value);
    if (concentration !== null) {
      concentrations[metal] = concentration;
    }
  }

  // Calculate HMPI based on available data
  let weightedSum = 0;
  let weightsSum = 0;

  for (const metal in concentrations) {
      weightedSum += weights[metal] * concentrations[metal];
      weightsSum += weights[metal];
  }

  // Avoid division by zero if no quantifiable data is available
  const hmpi = weightsSum > 0 ? weightedSum / weightsSum : 0;

  // Determine water usability
  const isSafe = hmpi < 1;

  res.json({
    district: districtName,
    hmpi,
    isSafeForDrinking: isSafe,
    concentrationsUsed: concentrations 
  });
});

app.get('/api/lake-data/:lakeName', (req, res) => {
  const lakeName = req.params.lakeName;
  const lakeSpecificData = lakeData.filter(row => row.Lake.toLowerCase() === lakeName.toLowerCase());

  if (lakeSpecificData.length === 0) {
    return res.status(404).json({ error: 'Lake not found' });
  }

  res.json(lakeSpecificData);
});

app.get('/api/district-data/:districtName', (req, res) => {
  const districtName = req.params.districtName;
  const districtSpecificData = districtData.find(row => row.District.toLowerCase() === districtName.toLowerCase());

  if (!districtSpecificData) {
    return res.status(404).json({ error: 'District not found' });
  }

  res.json(districtSpecificData);
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
