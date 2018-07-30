var finances = {
  initialCosts: 1000000,
  seedMoney: 1000000,
  annualBags: 10000000,
  numYears: 3,
  rawMaterialsCost: 10,
  hardwareCost: 30,
  manufacturingCost: 5,
  researchCost: 5,
  numEmployees: 100,
  averageSalary: 80000,
  averageBenefits: 20000,
  retailPrice: 80,
  renewalPrice: 20,
  renewalRate: 50
};

var pies = [];

function onSubmit() {
  // Set each input field to disabled and update global object
  for (var field in finances) {
    if (finances.hasOwnProperty(field)) {
      var element = $('#' + field);
      element.prop('disabled', true);
      finances[field] = element.val();
    }
  }

  console.log("Submitted!");
  console.log(finances);

  // Generate new graphs using the refreshed global object
  generateGraphs();

  // Set each input field to enabled again
  for (var field in finances) {
    if (finances.hasOwnProperty(field)) {
      var element = $('#' + field);
      element.prop('disabled', false);
    }
  }
}

function generateGraphs() {
  var annualInitialCosts = finances.initialCosts / finances.numYears;
  var annualEmployeeCosts = finances.numEmployees * (finances.averageSalary + finances.averageBenefits);
  var annualMaterialCosts = finances.annualBags * finances.rawMaterialsCost;
  var annualHardwareCosts = finances.annualBags * finances.hardwareCost;
  var annualManufacturingCosts = finances.annualBags * finances.manufacturingCost;
  var annualResearchCosts = finances.annualBags * finances.researchCost;

  pies.push(new d3pie("annualCostsPieChart", {
    "header": {
      "title": {
        "text": "Annual Costs Breakdown",
        "fontSize": 24,
        "font": "open sans"
      },
      "subtitle": {
        "text": "How extraneous funds will be used to develop our product",
        "color": "#999999",
        "fontSize": 12,
        "font": "open sans"
      },
      "titleSubtitlePadding": 9
    },
    "footer": {
      "color": "#999999",
      "fontSize": 10,
      "font": "open sans",
      "location": "bottom-left"
    },
    "size": {
      "canvasWidth": 500,
      "pieOuterRadius": "90%"
    },
    "data": {
      "sortOrder": "value-desc",
      "content": [
        {
          "label": "Initial Costs",
          "value": annualInitialCosts,
          "color": "#923e99"
        },
        {
          "label": "Salaries & Benefits",
          "value": annualEmployeeCosts,
          "color": "#ae83d5"
        },
        {
          "label": "Materials",
          "value": annualMaterialCosts,
          "color": "#ce2aeb"
        },
        {
          "label": "Hardware",
          "value": annualHardwareCosts,
          "color": "#a4a0c9"
        },
        {
          "label": "Manufacturing",
          "value": annualManufacturingCosts,
          "color": "#7c37c0"
        },
        {
          "label": "R & D",
          "value": annualResearchCosts,
          "color": "#cc9fb1"
        }
      ]
    },
    "labels": {
      "outer": {
        "pieDistance": 15
      },
      "inner": {
        "hideWhenLessThanPercentage": 3
      },
      "mainLabel": {
        "fontSize": 11
      },
      "percentage": {
        "color": "#ffffff",
        "decimalPlaces": 0
      },
      "value": {
        "color": "#adadad",
        "fontSize": 11
      },
      "lines": {
        "enabled": true
      },
      "truncation": {
        "enabled": true
      }
    },
    "tooltips": {
      "enabled": true,
      "type": "placeholder",
      "string": "{label}: ${value}"
    },
    "effects": {
      "pullOutSegmentOnClick": {
        "effect": "linear",
        "speed": 400,
        "size": 8
      }
    },
    "misc": {
      "gradient": {
        "enabled": true,
        "percentage": 100
      }
    }
  }));

  var annualSeedMoney = finances.seedMoney / finances.numYears;
  var annualBagProfits = finances.annualBags * finances.retailPrice;
  var annualRenewalProfits = 0;

  // Calculate the profits from people renewing the bag
  var renewalRate = finances.renewalRate / 100;
  var renewalBags = finances.annualBags * renewalRate;
  while (renewalBags > 0) {
    annualRenewalProfits += renewalBags * finances.renewalPrice;
    renewalRate -= 0.1;
    renewalBags *= renewalRate;
  }

  pies.push(new d3pie("annualProfitsPieChart", {
    "header": {
      "title": {
        "text": "Annual Profits Breakdown",
        "fontSize": 24,
        "font": "open sans"
      },
      "subtitle": {
        "text": "How much revenue our product will generate",
        "color": "#999999",
        "fontSize": 12,
        "font": "open sans"
      },
      "titleSubtitlePadding": 9
    },
    "footer": {
      "color": "#999999",
      "fontSize": 10,
      "font": "open sans",
      "location": "bottom-left"
    },
    "size": {
      "canvasWidth": 590,
      "pieOuterRadius": "90%"
    },
    "data": {
      "sortOrder": "value-desc",
      "content": [
        {
          "label": "Bag Sales",
          "value": annualBagProfits,
          "color": "#923e99"
        },
        {
          "label": "Bag Renewals",
          "value": annualRenewalProfits,
          "color": "#ae83d5"
        },
        {
          "label": "Seed Money",
          "value": annualSeedMoney,
          "color": "#9e3fd8"
        }
      ]
    },
    "labels": {
      "outer": {
        "pieDistance": 32
      },
      "inner": {
        "hideWhenLessThanPercentage": 3
      },
      "mainLabel": {
        "fontSize": 11
      },
      "percentage": {
        "color": "#ffffff",
        "decimalPlaces": 0
      },
      "value": {
        "color": "#adadad",
        "fontSize": 11
      },
      "lines": {
        "enabled": true
      },
      "truncation": {
        "enabled": true
      }
    },
    "tooltips": {
      "enabled": true,
      "type": "placeholder",
      "string": "{label}: ${value}"
    },
    "effects": {
      "pullOutSegmentOnClick": {
        "effect": "linear",
        "speed": 400,
        "size": 8
      }
    },
    "misc": {
      "gradient": {
        "enabled": true,
        "percentage": 100
      }
    }
  })); 
}

generateGraphs();

$(document).ready(function() {
  $("#submit").click(onSubmit);
});
